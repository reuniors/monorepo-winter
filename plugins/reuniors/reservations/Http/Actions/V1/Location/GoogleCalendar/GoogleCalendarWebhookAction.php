<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\GoogleCalendar;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Calendar\Models\CalendarConnection;
use Reuniors\Calendar\Models\CalendarEvent;
use Reuniors\Reservations\Models\ReservationCalendarConnection;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

/**
 * Google Calendar Webhook Handler
 *
 * Receives push notifications from Google when calendar changes.
 * This enables real-time sync from Google Calendar to our database.
 *
 * Google Calendar Push Notifications:
 * https://developers.google.com/calendar/api/guides/push
 */
class GoogleCalendarWebhookAction extends BaseAction
{
    public function rules()
    {
        return [];
    }

    public function handle(array $attributes = [])
    {
        // Get webhook notification from Google
        $channelId = request()->header('X-Goog-Channel-ID');
        $resourceId = request()->header('X-Goog-Resource-ID');
        $resourceState = request()->header('X-Goog-Resource-State'); // 'sync', 'exists', 'not_exists'
        $channelToken = request()->header('X-Goog-Channel-Token');

        // Log::info('Google Calendar webhook received', [
        //     'channel_id' => $channelId,
        //     'resource_id' => $resourceId,
        //     'resource_state' => $resourceState,
        //     'channel_token' => $channelToken,
        // ]);

        // Ignore sync messages (sent when webhook is first registered)
        if ($resourceState === 'sync') {
            return ['message' => 'Webhook sync acknowledged'];
        }

        // Find connection by channel_id
        $connection = CalendarConnection::where('webhook_channel_id', $channelId)
            ->where('provider', 'google')
            ->where('is_active', true)
            ->first();

        if (!$connection) {
            // Log::warning('Google Calendar webhook: Connection not found', ['channel_id' => $channelId]);
            return ['message' => 'Connection not found'];
        }

        // Verify channel token for security
        if ($connection->webhook_channel_token !== $channelToken) {
            // Log::warning('Google Calendar webhook: Invalid token', [
            //     'channel_id' => $channelId,
            //     'expected' => $connection->webhook_channel_token,
            //     'received' => $channelToken,
            // ]);
            return ['message' => 'Invalid token'];
        }

        // Fetch latest events from Google Calendar
        try {
            $provider = new \Reuniors\Calendar\Classes\Providers\GoogleCalendarProvider();

            // Fetch events for next 30 days
            $startDate = Carbon::now();
            $endDate = Carbon::now()->addDays(30);

            $events = $provider->fetchEvents($connection, $startDate, $endDate);

            // Sync events to database
            $synced = $this->syncEventsToDatabase($connection, $events);

            // Log::info('Google Calendar webhook: Events synced', [
            //     'connection_id' => $connection->id,
            //     'events_synced' => $synced,
            // ]);

            return [
                'message' => 'Events synced successfully',
                'synced' => $synced,
            ];
        } catch (\Exception $e) {
            Log::error('Google Calendar webhook: Sync failed', [
                'connection_id' => $connection->id,
                'error' => $e->getMessage(),
            ]);

            return ['message' => 'Sync failed: ' . $e->getMessage()];
        }
    }

    /**
     * Sync events from Google to database
     */
    protected function syncEventsToDatabase(CalendarConnection $connection, array $events): int
    {
        $synced = 0;

        foreach ($events as $event) {
            if (!isset($event['id']) || !isset($event['start_time_utc']) || !isset($event['end_time_utc'])) {
                continue;
            }

            // Upsert event
            $existing = CalendarEvent::where('calendar_connection_id', $connection->id)
                ->where('provider_event_id', $event['id'])
                ->first();

            $data = [
                'calendar_connection_id' => $connection->id,
                'provider_event_id' => $event['id'],
                'provider_calendar_id' => $connection->provider_calendar_id ?? 'primary',
                'event_type' => 'external',
                'is_external' => true,
                'allows_overlap' => false, // Block overlapping slots
                'start_time_utc' => Carbon::parse($event['start_time_utc'])->format('Y-m-d H:i:s'),
                'end_time_utc' => Carbon::parse($event['end_time_utc'])->format('Y-m-d H:i:s'),
                'summary' => $event['summary'] ?? null,
                'description' => $event['description'] ?? null,
                'status' => $event['status'] ?? 'confirmed',
                'last_synced_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ];

            if ($existing) {
                $existing->fill($data)->save();
            } else {
                CalendarEvent::create($data);
            }
            $synced++;
        }

        return $synced;
    }
}

