<?php
namespace Reuniors\Reservations\Http\Actions\V1\Location\Reservations;

use Carbon\Carbon;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Http\Actions\V1\Location\PromoCode\LocationPromoCodeFindOneAction;
use Reuniors\reservations\Http\Actions\V1\Notification\NotificationCreateAction;
use Reuniors\reservations\Http\Enums\ReservationStatus;
use Reuniors\Reservations\Models\Client;
use Reuniors\Reservations\Models\ClientReservation;
use Reuniors\Reservations\Models\Location;
use Reuniors\Reservations\Models\PromoCode;
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

    protected function calcServicesData($servicesRequest, $servicesCollection)
    {
        $servicesDuration = 0;
        $servicesCost = 0;
        foreach ($servicesRequest as $serviceRequest) {
            $service = $servicesCollection[$serviceRequest['id']] ?? null;
            if (!$service) {
                throw new \Exception('Service not found');
            }
            $servicesDuration += $service->duration * $serviceRequest['quantity'];
            $servicesCost += $service->price * $serviceRequest['quantity'];
        }

        return [
            'services_duration' => $servicesDuration,
            'services_cost' => $servicesCost,
        ];
    }

    protected function calcDiscountData(?PromoCode $promoCode, $servicesCost)
    {
        if (!$promoCode) {
            return [];
        }

        $discount = $promoCode->in_percent
            ? $servicesCost * $promoCode->discount_value / 100
            : $promoCode->discount_value;

        $discount = round($discount / 50) * 50;

        return [
            'original_cost' => $servicesCost,
            'discount' => $discount,
            'services_cost' => $servicesCost - $discount,
            'promo_code_id' => $promoCode->id,
        ];
    }

    protected function getServicesWithQuantity($servicesRequest)
    {
        $services = [];
        foreach ($servicesRequest as $serviceRequest) {
            $services[$serviceRequest['id']] = [
                'quantity' => $serviceRequest['quantity'],
            ];
        }

        return $services;
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
        $dateUtc = $attributes['dateUtc'];
        $dateObject = Carbon::parse($dateUtc);

        $promoCode = LocationPromoCodeFindOneAction::run([
            'code' => $promoCodeName,
            'locationSlug' => $location->slug,
        ]);

        $servicesDataCalc = $this->calcServicesData($servicesRequest, $servicesCollection);
        $discountDataCalc = $this->calcDiscountData($promoCode, $servicesDataCalc['services_cost']);

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

        if (!ClientReservation::slotAvailable(
            $data['date_utc'],
            $data['location_worker_id'],
            $data['services_duration'],
        )) {
            throw new \Exception('Izabrani vremenski slot nije više dostupan');
        }

        if (ClientReservation::isDailyReservationOverLimit($servicesDataCalc['services_duration'], $dateObject)) {
            throw new \Exception('Dnevni limit rezervacija prekoračen');
        }

        $newReservation = ClientReservation::create($data);
        $newReservation->services()->sync($this->getServicesWithQuantity($servicesRequest));
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

        $notificationData = [
            'title' => 'Rezervacija: ' . $newReservation->hash,
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
