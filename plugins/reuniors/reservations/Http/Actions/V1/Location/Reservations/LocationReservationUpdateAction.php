<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\Reservations;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\reservations\Http\Actions\V1\Notification\NotificationCreateAction;
use Reuniors\reservations\Http\Enums\ReservationStatus;
use Reuniors\Reservations\Models\Client;
use Reuniors\Reservations\Models\ClientReservation;
use Auth;

class LocationReservationUpdateAction extends BaseAction {
    public function rules()
    {
        return [
            'locationSlug' => ['string', 'required'],
            'reservationHash' => ['string', 'required'],
            'status' => ['numeric', 'required'],
            'clientData' => ['array'],
            'clientData.full_name' => ['string'],
            'clientData.phone_number' => ['string'],
            'clientData.id' => ['numeric', 'nullable'],
            'saveClient' => ['boolean'],
            'reason' => 'string',
        ];
    }

    public function handle(array $attributes)
    {
        $user = $attributes['userData'] ?? Auth::getUser();
        $status = $attributes['status'];
        $saveClient = $attributes['saveClient'] ?? false;
        $clientData = $attributes['clientData'] ?? null;
        if ($clientData) {
            $clientId = $clientData['id'] ?? null;
            $client = $clientId
                ? Client::find($clientData['id'])
                : new Client();
            $client->full_name = $clientData['full_name'];
            $client->phone_number = $clientData['phone_number'];
            if ($saveClient) {
                $client->user_id = $user->id;
            }
            $client->save();
        }
        $reason = $attributes['reason'] ?? null;

        $reservation = ClientReservation
            ::getFeData([
                'locationSlug' => $attributes['locationSlug'],
                'hash' => $attributes['reservationHash'],
            ])
            ->firstOrFail();

        $client = $client ?? $reservation->client;

        $reservation->status = $status;
        $reservation->reason = $reason;
        if (!$reservation->client && $client) {
            $reservation->client_id = $client->id;
        }
        $reservation->save();

        $description = $status === ReservationStatus::CONFIRMED
            ? 'Rezervacija potvrđena'
            : 'Rezervacija otkazana';
        $tableData = [
            'Datum i vreme' => $reservation->date_formatted->format('d.m.Y. H:i'),
            'Status' => $description,
            'Berber' => $reservation->locationWorker->full_name,
        ];
        if (!empty($client)) {
            $tableData['Ime i prezime'] = $client->full_name;
            $tableData['Broj telefona'] = $client->phone_number;
        }
        if ($reason) {
            $tableData['Razlog'] = $reason;
        }
        $worker = $reservation->locationWorker;
        $usersIds = [$user->id];
        if ($worker->user_id) {
            $usersIds[] = $worker->user_id;
        }
        if ($client && !in_array($client->user_id, $usersIds)) {
            $usersIds[] = $client->user_id;
        }
        if ($reservation->created_by && !in_array($reservation->created_by, $usersIds)) {
            $usersIds[] = $reservation->created_by;
        }

        NotificationCreateAction::run([
            'title' => 'Rezervacija: ' . $reservation->hash,
            'description' => $description,
            'usersIds' => $usersIds,
            'reservationId' => $reservation->id,
            'locationId' => $reservation->location_id,
            'sendEmail' => true,
            'sendSms' => false,
            'sendPush' => true,
            'emailData' => [
                'fullName' => $user->full_name,
                'email' => $user->email,
                'phoneNumber' => $user->phone_number,
                'link' => env('APP_URL') . '/zakazivanje/r/' . $reservation->hash,
                'tableData' => $tableData
            ],
            'notificationData' => [
                'title' => "{$reservation->location->title} (#$reservation->hash)",
                'url' => '/zakazivanje/r/' . $reservation->hash,
            ],
        ]);

        return $reservation;
    }

    public function asController()
    {
        $requestData = request()->all();

        return [
            'data' => $this->handle($requestData),
            'success' => true,
        ];
    }
}
