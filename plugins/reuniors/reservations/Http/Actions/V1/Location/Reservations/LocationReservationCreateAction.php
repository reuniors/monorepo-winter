<?php
namespace Reuniors\Reservations\Http\Actions\V1\Location\Reservations;

use Carbon\Carbon;
use Reuniors\Base\Http\Actions\BaseAction;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Response;
use Reuniors\Reservations\Http\Actions\V1\Location\PromoCode\LocationPromoCodeFindOneAction;
use Reuniors\reservations\Http\Actions\V1\Notification\NotificationCreateAction;
use Reuniors\reservations\Http\Enums\ReservationStatus;
use Reuniors\Reservations\Models\Client;
use Reuniors\Reservations\Models\ClientReservation;
use Reuniors\Reservations\Models\Location;
use Reuniors\Reservations\Models\Service;
use Winter\User\Facades\Auth;

class LocationReservationCreateAction extends BaseAction {
    public function rules()
    {
        return [
            'locationSlug' => ['string', 'required'],
            'locationWorkerId' => ['integer', 'required'],
            'dateUtc' => ['date', 'required'],
            //            'servicesDuration' => ['integer', 'required'], needs to calculate
            'services' => ['array', 'required'],
            'services.*.id' => ['integer', 'required'],
            'services.*.quantity' => ['integer'],
            //            'servicesCost' => ['numeric', 'required'], needs to calculate
            'clientId' => ['integer'],
            //            'fullName' => ['string'],
            //            'email' => ['email'],
            //            'phoneNumber' => ['string'],
            'notice' => ['string'],
            'promoCode' => ['string']
        ];
    }


