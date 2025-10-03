<?php

namespace Reuniors\Reservations\Http\Actions\V1\Location\LocationWorkingHours;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;
use Reuniors\Reservations\Models\WorkingTime;

class LocationWorkingHoursGetAction extends BaseAction
{
    public function rules()
    {
        return [
            'locationSlug' => ['required', 'string'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $location = Location::where('slug', $attributes['locationSlug'])->first();
        if (!$location) {
            throw new \Exception('Location not found');
        }

        $workingHours = $location
            ->working_hours()
            ->orderBy('time_from_utc') // Order by UTC field
            ->get();

        // Return UTC data directly - frontend will handle timezone conversion
        return $workingHours;
    }
}
