<?php namespace Reuniors\Calendar\Http\Actions\V1;

use Lorisleiva\Actions\Concerns\AsAction;
use Laravel\Socialite\Facades\Socialite;
use Reuniors\Calendar\Models\CalendarConnection;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class CalendarCallbackAction
{
    use AsAction;

    public function handle()
    {
        try {
            $locationId = session('calendar_location_id');
            $locationWorkerId = session('calendar_location_worker_id');

            session()->forget([
                'calendar_location_id',
                'calendar_location_worker_id',
            ]);

            if (!$locationId && !$locationWorkerId) {
                throw new \Exception('Connection context not found in session');
            }

            return $this->handleGoogleCallback($locationId, $locationWorkerId);
        } catch (\Exception $e) {
            Log::error('Calendar callback error: ' . $e->getMessage(), [
                'exception' => $e,
            ]);

            return [
                'success' => false,
                'message' => 'Failed to connect calendar: ' . $e->getMessage(),
            ];
        }
    }

    protected function handleGoogleCallback($locationId, $locationWorkerId)
    {
        $googleUser = Socialite::driver('google')->user();

        $connection = CalendarConnection::where('provider', 'google')
            ->where('provider_email', $googleUser->email)
            ->first();

        if (!$connection) {
            $connection = new CalendarConnection();
            $connection->provider = 'google';
        }

        $connection->provider_email = $googleUser->email;
        $connection->access_token = $googleUser->token;
        $connection->refresh_token = $googleUser->refreshToken ?? $connection->refresh_token;
        $expiresIn = $googleUser->expiresIn ?? 3600;
        $connection->token_expires_at = Carbon::now()->addSeconds($expiresIn);
        $connection->provider_calendar_id = 'primary';
        $connection->is_active = true;
        $connection->save();

        if (class_exists('Reuniors\\Reservations\\Models\\ReservationCalendarConnection')) {
            \Reuniors\Reservations\Models\ReservationCalendarConnection::updateOrCreate(
                [
                    'calendar_connection_id' => $connection->id,
                    'location_id' => $locationId,
                    'location_worker_id' => $locationWorkerId,
                ]
            );
        }

        return [
            'success' => true,
            'message' => 'Calendar connected successfully',
            'connection' => [
                'id' => $connection->id,
                'provider' => $connection->provider,
                'provider_email' => $connection->provider_email,
                'is_active' => $connection->is_active,
            ],
        ];
    }

    public function asController()
    {
        $result = $this->handle();

        if ($result['success']) {
            return redirect(config('app.url') . '/settings?calendar_connected=1');
        }

        return redirect(config('app.url') . '/settings?calendar_error=1');
    }
}
