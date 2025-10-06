<?php

namespace Reuniors\Reservations\Http\Actions\V1\Location\WorkerWorkingHours;

use Reuniors\Base\Http\Actions\BaseAction;
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
            'time_from_utc' => ['required', 'string', 'regex:/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/'],
            'time_to_utc' => ['required', 'string', 'regex:/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/'],
            'days_codes' => ['required', 'array'],
            'active' => ['required', 'boolean'],
            'shift' => ['sometimes', 'integer'],
            'pauses_utc' => ['sometimes', 'array'],
            'pauses_utc.*.time_from_utc' => ['required', 'string', 'regex:/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/'],
            'pauses_utc.*.time_to_utc' => ['required', 'string', 'regex:/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/'],
            'pauses_utc.*.days_codes' => ['required', 'array'],
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
            ->where('time_from_utc', $attributes['time_from_utc'])
            ->where('time_to_utc', $attributes['time_to_utc'])
            ->first();

        if ($existingHours) {
            throw new \Exception('Working hours already exist for this worker with this configuration');
        }

        $workingHours = new WorkingTime([
            'name' => $attributes['name'],
            'time_from_utc' => $attributes['time_from_utc'],
            'time_to_utc' => $attributes['time_to_utc'],
            'days_codes' => $attributes['days_codes'],
            'active' => $attributes['active'],
            'shift' => $attributes['shift'] ?? null,
            'pauses_utc' => $attributes['pauses_utc'] ?? null,
        ]);

        $workingHours->save();

        // Attach to worker
        $worker->working_hours()->attach($workingHours->id);

        return $workingHours->load('workers');
    }
}
