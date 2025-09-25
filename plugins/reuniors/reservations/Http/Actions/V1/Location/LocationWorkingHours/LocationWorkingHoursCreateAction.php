<?php

namespace Reuniors\Reservations\Http\Actions\V1\Location\LocationWorkingHours;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;
use Reuniors\Reservations\Models\WorkingTime;

class LocationWorkingHoursCreateAction extends BaseAction
{
    public function rules()
    {
        return [
            'location_slug' => ['required', 'string'],
            'name' => ['required', 'string'],
            'time_from' => ['required', 'string', 'regex:/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/'],
            'time_to' => ['required', 'string', 'regex:/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/'],
            'days_codes' => ['required', 'array'],
            'active' => ['required', 'boolean'],
            'shift' => ['sometimes', 'integer'],
            'pause_time_from' => ['sometimes', 'string', 'regex:/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/'],
            'pause_time_to' => ['sometimes', 'string', 'regex:/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/'],
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

        // Check if working hours already exist for this combination
        $existingHours = $location
            ->working_hours()
            ->where('name', $attributes['name'])
            ->where('time_from', $attributes['time_from'])
            ->where('time_to', $attributes['time_to'])
            ->first();

        if ($existingHours) {
            throw new \Exception('Working hours already exist with this configuration');
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

        // Attach to location
        $location->working_hours()->attach($workingHours->id);

        return $workingHours;
    }
}
