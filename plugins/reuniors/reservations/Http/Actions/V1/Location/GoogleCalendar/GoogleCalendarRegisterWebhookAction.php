<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\GoogleCalendar;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\LocationWorker;
use Reuniors\Reservations\Models\ReservationCalendarConnection;
use Reuniors\Calendar\Models\CalendarConnection;
use Winter\User\Facades\Auth;
use Illuminate\Support\Str;
use Carbon\Carbon;

/**
 * Register webhook for Google Calendar push notifications
 *
 * This enables real-time sync when user creates/updates/deletes events in Google Calendar.
 */
class GoogleCalendarRegisterWebhookAction extends BaseAction
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

        $worker = LocationWorker::where('user_id', $user->id)->first();
        if (!$worker) {
            throw new \Exception('Worker not found for this user');
        }

        $pivot = ReservationCalendarConnection::where(function($q) use ($worker) {
            $q->where('location_worker_id', $worker->id);
        })
        ->whereHas('calendarConnection', function($q) {
            $q->where('provider', 'google')->where('is_active', true);
        })
        ->with('calendarConnection')
        ->first();

        if (!$pivot || !$pivot->calendarConnection) {
            throw new \Exception('Google Calendar not connected. Please connect first.');
        }

        /** @var CalendarConnection $connection */
        $connection = $pivot->calendarConnection;

        // Check if webhook is already registered and still valid
        if ($connection->webhook_channel_id && $connection->webhook_expires_at && $connection->webhook_expires_at->isFuture()) {
            return [
                'message' => 'Webhook already registered',
                'channel_id' => $connection->webhook_channel_id,
                'expires_at' => $connection->webhook_expires_at->toIso8601String(),
            ];
        }

        // Register new webhook with Google
        try {
            $client = new \Google_Client();
            $client->setAccessToken($connection->access_token);
            $service = new \Google_Service_Calendar($client);

            $calendarId = $connection->provider_calendar_id ?? 'primary';

            // Generate unique channel ID and token
            $channelId = 'calendar-' . $connection->id . '-' . Str::random(10);
            $channelToken = Str::random(32);

            // Webhook URL
            $webhookUrl = config('app.url') . '/api/v1/rzr/locations/google-calendar/webhook';

            // Create watch request
            $channel = new \Google_Service_Calendar_Channel();
            $channel->setId($channelId);
            $channel->setType('web_hook');
            $channel->setAddress($webhookUrl);
            $channel->setToken($channelToken);

            // TTL: 30 days (max allowed by Google)
            $expiration = Carbon::now()->addDays(30)->timestamp * 1000; // milliseconds
            $channel->setExpiration($expiration);

            // Register webhook
            $watchResponse = $service->events->watch($calendarId, $channel);

            // Save webhook info to connection
            $connection->webhook_channel_id = $watchResponse->getId();
            $connection->webhook_resource_id = $watchResponse->getResourceId();
            $connection->webhook_channel_token = $channelToken;
            $connection->webhook_expires_at = Carbon::createFromTimestampMs($watchResponse->getExpiration());
            $connection->save();

            return [
                'message' => 'Webhook registered successfully',
                'channel_id' => $watchResponse->getId(),
                'resource_id' => $watchResponse->getResourceId(),
                'expires_at' => Carbon::createFromTimestampMs($watchResponse->getExpiration())->toIso8601String(),
            ];
        } catch (\Exception $e) {
            throw new \Exception('Failed to register webhook: ' . $e->getMessage());
        }
    }
}

