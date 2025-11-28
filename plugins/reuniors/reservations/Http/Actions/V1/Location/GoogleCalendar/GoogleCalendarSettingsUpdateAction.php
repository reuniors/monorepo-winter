<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\GoogleCalendar;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Calendar\Models\CalendarConnection;
use Reuniors\Reservations\Models\ReservationCalendarConnection;
use Reuniors\Reservations\Models\LocationWorker;
use Winter\User\Facades\Auth;

class GoogleCalendarSettingsUpdateAction extends BaseAction
{
    public function rules()
    {
        return [
            'syncToCalendar' => ['required', 'boolean'],
            'syncFromCalendar' => ['required', 'boolean'],
            'blockOverlappingSlots' => ['required', 'boolean'],
            'allowOverlappingWithApproval' => ['required', 'boolean'],
        ];
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

        // Get location ID for this worker
        $locationId = $worker->locations()->first()->id ?? null;

        // Find connection for this worker or their location
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
            throw new \Exception('Google Calendar not connected. Please connect first.');
        }

        $connection = $pivotConnection->calendarConnection;

        // Update settings
        $connection->update([
            'sync_to_provider' => $attributes['syncToCalendar'],
            'sync_from_provider' => $attributes['syncFromCalendar'],
            'block_overlapping_slots' => $attributes['blockOverlappingSlots'],
            'allow_overlapping_with_approval' => $attributes['allowOverlappingWithApproval'],
        ]);

        return [
            'syncToCalendar' => $connection->sync_to_provider,
            'syncFromCalendar' => $connection->sync_from_provider,
            'blockOverlappingSlots' => $connection->block_overlapping_slots,
            'allowOverlappingWithApproval' => $connection->allow_overlapping_with_approval,
            'googleEmail' => $connection->provider_email,
            'isConnected' => true,
        ];
    }
}

