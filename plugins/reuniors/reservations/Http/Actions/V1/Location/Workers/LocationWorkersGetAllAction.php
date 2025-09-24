<?php
namespace Reuniors\Reservations\Http\Actions\V1\Location\Workers;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;
use Reuniors\Reservations\Models\LocationWorker;

class LocationWorkersGetAllAction extends BaseAction
{
    public function rules()
    {
        return [
            'locationSlug' => ['required', 'string'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $locationSlug = $attributes['locationSlug'];
        $location = Location::where('slug', $locationSlug)->first();
        if (!$location) {
            throw new \Exception('Location not found');
        }
        $workers = LocationWorker::whereHas('locations', function ($query) use ($location) {
            $query->where('id', $location->id);
        })
        ->with('user')
        ->paginate(1000);
        return $workers;
    }
} 