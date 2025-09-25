<?php

namespace Reuniors\Reservations\Http\Actions\V1\Location\WorkerWorkingHours;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;

class WorkerWorkingHoursGetAction extends BaseAction
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

        $workers = $location
            ->workers()
            ->with('working_hours')
            ->orderBy('first_name')
            ->orderBy('last_name')
            ->get();

        return $workers;
    }
}
