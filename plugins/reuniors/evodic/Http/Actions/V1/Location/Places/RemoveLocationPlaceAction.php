<?php namespace reuniors\evodic\Http\Actions\V1\Location\Places;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Evodic\Models\Location;
use Reuniors\Evodic\Models\Place;

class RemoveLocationPlaceAction extends BaseAction
{

    public function rules()
    {
        return [];
    }

    public function handle(array $attributes = [], Location $location = null, Place $place = null)
    {
        $location->places()->detach($place->id);
        return [];
    }

    public function asController(Location $location = null, Place $place = null): array
    {
        return parent::asController($location, $place);
    }
}
