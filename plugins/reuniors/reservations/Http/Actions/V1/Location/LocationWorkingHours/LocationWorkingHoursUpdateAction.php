<?php

namespace Reuniors\Reservations\Http\Actions\V1\Location\LocationWorkingHours;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\WorkingTime;

class LocationWorkingHoursUpdateAction extends BaseAction
{
    public function rules()
    {
        return [
            'id' => ['required', 'integer'],
            'name' => ['sometimes', 'string'],
            'time_from_utc' => ['sometimes', 'string', 'regex:/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/'],
            'time_to_utc' => ['sometimes', 'string', 'regex:/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/'],
            'days_codes' => ['sometimes', 'array'],
            'active' => ['sometimes', 'boolean'],
            'shift' => ['sometimes', 'integer'],
            'pauses_utc' => ['sometimes', 'array'],
            'pauses_utc.*.time_from_utc' => ['required', 'string', 'regex:/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/'],
            'pauses_utc.*.time_to_utc' => ['required', 'string', 'regex:/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/'],
            'pauses_utc.*.days_codes' => ['required', 'array'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $workingHours = WorkingTime::find($attributes['id']);
        if (!$workingHours) {
            throw new \Exception('Working hours not found');
        }

        $workingHours->fill($attributes);
        $workingHours->save();

        // Invalidate location data cache for all locations using this working hours
        $locations = $workingHours->locations;
        foreach ($locations as $location) {
            \Reuniors\Reservations\Http\Actions\V1\Location\Cache\ClearLocationDataCache::invalidateCache($location->slug);
        }

        return $workingHours;
    }
}
