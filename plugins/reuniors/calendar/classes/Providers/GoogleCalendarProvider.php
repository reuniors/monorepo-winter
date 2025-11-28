<?php namespace Reuniors\Calendar\Classes\Providers;

use Reuniors\Calendar\Models\CalendarConnection;
use Reuniors\Calendar\Models\CalendarEvent;
use Spatie\GoogleCalendar\Event as GoogleEvent;
use Google_Client;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class GoogleCalendarProvider
{
    /**
     * Create event in Google Calendar
     */
    public function createEvent(array $eventData, CalendarConnection $connection)
    {
        // Set access token for Spatie package
        config(['google-calendar.access_token' => $connection->access_token]);

        $googleEvent = GoogleEvent::create([
            'name' => $eventData['summary'],
            'description' => $eventData['description'] ?? '',
            'startDateTime' => Carbon::parse($eventData['start_time_utc']),
            'endDateTime' => Carbon::parse($eventData['end_time_utc']),
            'location' => $eventData['location'] ?? null,
        ]);

        return [
            'id' => $googleEvent->id,
            'metadata' => [
                'google_event_id' => $googleEvent->id,
                'google_calendar_id' => $connection->provider_calendar_id ?? 'primary',
            ],
        ];
    }

    /**
     * Update event in Google Calendar
     */
    public function updateEvent(CalendarEvent $calendarEvent, array $eventData, CalendarConnection $connection)
    {
        // Set access token for Spatie package
        config(['google-calendar.access_token' => $connection->access_token]);

        $googleEvent = GoogleEvent::find($calendarEvent->provider_event_id);

        if ($googleEvent) {
            $googleEvent->name = $eventData['summary'];
            $googleEvent->description = $eventData['description'] ?? '';
            $googleEvent->startDateTime = Carbon::parse($eventData['start_time_utc']);
            $googleEvent->endDateTime = Carbon::parse($eventData['end_time_utc']);
            $googleEvent->save();

            // Update local event
            $calendarEvent->start_time_utc = Carbon::parse($eventData['start_time_utc']);
            $calendarEvent->end_time_utc = Carbon::parse($eventData['end_time_utc']);
            $calendarEvent->summary = $eventData['summary'];
            $calendarEvent->description = $eventData['description'] ?? '';
            $calendarEvent->last_synced_at = Carbon::now();
            $calendarEvent->save();
        }
    }

    /**
     * Delete event from Google Calendar
     */
    public function deleteEvent(CalendarEvent $calendarEvent, CalendarConnection $connection)
    {
        // Set access token for Spatie package
        config(['google-calendar.access_token' => $connection->access_token]);

        $googleEvent = GoogleEvent::find($calendarEvent->provider_event_id);
        if ($googleEvent) {
            $googleEvent->delete();
        }
    }

    /**
     * Fetch events from Google Calendar
     */
    public function fetchEvents(CalendarConnection $connection, Carbon $startDate, Carbon $endDate)
    {
        try {
            // Create Google Client directly (not using Spatie)
            $client = new Google_Client();
            $client->setAccessToken($connection->access_token);

            // Create Calendar Service
            $service = new \Google_Service_Calendar($client);

            // Fetch events
            $calendarId = $connection->provider_calendar_id ?? 'primary';
            $optParams = [
                'orderBy' => 'startTime',
                'singleEvents' => true,
                'timeMin' => $startDate->toRfc3339String(),
                'timeMax' => $endDate->toRfc3339String(),
            ];

            $results = $service->events->listEvents($calendarId, $optParams);
            $events = $results->getItems();

            $result = [];
            foreach ($events as $event) {
                $start = $event->start->dateTime ?? $event->start->date;
                $end = $event->end->dateTime ?? $event->end->date;

                $result[] = [
                    'id' => $event->id,
                    'summary' => $event->summary ?? null,
                    'description' => $event->description ?? null,
                    'start_time_utc' => Carbon::parse($start),
                    'end_time_utc' => Carbon::parse($end),
                    'status' => $event->status ?? 'confirmed',
                ];
            }

            return $result;
        } catch (\Exception $e) {
            Log::error('Google Calendar fetch events error: ' . $e->getMessage(), [
                'connection_id' => $connection->id,
                'exception' => $e,
            ]);
            throw $e;
        }
    }

    /**
     * Refresh OAuth token
     */
    public function refreshToken(CalendarConnection $connection)
    {
        try {
            $client = new Google_Client();
            $client->setClientId(config('services.google.client_id'));
            $client->setClientSecret(config('services.google.client_secret'));
            $client->refreshToken($connection->refresh_token);

            $newToken = $client->getAccessToken();

            if (!$newToken) {
                Log::error('Google Calendar token refresh failed: No token returned', [
                    'connection_id' => $connection->id,
                ]);
                return false;
            }

            $connection->access_token = $newToken['access_token'];

            if (isset($newToken['refresh_token'])) {
                $connection->refresh_token = $newToken['refresh_token'];
            }

            $expiresIn = $newToken['expires_in'] ?? 3600;
            $connection->token_expires_at = Carbon::now()->addSeconds($expiresIn);
            $connection->save();

            return true;
        } catch (\Exception $e) {
            Log::error('Google Calendar token refresh error: ' . $e->getMessage(), [
                'connection_id' => $connection->id,
                'exception' => $e,
            ]);

            $connection->is_active = false;
            $connection->save();

            return false;
        }
    }
}

