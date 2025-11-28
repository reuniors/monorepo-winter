<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\GoogleCalendar;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\LocationWorker;
use Winter\User\Facades\Auth;

class GoogleCalendarAuthUrlAction extends BaseAction
{
    public function rules()
    {
        return [];
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

        // Use existing Google OAuth configuration (same as login)
        $clientId = config('services.google.client_id');
        $redirectUri = config('app.url') . '/api/v1/rzr/locations/google-calendar/callback';

        if (!$clientId) {
            throw new \Exception('Google OAuth not configured. Please set GOOGLE_CLIENT_ID in .env');
        }

        // Get scopes from config (includes calendar scopes)
        $scopes = config('services.google.scopes', [
            'https://www.googleapis.com/auth/calendar',
            'https://www.googleapis.com/auth/calendar.events',
        ]);

        $authUrl = 'https://accounts.google.com/o/oauth2/v2/auth?' . http_build_query([
            'client_id' => $clientId,
            'redirect_uri' => $redirectUri,
            'response_type' => 'code',
            'scope' => implode(' ', $scopes),
            'access_type' => 'offline',
            'prompt' => 'consent',
            'state' => base64_encode(json_encode([
                'user_id' => $user->id,
                'worker_id' => $worker->id,
                'location_id' => $worker->locations()->first()->id ?? null,
            ])),
        ]);

        // Redirect to Google OAuth
        return redirect($authUrl);
    }
}

