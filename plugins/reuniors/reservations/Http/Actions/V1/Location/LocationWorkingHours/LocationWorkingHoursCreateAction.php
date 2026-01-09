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
            'time_from_utc' => ['required', 'string', 'regex:/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/'],
            'time_to_utc' => ['required', 'string', 'regex:/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/'],
            'days_codes' => ['required', 'array'],
            'active' => ['required', 'boolean'],
            'shift' => ['sometimes', 'integer'],
            'pause_time_from' => ['sometimes', 'string', 'regex:/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/'],
            'pause_time_to' => ['sometimes', 'string', 'regex:/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/'],
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

        // Check if working hours already exist for this combination
        $existingHours = $location
            ->working_hours()
            ->where('name', $attributes['name'])
            ->where('time_from_utc', $attributes['time_from_utc'])
            ->where('time_to_utc', $attributes['time_to_utc'])
            ->first();

        if ($existingHours) {
            throw new \Exception('Working hours already exist with this configuration');
        }

        $workingHours = new WorkingTime([
            'name' => $attributes['name'],
            'time_from_utc' => $attributes['time_from_utc'],
            'time_to_utc' => $attributes['time_to_utc'],
            'days_codes' => $attributes['days_codes'],
            'active' => $attributes['active'],
            'shift' => $attributes['shift'] ?? null,
            'pause_time_from' => $attributes['pause_time_from'] ?? null,
            'pause_time_to' => $attributes['pause_time_to'] ?? null,
            'pauses_utc' => $attributes['pauses_utc'] ?? null,
        ]);

        $workingHours->save();

        // Attach to location
        $location->working_hours()->attach($workingHours->id);

        // Invalidate location data cache
        \Reuniors\Reservations\Http\Actions\V1\Location\Cache\ClearLocationDataCache::invalidateCache($location->slug);

        return $workingHours;
    }
}
