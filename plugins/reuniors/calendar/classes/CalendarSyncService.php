<?php namespace Reuniors\Calendar\Classes;

use Carbon\Carbon;
use Reuniors\Calendar\Models\CalendarConnection;
use Reuniors\Calendar\Models\CalendarEvent;
use Illuminate\Support\Facades\Log;
use Exception;

/**
 * CalendarSyncService
 *
 * Generic calendar synchronization service that works with any provider
 */
class CalendarSyncService
{
    /**
     * Sync entity to calendar provider
     *
     * @param mixed $entity Entity to sync (e.g., ClientReservation)
     * @param string $entityType Entity type (e.g., 'Reuniors\Reservations\Models\ClientReservation')
     * @param callable $getConnectionCallback Callback to get connection for entity
     * @param callable $buildEventDataCallback Callback to build event data from entity
     */
    public static function syncToProvider($entity, $entityType, $getConnectionCallback, $buildEventDataCallback)
    {
        try {
            $connection = call_user_func($getConnectionCallback, $entity);

            if (!$connection || !$connection->sync_to_provider || !$connection->is_active) {
                return;
            }

            // Check if token is expired and refresh if needed
            if ($connection->isTokenExpired()) {
                self::refreshToken($connection);
            }

            // Build event data
            $eventData = call_user_func($buildEventDataCallback, $entity);

            // Get provider-specific sync service
            $providerService = self::getProviderService($connection->provider);

            // Check if event already exists (via entity-specific pivot)
            $existingEvent = self::findExistingEvent($entity, $entityType, $connection);

            if ($existingEvent) {
                // Update existing event
                $providerService->updateEvent($existingEvent, $eventData, $connection);
            } else {
                // Create new event
                $providerEvent = $providerService->createEvent($eventData, $connection);

                // Save calendar event
                $calendarEvent = CalendarEvent::create([
                    'calendar_connection_id' => $connection->id,
                    'provider_event_id' => $providerEvent['id'],
                    'provider_calendar_id' => $connection->provider_calendar_id ?? 'primary',
                    'event_type' => 'reservation',
                    'is_external' => false,
                    'allows_overlap' => false,
                    'start_time_utc' => Carbon::parse($eventData['start_time_utc']),
                    'end_time_utc' => Carbon::parse($eventData['end_time_utc']),
                    'summary' => $eventData['summary'],
                    'description' => $eventData['description'] ?? '',
                    'status' => 'confirmed',
                    'last_synced_at' => Carbon::now(),
                    'metadata' => $providerEvent['metadata'] ?? null,
                ]);

                // Create entity-specific pivot
                self::createEntityPivot($calendarEvent, $entity, $entityType);
            }
        } catch (Exception $e) {
            Log::error('Calendar sync error: ' . $e->getMessage(), [
                'entity_type' => $entityType,
                'entity_id' => $entity->id ?? null,
                'exception' => $e,
            ]);
        }
    }

    /**
     * Find existing calendar event for entity
     */
    protected static function findExistingEvent($entity, $entityType, $connection)
    {
        if ($entityType === 'Reuniors\Reservations\Models\ClientReservation') {
            $pivot = \Reuniors\Reservations\Models\ReservationCalendarEvent::where('client_reservation_id', $entity->id)
                ->whereHas('calendarEvent', function($q) use ($connection) {
                    $q->where('calendar_connection_id', $connection->id);
                })
                ->first();

            return $pivot ? $pivot->calendarEvent : null;
        }
        return null;
    }

    /**
     * Delete entity from calendar provider
     */
    public static function deleteFromProvider($entity, $entityType, $getConnectionCallback)
    {
        try {
            // Find calendar event via pivot
            $pivot = self::getEntityPivot($entity, $entityType);

            if (!$pivot) {
                return;
            }

            $calendarEvent = $pivot->calendarEvent;
            $connection = $calendarEvent->calendarConnection;

            if (!$connection || !$connection->is_active) {
                return;
            }

            // Check if token is expired and refresh if needed
            if ($connection->isTokenExpired()) {
                self::refreshToken($connection);
            }

            // Get provider-specific sync service
            $providerService = self::getProviderService($connection->provider);

            // Delete from provider
            $providerService->deleteEvent($calendarEvent, $connection);

            // Delete pivot and calendar event
            $pivot->delete();
            $calendarEvent->delete();
        } catch (Exception $e) {
            Log::error('Calendar delete error: ' . $e->getMessage(), [
                'entity_type' => $entityType,
                'entity_id' => $entity->id ?? null,
                'exception' => $e,
            ]);
        }
    }

    /**
     * Get provider-specific sync service
     */
    protected static function getProviderService($provider)
    {
        switch ($provider) {
            case 'google':
                return new \Reuniors\Calendar\Classes\Providers\GoogleCalendarProvider();
            case 'apple':
                return new \Reuniors\Calendar\Classes\Providers\AppleCalendarProvider();
            case 'outlook':
                return new \Reuniors\Calendar\Classes\Providers\OutlookCalendarProvider();
            default:
                throw new Exception('Unsupported provider: ' . $provider);
        }
    }

    /**
     * Refresh OAuth token
     */
    protected static function refreshToken(CalendarConnection $connection)
    {
        if (!$connection->refresh_token) {
            Log::error('Calendar token expired but no refresh token available', [
                'connection_id' => $connection->id,
                'provider' => $connection->provider,
            ]);
            return false;
        }

        $providerService = self::getProviderService($connection->provider);
        return $providerService->refreshToken($connection);
    }

    /**
     * Create entity-specific pivot
     */
    protected static function createEntityPivot($calendarEvent, $entity, $entityType)
    {
        // This will be implemented by the entity's plugin
        // For reservations, it will create ReservationCalendarEvent
        if ($entityType === 'Reuniors\Reservations\Models\ClientReservation') {
            \Reuniors\Reservations\Models\ReservationCalendarEvent::create([
                'calendar_event_id' => $calendarEvent->id,
                'client_reservation_id' => $entity->id,
            ]);
        }
    }

    /**
     * Get entity-specific pivot
     */
    protected static function getEntityPivot($entity, $entityType)
    {
        if ($entityType === 'Reuniors\Reservations\Models\ClientReservation') {
            return \Reuniors\Reservations\Models\ReservationCalendarEvent::where('client_reservation_id', $entity->id)->first();
        }
        return null;
    }
}

