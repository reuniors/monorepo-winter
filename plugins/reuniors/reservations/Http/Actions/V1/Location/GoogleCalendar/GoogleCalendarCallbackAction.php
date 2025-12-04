<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\GoogleCalendar;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Calendar\Models\CalendarConnection;
use Reuniors\Reservations\Models\ReservationCalendarConnection;

class GoogleCalendarCallbackAction extends BaseAction
{
    public function rules()
    {
        return [
            'code' => ['required', 'string'],
            'state' => ['required', 'string'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $code = $attributes['code'];
        $state = json_decode(base64_decode($attributes['state']), true);

        if (!$state || !isset($state['user_id'], $state['worker_id'])) {
            throw new \Exception('Invalid state parameter');
        }

        $userId = $state['user_id'];
        $locationWorkerId = $state['worker_id'];
        $locationId = $state['location_id'] ?? null;

        // TODO: Exchange code for access token using Google API Client
        // For now, this is a placeholder that shows the structure

        // Use existing Google OAuth configuration (same as login)
        $clientId = config('services.google.client_id');
        $clientSecret = config('services.google.client_secret');
        $redirectUri = config('app.url') . '/api/v1/rzr/locations/google-calendar/callback';

        if (!$clientId || !$clientSecret) {
            throw new \Exception('Google OAuth not configured. Check GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env');
        }

        // Exchange authorization code for access token
        $tokenUrl = 'https://oauth2.googleapis.com/token';
        $tokenData = [
            'code' => $code,
            'client_id' => $clientId,
            'client_secret' => $clientSecret,
            'redirect_uri' => $redirectUri,
            'grant_type' => 'authorization_code',
        ];

        $ch = curl_init($tokenUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($tokenData));
        $response = curl_exec($ch);
        curl_close($ch);

        $tokenResponse = json_decode($response, true);

        if (!isset($tokenResponse['access_token'])) {
            throw new \Exception('Failed to get access token from Google');
        }

        // Get user email from Google
        $userInfoUrl = 'https://www.googleapis.com/oauth2/v2/userinfo';
        $ch = curl_init($userInfoUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . $tokenResponse['access_token'],
        ]);
        $userInfoResponse = curl_exec($ch);
        curl_close($ch);

        $userInfo = json_decode($userInfoResponse, true);
        if (!isset($userInfo['email']) || empty($userInfo['email'])) {
            throw new \Exception('Google account email not provided – aborting connection creation');
        }
        $email = $userInfo['email'];

        // Create CalendarConnection
        $connection = CalendarConnection::create([
            'provider' => 'google',
            'provider_calendar_id' => 'primary',
            'provider_email' => $email,
            'access_token' => $tokenResponse['access_token'],
            'refresh_token' => $tokenResponse['refresh_token'] ?? null,
            'token_expires_at' => isset($tokenResponse['expires_in'])
                ? now()->addSeconds($tokenResponse['expires_in'])
                : null,
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
            'location_worker_id' => $locationWorkerId,
        ]);

        // Redirect back to frontend settings page
        $frontendUrl = env('FRONTEND_URL', 'http://monorepo');
        return redirect($frontendUrl . '/zakazivanje/podesavanja/google-calendar?connected=true');
    }
}
