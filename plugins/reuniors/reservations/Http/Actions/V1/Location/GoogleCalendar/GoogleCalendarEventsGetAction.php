<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\GoogleCalendar;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\LocationWorker;
use Reuniors\Reservations\Models\ReservationCalendarConnection;
use Reuniors\Calendar\Models\CalendarEvent;
use Winter\User\Facades\Auth;

class GoogleCalendarEventsGetAction extends BaseAction
{
    public function rules()
    {
        return [
            'limit' => ['nullable', 'integer', 'min:1', 'max:100'],
        ];
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

        $limit = (int)($attributes['limit'] ?? 20);

        // Find pivot connection for worker/location with google provider
        $pivot = ReservationCalendarConnection::where(function($q) use ($worker) {
            $q->where('location_worker_id', $worker->id);
        })
        ->whereHas('calendarConnection', function($q) {
            $q->where('provider', 'google')
              ->where('is_active', true);
        })
        ->with('calendarConnection')
        ->first();

        if (!$pivot || !$pivot->calendarConnection) {
            return [];
        }

        $connectionId = $pivot->calendarConnection->id;

        // Fetch recent events for this connection
        $events = CalendarEvent::where('calendar_connection_id', $connectionId)
            ->orderByDesc('start_time_utc')
            ->limit($limit)
            ->get()
            ->map(function($ev) {
                return [
                    'id' => (int)$ev->id,
                    'summary' => $ev->summary ?? null,
                    'description' => $ev->description ?? null,
                    'startTimeUtc' => $ev->start_time_utc,
                    'endTimeUtc' => $ev->end_time_utc,
                    'isExternal' => (bool)($ev->is_external ?? true),
                ];
            });

        return $events->values();
    }
}

