<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\GoogleCalendar;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Calendar\Models\CalendarConnection;
use Reuniors\Reservations\Models\ReservationCalendarConnection;
use Reuniors\Reservations\Models\LocationWorker;
use Winter\User\Facades\Auth;

class GoogleCalendarSettingsGetAction extends BaseAction
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
            // Return default settings for non-worker users
            return [
                'syncToCalendar' => true,
                'syncFromCalendar' => true,
                'blockOverlappingSlots' => true,
                'allowOverlappingWithApproval' => false,
                'googleEmail' => null,
                'isConnected' => false,
            ];
        }

        // Get location ID for this worker
        $locationId = $worker->locations()->first()->id ?? null;

        // Try to find connection for this worker or their location
        $pivotConnection = ReservationCalendarConnection::where(function($query) use ($worker, $locationId) {
            $query->where('location_worker_id', $worker->id);
            if ($locationId) {
                $query->orWhere('location_id', $locationId);
            }
        })
        ->whereHas('calendarConnection', function($query) {
            $query->where('is_active', true)
                  ->where('provider', 'google');
        })
        ->with('calendarConnection')
        ->first();

        if (!$pivotConnection || !$pivotConnection->calendarConnection) {
            return [
                'syncToCalendar' => true,
                'syncFromCalendar' => true,
                'blockOverlappingSlots' => true,
                'allowOverlappingWithApproval' => false,
                'googleEmail' => null,
                'isConnected' => false,
            ];
        }

        $connection = $pivotConnection->calendarConnection;

        // Check if token is expired based on token_expires_at
        // (Don't validate with Google API here - too expensive for settings endpoint)
        $isTokenExpired = $connection->token_expires_at && $connection->token_expires_at->isPast();

        // If token is expired and we have refresh_token, try to refresh
        // This is "lazy refresh" - only when user opens settings page
        if ($isTokenExpired && $connection->refresh_token) {
            try {
                $provider = new \Reuniors\Calendar\Classes\Providers\GoogleCalendarProvider();
                $refreshed = $provider->refreshToken($connection);

                if ($refreshed) {
                    // Token refreshed successfully
                    $isTokenExpired = false;
                } else {
                    // Refresh failed - mark as inactive
                    $connection->is_active = false;
                    $connection->save();
                }
            } catch (\Exception $e) {
                // Refresh failed - mark as inactive
                $connection->is_active = false;
                $connection->save();
            }
        } elseif ($isTokenExpired && !$connection->refresh_token) {
            // No refresh token available - mark as inactive
            $connection->is_active = false;
            $connection->save();
        }

        return [
            'syncToCalendar' => $connection->sync_to_provider,
            'syncFromCalendar' => $connection->sync_from_provider,
            'blockOverlappingSlots' => $connection->block_overlapping_slots,
            'allowOverlappingWithApproval' => $connection->allow_overlapping_with_approval,
            'googleEmail' => $connection->provider_email,
            'isConnected' => !$isTokenExpired && $connection->is_active, // Connected if token is valid
            'tokenExpiresAt' => $connection->token_expires_at?->toIso8601String(),
        ];
    }
}