    public function handle(array $attributes = [])
    {
        $user = Auth::getUser();
        $clientId = $attributes['clientId'] ?? null;
        $promoCodeName = $attributes['promoCode'] ?? null;
        $userIds = [];
        $location = Location::where('slug', $attributes['locationSlug'])
            ->firstOrFail();
        $worker = $location
            ->workers()
            ->where('id', $attributes['locationWorkerId'])
            ->firstOrFail();
        $servicesRequest = $attributes['services'];
        $servicesCollection = Service::whereHas('service_group', function ($query) use ($location) {
            $query->whereHas('locations', function ($query) use ($location) {
                $query->where('location_id', $location->id);
            });
        })
            ->whereIn('id', array_column($servicesRequest, 'id'))
            ->get()
            ->keyBy('id');

        // Load worker services with pivot data (price, duration) for worker-specific pricing
        $worker->load(['services' => function ($query) use ($servicesCollection) {
            $query->whereIn('reuniors_reservations_services.id', $servicesCollection->pluck('id'))
                  ->wherePivot('active', true)
                  ->withPivot(['price', 'duration', 'active']);
        }]);

        // Validate that all services belong to the selected worker
        $worker->validateServices($servicesCollection, $servicesRequest);

        $dateUtc = $attributes['dateUtc'];
        // Normalize dateUtc format - ensure it has proper datetime format
        try {
            $dateObject = Carbon::parse($dateUtc);
            $dateUtc = $dateObject->format('Y-m-d H:i:s');
        } catch (\Exception $e) {
            \Log::error('Error in LocationReservationCreateAction: ' . $e->getMessage(), [
                'dateUtc' => $dateUtc,
            ]);
            throw new HttpResponseException(
                response()->json([
                    'message' => 'Neispravan format datuma i vremena'
                ], Response::HTTP_BAD_REQUEST)
            );
        }

        $promoCode = LocationPromoCodeFindOneAction::run([
            'code' => $promoCodeName,
            'locationSlug' => $location->slug,
        ]);

        // Calculate services data using worker-specific prices
        $servicesDataCalc = $worker->calculateServicesData($servicesRequest, $servicesCollection);
        $discountDataCalc = $promoCode ? $promoCode->calculateDiscount($servicesDataCalc['services_cost']) : [];

        $data = [
            'location_id' => $location->id,
            'location_worker_id' => $worker->id,
            'date_utc' => $dateUtc, // Populate UTC field
            'status' => ReservationStatus::DRAFT,
            'notice' => $attributes['notice'] ?? null,
            'client_id' => $clientId,
            ...$servicesDataCalc,
            ...$discountDataCalc,
        ];

        $client = $clientId ? Client::find($clientId) : null;

        // Check for duplicate reservation (same client, date, worker)
        // Don't allow duplicates for DRAFT or CONFIRMED status
        if ($clientId) {
            try {
                $existingReservation = ClientReservation::where('client_id', $clientId)
                    ->where('date_utc', $dateUtc)
                    ->where('location_worker_id', $worker->id)
                    ->whereIn('status', [ReservationStatus::DRAFT, ReservationStatus::CONFIRMED])
                    ->whereNull('deleted_at')
                    ->first();
                
                if ($existingReservation) {
                    throw new HttpResponseException(
                        response()->json([
                            'message' => 'Rezervacija već postoji'
                        ], Response::HTTP_CONFLICT)
                    );
                }
            } catch (\Illuminate\Database\QueryException $e) {
                // Catch SQL errors and return user-friendly message
                \Log::error('Database error in LocationReservationCreateAction: ' . $e->getMessage(), [
                    'dateUtc' => $dateUtc,
                    'clientId' => $clientId,
                    'locationWorkerId' => $worker->id
                ]);
                throw new HttpResponseException(
                    response()->json([
                        'message' => 'Greška pri provjeri rezervacije. Molimo pokušajte ponovo.'
                    ], Response::HTTP_INTERNAL_SERVER_ERROR)
                );
            } catch (\Exception $e) {
                // Catch any other exceptions
                \Log::error('Error in LocationReservationCreateAction: ' . $e->getMessage(), [
                    'dateUtc' => $dateUtc,
                    'clientId' => $clientId,
                    'locationWorkerId' => $worker->id
                ]);
                throw new HttpResponseException(
                    response()->json([
                        'message' => 'Greška pri provjeri rezervacije. Molimo pokušajte ponovo.'
                    ], Response::HTTP_INTERNAL_SERVER_ERROR)
                );
            }
        }

        if (!ClientReservation::slotAvailable(
            $data['date_utc'],
            $data['location_worker_id'],
            $data['services_duration'],
        )) {
            throw new HttpResponseException(
                response()->json([
                    'message' => 'Izabrani vremenski slot nije više dostupan'
                ], Response::HTTP_CONFLICT)
            );
        }

        if (ClientReservation::isDailyReservationOverLimit($servicesDataCalc['services_duration'], $dateObject)) {
            throw new HttpResponseException(
                response()->json([
                    'message' => 'Dnevni limit rezervacija prekoračen'
                ], Response::HTTP_TOO_MANY_REQUESTS)
            );
        }

        $newReservation = ClientReservation::create($data);
        $newReservation->services()->sync(ClientReservation::formatServicesForSync($servicesRequest));
        if ($worker->user_id) {
            $userIds[] = $worker->user_id;
        }
        $tableData = [
            'Datum i vreme' => $newReservation->date_formatted->format('d.m.Y. H:i'),
            'Status' => __('U pripremi'),
            'Berber' => $worker->full_name,
        ];
        $description = 'Rezervacija u pripremi';
        if ($client) {
            $tableData[__('Ime i prezime')] = $client->full_name;
            $tableData[__('Broj telefona')] = $client->phone_number;
            $tableData['Status'] = __('Potvrđeno');
            $description = __('Potvrđena rezervacija');

            $newReservation->status = ReservationStatus::CONFIRMED;
            $newReservation->save();
            $userIds[] = $user->id;
        }
        
        // Reload relations to ensure friendlyCode works correctly
        $newReservation->load(['locationWorker', 'client']);

        $notificationData = [
            'title' => 'Rezervacija: ' . ($newReservation->friendlyCode ?? $newReservation->hash),
            'description' => $description,
            'usersIds' => $userIds,
            'reservationId' => $newReservation->id,
            'locationId' => $location->id,
            'sendEmail' => true,
            'sendSms' => false,
            'sendPush' => true,
            'emailData' => [
                'fullName' => $user->full_name,
                'email' => $user->email,
                'phoneNumber' => $user->phone_number,
                'link' => env('APP_URL') . '/zakazivanje/r/' . $newReservation->hash,
                'tableData' => $tableData
            ],
            'notificationData' => [
                'title' => "{$location->title} (#$newReservation->hash)",
                'url' => '/zakazivanje/r/' . $newReservation->hash,
            ],
        ];

        NotificationCreateAction::run($notificationData);

        if (!in_array($user->id, $userIds)) {
            $notificationData['sendEmail'] = true;
            $notificationData['sendPush'] = false;
            $notificationData['usersIds'] = [$user->id];
            NotificationCreateAction::run($notificationData);
        }

        return $newReservation;
    }
}
