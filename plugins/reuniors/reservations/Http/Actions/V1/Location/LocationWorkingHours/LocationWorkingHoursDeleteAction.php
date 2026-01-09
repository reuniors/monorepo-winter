<?php

namespace Reuniors\Reservations\Http\Actions\V1\Location\LocationWorkingHours;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;
use Reuniors\Reservations\Models\WorkingTime;

class LocationWorkingHoursDeleteAction extends BaseAction
{
    public function rules()
    {
        return [
            'id' => ['required', 'integer'],
            'location_slug' => ['required', 'string'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $location = Location::where('slug', $attributes['location_slug'])->first();
        if (!$location) {
            throw new \Exception('Location not found');
        }

        $workingHours = WorkingTime::find($attributes['id']);
        if (!$workingHours) {
            throw new \Exception('Working hours not found');
        }

        // Detach from location
        $location->working_hours()->detach($workingHours->id);

        // Invalidate location data cache
        \Reuniors\Reservations\Http\Actions\V1\Location\Cache\ClearLocationDataCache::invalidateCache($location->slug);

        // Delete the working hours if not used by other locations
        if ($workingHours->locations()->count() === 0) {
            $workingHours->delete();
        }

        return true;
    }
}
