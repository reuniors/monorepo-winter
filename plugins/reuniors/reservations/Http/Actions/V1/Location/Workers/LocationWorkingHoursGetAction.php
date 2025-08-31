<?php
namespace Reuniors\Reservations\Http\Actions\V1\Location\Workers;

use Reuniors\Reservations\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;
use Reuniors\Reservations\Models\LocationWorker;

class LocationWorkingHoursGetAction extends BaseAction
{
    public function rules()
    {
        return [
            'locationSlug' => ['string', 'required'],
            'workerId' => ['integer', 'required'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $location = Location::where('slug', $attributes['locationSlug'])
            ->firstOrFail();

        $worker = LocationWorker::where('id', $attributes['workerId'])
            ->whereHas('locations', function ($query) use ($location) {
                $query->where('id', $location->id);
            })
            ->with('working_hours')
            ->firstOrFail();

        return $worker->working_hours;
    }
}
