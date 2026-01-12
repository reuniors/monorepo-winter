<?php namespace Reuniors\Reservations\Classes\Listeners;

use Reuniors\Reservations\Models\ClientReservation;
use Reuniors\Reservations\Models\ReservationCalendarConnection;
use Reuniors\Reservations\Models\ReservationCalendarEvent;
use Reuniors\Calendar\Models\CalendarConnection;
use Reuniors\Calendar\Models\CalendarEvent;
use Reuniors\Calendar\Classes\Providers\GoogleCalendarProvider;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

/**
 * Google Calendar Sync Listener
 *
 * Automatically syncs reservations to Google Calendar when:
 * - Reservation is created
 * - Reservation is updated
 * - Reservation is deleted
 *
 * Runs on backend WITHOUT user interaction.
 */
class GoogleCalendarSyncListener
{
    /**
     * Handle reservation created event
     */
    public function onReservationCreated(ClientReservation $reservation)
    {
        // Log::info('GoogleCalendarSyncListener: Reservation created', [
        //     'reservation_id' => $reservation->id,
        // ]);

        // Find active Google Calendar connection for this worker/location
        $connection = $this->findActiveConnection($reservation);

        if (!$connection || !$connection->sync_to_provider) {
            // Log::info('GoogleCalendarSyncListener: No active connection or sync disabled', [
            //     'reservation_id' => $reservation->id,
            // ]);
            return;
        }

        try {
            // Create event in Google Calendar
            $this->createEventInGoogleCalendar($reservation, $connection);

            // Log::info('GoogleCalendarSyncListener: Event created in Google Calendar', [
            //     'reservation_id' => $reservation->id,
            //     'connection_id' => $connection->id,
            // ]);
        } catch (\Exception $e) {
            Log::error('GoogleCalendarSyncListener: Failed to create event', [
                'reservation_id' => $reservation->id,
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Handle reservation updated event
     */
    public function onReservationUpdated(ClientReservation $reservation)
    {
        Log::info('GoogleCalendarSyncListener: Reservation updated', [
            'reservation_id' => $reservation->id,
        ]);

        // Find existing calendar event
        $pivot = ReservationCalendarEvent::where('client_reservation_id', $reservation->id)->first();

        if (!$pivot || !$pivot->calendarEvent) {
            // No calendar event exists, try to create it
            $this->onReservationCreated($reservation);
            return;
        }

        $calendarEvent = $pivot->calendarEvent;
        $connection = $calendarEvent->calendarConnection;

        if (!$connection || !$connection->is_active || !$connection->sync_to_provider) {
            return;
        }

        try {
            // Update event in Google Calendar
            $this->updateEventInGoogleCalendar($reservation, $calendarEvent, $connection);

            Log::info('GoogleCalendarSyncListener: Event updated in Google Calendar', [
                'reservation_id' => $reservation->id,
                'calendar_event_id' => $calendarEvent->id,
            ]);
        } catch (\Exception $e) {
            Log::error('GoogleCalendarSyncListener: Failed to update event', [
                'reservation_id' => $reservation->id,
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Handle reservation deleted event
     */
    public function onReservationDeleted(ClientReservation $reservation)
    {
        // Log::info('GoogleCalendarSyncListener: Reservation deleted', [
        //     'reservation_id' => $reservation->id,
        // ]);

        // Find existing calendar event
        $pivot = ReservationCalendarEvent::where('client_reservation_id', $reservation->id)->first();

        if (!$pivot || !$pivot->calendarEvent) {
            return;
        }

        $calendarEvent = $pivot->calendarEvent;
        $connection = $calendarEvent->calendarConnection;

        if (!$connection || !$connection->is_active) {
            return;
        }

        try {
            // Delete event from Google Calendar
            $this->deleteEventFromGoogleCalendar($calendarEvent, $connection);

            // Delete pivot and calendar event
            $pivot->delete();
            $calendarEvent->delete();

            // Log::info('GoogleCalendarSyncListener: Event deleted from Google Calendar', [
            //     'reservation_id' => $reservation->id,
            //     'calendar_event_id' => $calendarEvent->id,
            // ]);
        } catch (\Exception $e) {
            Log::error('GoogleCalendarSyncListener: Failed to delete event', [
                'reservation_id' => $reservation->id,
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Find active Google Calendar connection for reservation
     */
    protected function findActiveConnection(ClientReservation $reservation): ?CalendarConnection
    {
        // Get worker ID from reservation (legacy field names: worker_id or location_worker_id)
        $locationWorkerId = $reservation->worker_id ?? $reservation->location_worker_id;

        if (!$locationWorkerId) {
            return null;
        }

        // Find connection via pivot for this location worker
        $pivot = ReservationCalendarConnection::where('location_worker_id', $locationWorkerId)
            ->whereHas('calendarConnection', function($q) {
                $q->where('provider', 'google')
                  ->where('is_active', true);
            })
            ->with('calendarConnection')
            ->first();

        return $pivot ? $pivot->calendarConnection : null;
    }

    /**
     * Create event in Google Calendar
     */
    protected function createEventInGoogleCalendar(ClientReservation $reservation, CalendarConnection $connection)
    {
        // Get location timezone (default: Europe/Belgrade)
        $timezone = $this->getLocationTimezone($reservation);

        // Create Google Client
        $client = new \Google_Client();
        $client->setAccessToken($connection->access_token);

        // Create Calendar Service
        $service = new \Google_Service_Calendar($client);
        $calendarId = $connection->provider_calendar_id ?? 'primary';

        // Build event data
        $event = new \Google_Service_Calendar_Event();

        // Title: Service name + Client name
        $summary = $reservation->service->name ?? 'Rezervacija';
        if ($reservation->client) {
            $summary .= ' - ' . $reservation->client->name;
        }
        $event->setSummary($summary);

        // Description
        $description = "Rezervacija ID: {$reservation->id}\n";
        if ($reservation->note) {
            $description .= "Napomena: {$reservation->note}\n";
        }
        $event->setDescription($description);

        // Start time - convert UTC to location timezone
        $start = new \Google_Service_Calendar_EventDateTime();
        $startUtc = Carbon::parse($reservation->start_time_utc, 'UTC');
        $start->setDateTime($startUtc->setTimezone($timezone)->toIso8601String());
        $start->setTimeZone($timezone);
        $event->setStart($start);

        // End time - convert UTC to location timezone
        $end = new \Google_Service_Calendar_EventDateTime();
        $endUtc = Carbon::parse($reservation->end_time_utc, 'UTC');
        $end->setDateTime($endUtc->setTimezone($timezone)->toIso8601String());
        $end->setTimeZone($timezone);
        $event->setEnd($end);

        // Create event in Google Calendar
        $googleEvent = $service->events->insert($calendarId, $event);

        // Save to our database
        $calendarEvent = CalendarEvent::create([
            'calendar_connection_id' => $connection->id,
            'provider_event_id' => $googleEvent->getId(),
            'provider_calendar_id' => $calendarId,
            'event_type' => 'reservation',
            'is_external' => false,
            'allows_overlap' => false,
            'start_time_utc' => $reservation->start_time_utc,
            'end_time_utc' => $reservation->end_time_utc,
            'summary' => $summary,
            'description' => $description,
            'status' => 'confirmed',
            'last_synced_at' => Carbon::now(),
        ]);

        // Create pivot (link reservation to calendar event)
        ReservationCalendarEvent::create([
            'client_reservation_id' => $reservation->id,
            'calendar_event_id' => $calendarEvent->id,
        ]);
    }

    /**
     * Update event in Google Calendar
     */
    protected function updateEventInGoogleCalendar(
        ClientReservation $reservation,
        CalendarEvent $calendarEvent,
        CalendarConnection $connection
    ) {
        // Get location timezone (default: Europe/Belgrade)
        $timezone = $this->getLocationTimezone($reservation);

        // Create Google Client
        $client = new \Google_Client();
        $client->setAccessToken($connection->access_token);

        // Create Calendar Service
        $service = new \Google_Service_Calendar($client);
        $calendarId = $connection->provider_calendar_id ?? 'primary';

        // Get existing event
        $googleEvent = $service->events->get($calendarId, $calendarEvent->provider_event_id);

        // Update event data
        $summary = $reservation->service->name ?? 'Rezervacija';
        if ($reservation->client) {
            $summary .= ' - ' . $reservation->client->name;
        }
        $googleEvent->setSummary($summary);

        $description = "Rezervacija ID: {$reservation->id}\n";
        if ($reservation->note) {
            $description .= "Napomena: {$reservation->note}\n";
        }
        $googleEvent->setDescription($description);

        // Update times - convert UTC to location timezone
        $start = new \Google_Service_Calendar_EventDateTime();
        $startUtc = Carbon::parse($reservation->start_time_utc, 'UTC');
        $start->setDateTime($startUtc->setTimezone($timezone)->toIso8601String());
        $start->setTimeZone($timezone);
        $googleEvent->setStart($start);

        $end = new \Google_Service_Calendar_EventDateTime();
        $endUtc = Carbon::parse($reservation->end_time_utc, 'UTC');
        $end->setDateTime($endUtc->setTimezone($timezone)->toIso8601String());
        $end->setTimeZone($timezone);
        $googleEvent->setEnd($end);

        // Update event in Google Calendar
        $service->events->update($calendarId, $calendarEvent->provider_event_id, $googleEvent);

        // Update local calendar event
        $calendarEvent->update([
            'start_time_utc' => $reservation->start_time_utc,
            'end_time_utc' => $reservation->end_time_utc,
            'summary' => $summary,
            'description' => $description,
            'last_synced_at' => Carbon::now(),
        ]);
    }

    /**
     * Delete event from Google Calendar
     */
    protected function deleteEventFromGoogleCalendar(CalendarEvent $calendarEvent, CalendarConnection $connection)
    {
        // Create Google Client
        $client = new \Google_Client();
        $client->setAccessToken($connection->access_token);

        // Create Calendar Service
        $service = new \Google_Service_Calendar($client);
        $calendarId = $connection->provider_calendar_id ?? 'primary';

        // Delete event from Google Calendar
        $service->events->delete($calendarId, $calendarEvent->provider_event_id);
    }

    /**
     * Get location timezone from reservation
     *
     * @param ClientReservation $reservation
     * @return string Timezone identifier (e.g., 'Europe/Belgrade')
     */
    protected function getLocationTimezone(ClientReservation $reservation): string
    {
        // Try to get timezone from location
        if ($reservation->location && $reservation->location->timezone) {
            return $reservation->location->timezone;
        }

        // Try to get timezone from worker's location
        if ($reservation->worker && $reservation->worker->locations()->first()) {
            $location = $reservation->worker->locations()->first();
            if ($location->timezone) {
                return $location->timezone;
            }
        }

        // Fallback to Europe/Belgrade (default for RZR)
        return 'Europe/Belgrade';
    }

    /**
     * Subscribe to ClientReservation events
     */
    public function subscribe($events)
    {
        $events->listen(
            'eloquent.created: Reuniors\Reservations\Models\ClientReservation',
            [GoogleCalendarSyncListener::class, 'onReservationCreated']
        );

        $events->listen(
            'eloquent.updated: Reuniors\Reservations\Models\ClientReservation',
            [GoogleCalendarSyncListener::class, 'onReservationUpdated']
        );

        $events->listen(
            'eloquent.deleted: Reuniors\Reservations\Models\ClientReservation',
            [GoogleCalendarSyncListener::class, 'onReservationDeleted']
        );
    }
}
