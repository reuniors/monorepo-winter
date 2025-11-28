<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\GoogleCalendar;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\LocationWorker;
use Reuniors\Reservations\Models\ReservationCalendarConnection;
use Reuniors\Calendar\Models\CalendarConnection;
use Reuniors\Calendar\Models\CalendarEvent;
use Reuniors\Calendar\Classes\Providers\GoogleCalendarProvider;
use Winter\User\Facades\Auth;
use Carbon\Carbon;

class GoogleCalendarSyncAction extends BaseAction
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

        // Resolve worker and connection
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

        // Check if token is expired and try to refresh if we have refresh_token
        $isTokenExpired = $connection->token_expires_at && $connection->token_expires_at->isPast();

        if ($isTokenExpired) {
            if ($connection->refresh_token) {
                // Try to refresh token (lazy refresh)
                try {
                    $provider = new GoogleCalendarProvider();
                    $refreshed = $provider->refreshToken($connection);

                    if (!$refreshed) {
                        // Refresh failed - user needs to reconnect
                        $connection->is_active = false;
                        $connection->save();
                        throw new \Exception('Access token expired and refresh failed. Please reconnect your Google Calendar.', 401);
                    }
                    // Token refreshed successfully, continue with sync
                } catch (\Exception $e) {
                    // Refresh failed
                    $connection->is_active = false;
                    $connection->save();
                    throw new \Exception('Access token expired and refresh failed. Please reconnect your Google Calendar.', 401);
                }
            } else {
                // No refresh token - user must reconnect
                $connection->is_active = false;
                $connection->save();
                throw new \Exception('Access token expired. Please reconnect your Google Calendar.', 401);
            }
        }

        // Token is valid (or just refreshed), proceed with sync
        $provider = new GoogleCalendarProvider();
        $startDate = Carbon::now();
        $endDate = Carbon::now()->addDays(30);

        try {
            $events = $provider->fetchEvents($connection, $startDate, $endDate);
        } catch (\Google_Service_Exception $e) {
            if ($e->getCode() === 401) {
                // Token is invalid even after potential refresh
                $connection->is_active = false;
                $connection->save();
                throw new \Exception('Access token is invalid. Please reconnect your Google Calendar.', 401);
            }
            throw new \Exception('Google Calendar API error: ' . $e->getMessage(), $e->getCode());
        } catch (\Exception $e) {
            throw new \Exception('Failed to fetch events from Google Calendar: ' . $e->getMessage());
        }

        // Save events to database
        $saved = 0;
        foreach ($events as $event) {
            if (!isset($event['id']) || !isset($event['start_time_utc']) || !isset($event['end_time_utc'])) {
                continue;
            }

            // Upsert by provider_event_id + connection
            $existing = CalendarEvent::where('calendar_connection_id', $connection->id)
                ->where('provider_event_id', $event['id'])
                ->first();

            $data = [
                'calendar_connection_id' => $connection->id,
                'provider_event_id' => $event['id'],
                'provider_calendar_id' => $connection->provider_calendar_id ?? 'primary',
                'event_type' => 'external',
                'is_external' => true,
                'allows_overlap' => false,
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
            $saved++;
        }

        return [
            'message' => "Sync completed: {$saved} event(s) processed",
            'count' => $saved,
        ];
    }
}
