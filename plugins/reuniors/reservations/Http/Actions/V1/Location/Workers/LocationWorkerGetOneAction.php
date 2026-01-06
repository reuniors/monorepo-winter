<?php
namespace Reuniors\Reservations\Http\Actions\V1\Location\Workers;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;
use Reuniors\Reservations\Models\LocationWorker;

class LocationWorkerGetOneAction extends BaseAction
{
    public function rules()
    {
        return [
            'locationSlug' => ['required', 'string'],
        ];
    }

    public function handle(array $attributes = [], LocationWorker $worker = null)
    {
        $locationSlug = $attributes['locationSlug'];

        $location = Location::where('slug', $locationSlug)->firstOrFail();

        // Verify that the worker belongs to this location
        if (!$worker->locations->contains($location->id)) {
            throw new \Exception('Worker not found for this location');
        }

        return $worker->load(['avatar', 'user.groups', 'services', 'serviceCategories:id,title,slug,active']);
    }

    public function asController(LocationWorker $worker = null): array
    {
        return parent::asController($worker);
    }
}
