<?php

namespace Reuniors\Reservations\Http\Actions\V1\Location\WorkerWorkingHours;

use Reuniors\Reservations\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;
use Reuniors\Reservations\Models\LocationWorker;
use Reuniors\Reservations\Models\WorkingTime;

class WorkerWorkingHoursCreateAction extends BaseAction
{
    public function rules()
    {
        return [
            'location_slug' => ['required', 'string'],
            'worker_id' => ['required', 'integer'],
            'name' => ['required', 'string'],
            'time_from' => ['required', 'string', 'regex:/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/'],
            'time_to' => ['required', 'string', 'regex:/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/'],
            'days_codes' => ['required', 'array'],
            'active' => ['required', 'boolean'],
            'shift' => ['sometimes', 'integer'],
            'pauses' => ['sometimes', 'array'],
            'pauses.*.time_from' => ['required', 'string', 'regex:/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/'],
            'pauses.*.time_to' => ['required', 'string', 'regex:/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/'],
            'pauses.*.days_codes' => ['required', 'array'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $location = Location::where('slug', $attributes['location_slug'])->first();
        if (!$location) {
            throw new \Exception('Location not found');
        }

        $worker = LocationWorker::find($attributes['worker_id']);
        if (!$worker) {
            throw new \Exception('Worker not found');
        }

        // Check if worker belongs to this location
        if (!$location->workers()->where('location_worker_id', $worker->id)->exists()) {
            throw new \Exception('Worker does not belong to this location');
        }

        // Check if working hours already exist for this worker with this configuration
        $existingHours = $worker
            ->working_hours()
            ->where('name', $attributes['name'])
            ->where('time_from', $attributes['time_from'])
            ->where('time_to', $attributes['time_to'])
            ->first();

        if ($existingHours) {
            throw new \Exception('Working hours already exist for this worker with this configuration');
        }

        $workingHours = new WorkingTime([
            'name' => $attributes['name'],
            'time_from' => $attributes['time_from'],
            'time_to' => $attributes['time_to'],
            'days_codes' => $attributes['days_codes'],
            'active' => $attributes['active'],
            'shift' => $attributes['shift'] ?? null,
            'pause_time_from' => $attributes['pause_time_from'] ?? null,
            'pause_time_to' => $attributes['pause_time_to'] ?? null,
            'pauses' => $attributes['pauses'] ?? null,
        ]);

        $workingHours->save();

        // Attach to worker
        $worker->working_hours()->attach($workingHours->id);

        return $workingHours->load('workers');
    }
}
