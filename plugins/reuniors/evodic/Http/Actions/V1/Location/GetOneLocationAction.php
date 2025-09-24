<?php namespace Reuniors\Evodic\Http\Actions\V1\Location;

use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Evodic\Models\Location;
use Reuniors\Evodic\Models\Place;

class GetOneLocationAction extends BaseAction
{
    public function rules()
    {
        return [];
    }

    public function handle(array $attributes = [], Location $location = null)
    {
        $location->load([
            'city', 'city.country', 'main_owner',
            'cover', 'logo', 'gallery',
        ]);

        return $location;
    }

    public function asController(Location $location = null): array
    {
        return parent::asController($location);
    }
}
