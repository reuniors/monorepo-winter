<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\GoogleCalendar;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Calendar\Models\CalendarConnection;
use Reuniors\Reservations\Models\ReservationCalendarConnection;
use Reuniors\Reservations\Models\LocationWorker;
use Winter\User\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class GoogleCalendarConnectAction extends BaseAction
{
    public function rules()
    {
        return [
            'accessToken' => ['required', 'string'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $user = Auth::getUser();

        if (!$user) {
            throw new \Exception('Unauthorized');
        }

        // Get worker from user_id
        $worker = LocationWorker::where('user_id', $user->id)->first();

        if (!$worker) {
            throw new \Exception('Worker not found for this user');
        }

        // Get location ID for this worker
        $locationId = $worker->locations()->first()->id ?? null;

        // Verify access token with Google (same as login)
        try {
            $googleUser = Socialite::driver('google')->userFromToken($attributes['accessToken']);
        } catch (\Exception $e) {
            throw new \Exception('Invalid access token');
        }

        $email = $googleUser->getEmail();

        // Check if connection already exists
        $existingPivot = ReservationCalendarConnection::where(function($query) use ($worker, $locationId) {
            $query->where('location_worker_id', $worker->id);
            if ($locationId) {
                $query->orWhere('location_id', $locationId);
            }
        })
        ->whereHas('calendarConnection', function($query) use ($email) {
            $query->where('provider', 'google')
                  ->where('provider_email', $email);
        })
        ->with('calendarConnection')
        ->first();

        if ($existingPivot) {
            // Update existing connection with new token and expiry
            $connection = $existingPivot->calendarConnection;
            $connection->update([
                'access_token' => $attributes['accessToken'],
                'token_expires_at' => now()->addHour(), // Update expiry time!
                'is_active' => true,
            ]);
        } else {
            // Create new CalendarConnection
            $connection = CalendarConnection::create([
                'provider' => 'google',
                'provider_calendar_id' => 'primary',
                'provider_email' => $email,
                'access_token' => $attributes['accessToken'],
                'refresh_token' => null, // Frontend OAuth doesn't provide refresh token
                'token_expires_at' => now()->addHour(), // Google tokens expire in 1 hour
                'is_active' => true,
                'sync_to_provider' => true,
                'sync_from_provider' => true,
                'block_overlapping_slots' => true,
                'allow_overlapping_with_approval' => false,
            ]);

            // Create ReservationCalendarConnection (pivot)
            ReservationCalendarConnection::create([
                'calendar_connection_id' => $connection->id,
                'location_id' => $locationId,
                'location_worker_id' => $worker->id,
            ]);
        }

        return [
            'syncToCalendar' => $connection->sync_to_provider,
            'syncFromCalendar' => $connection->sync_from_provider,
            'blockOverlappingSlots' => $connection->block_overlapping_slots,
            'allowOverlappingWithApproval' => $connection->allow_overlapping_with_approval,
            'googleEmail' => $connection->provider_email,
            'isConnected' => true,
        ];
    }
}

