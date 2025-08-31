<?php
namespace Reuniors\Reservations\Http\Actions\V1\Location\Workers;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Reservations\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;
use Reuniors\Reservations\Models\LocationWorker;

class LocationWorkerDeleteAction extends BaseAction
{
    use AsAction;

    public function rules()
    {
        return [
            'id' => ['required', 'integer'],
            'locationSlug' => ['required', 'string'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $location = Location::where('slug', $attributes['locationSlug'])->first();
        if (!$location) {
            throw new \Exception('Location not found');
        }

        $worker = LocationWorker::find($attributes['id']);
        if (!$worker) {
            throw new \Exception('Worker not found');
        }

        // Detach from location
        $location->workers()->detach($worker->id);

        // If not attached to any other location, delete
        if ($worker->locations()->count() === 0) {
            $worker->delete();
        }

        return true;
    }
} 