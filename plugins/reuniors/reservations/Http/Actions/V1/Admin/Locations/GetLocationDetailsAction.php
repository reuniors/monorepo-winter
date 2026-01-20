<?php
namespace Reuniors\Reservations\Http\Actions\V1\Admin\Locations;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;

class GetLocationDetailsAction extends BaseAction
{
    use AsAction;

    public function handle(array $attributes = [])
    {
        $id = $attributes['id'] ?? null;

        if (!$id) {
            throw new \Exception('Location ID is required');
        }

        $location = Location::query()
            ->with(['city', 'workers', 'services_groups'])
            ->withCount(['workers', 'services_groups', 'reservations'])
            ->findOrFail($id);

        return $location;
    }
}
