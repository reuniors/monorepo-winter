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

    public function handle(array $attributes = [])
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
        
        // Reload relations to ensure friendlyCode works correctly
        $reservation->load(['locationWorker', 'client']);

        // Determine description and notification settings based on status
        if ($status === ReservationStatus::CONFIRMED) {
            $description = 'Rezervacija potvrđena';
        } elseif ($status === ReservationStatus::NO_SHOW) {
            $description = 'Nije se pojavio';
        } else {
            $description = 'Rezervacija otkazana';
        }

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

        // Determine users to notify
        $worker = $reservation->locationWorker;
        $usersIds = [];
        
        // Add current user if exists
        if ($user && $user->id) {
            $usersIds[] = $user->id;
        }
        
        // For NO_SHOW, don't notify worker (only client gets notification and email)
        // For other statuses, notify worker as well
        if ($status !== ReservationStatus::NO_SHOW && $worker && $worker->user_id) {
            $usersIds[] = $worker->user_id;
        }
        
        // Add client user_id only if it exists
        if ($client && $client->user_id && !in_array($client->user_id, $usersIds)) {
            $usersIds[] = $client->user_id;
        }
        
        // Add created_by only if it exists
        if ($reservation->created_by && !in_array($reservation->created_by, $usersIds)) {
            $usersIds[] = $reservation->created_by;
        }
        
        // Remove any null values (just in case)
        $usersIds = array_filter($usersIds, function($id) {
            return $id !== null && $id !== '';
        });
        $usersIds = array_values(array_unique($usersIds));

        // For NO_SHOW, explicitly remove worker from usersIds (even if added via created_by)
        if ($status === ReservationStatus::NO_SHOW && $worker && $worker->user_id) {
            $usersIds = array_values(array_filter($usersIds, function($id) use ($worker) {
                return $id !== $worker->user_id;
            }));
        }

        // Only create notification if there are users to notify
        if (!empty($usersIds)) {
            NotificationCreateAction::run([
            'title' => 'Rezervacija: ' . ($reservation->friendlyCode ?? $reservation->hash),
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
        }

        return $reservation;
    }
}
