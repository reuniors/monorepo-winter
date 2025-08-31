<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\Reservations;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\reservations\Http\Actions\V1\Notification\NotificationCreateAction;
use Reuniors\reservations\Http\Enums\ReservationStatus;
use Reuniors\Reservations\Models\ClientReservation;
use Reuniors\WinterSocialite\Http\Enum\UserGroupCode;
use Log;

class LocationReservationPendingStatusAction
{
    use AsAction;

    public function handle()
    {
        $now = now();
        $pendingReservations = ClientReservation::getFeData()
            ->createdUserNotHasGroups([UserGroupCode::ADMIN, UserGroupCode::OWNER])
            ->where('status', ReservationStatus::DRAFT)
            ->where('date', '>=', $now)
            ->where('created_at', '<=', $now->subMinutes(15))
            ->with('createdByUser')
            ->get();

        foreach ($pendingReservations as $reservation) {
            $user = $reservation->createdByUser;

            if ($reservation->is_pending_status_reminder_sent &&
                $reservation->created_at->diffInMinutes($now) >= 30 &&
                $user
            ) {
                LocationReservationUpdateAction::run([
                    'locationSlug' => $reservation->location->slug,
                    'reservationHash' => $reservation->hash,
                    'status' => ReservationStatus::CANCELLED,
                    'reason' => 'Rezervacija nije potvrđena na vreme',
                    'userData' => $user,
                ]);
            } elseif (!$reservation->is_pending_status_reminder_sent) {
                $reservation->is_pending_status_reminder_sent = 1;
                $reservation->save();
                if ($user) {
                    NotificationCreateAction::run([
                        'title' => 'Rezervacija: ' . $reservation->hash,
                        'description' => 'Molimo vas da potvrdite rezervaciju',
                        'usersIds' => [$reservation->created_by],
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
                        ],
                        'notificationData' => [
                            'title' => "{$reservation->location->title} (#$reservation->hash)",
                            'url' => '/zakazivanje/r/' . $reservation->hash,
                        ],
                    ]);
                }
            }
        }
    }
}
