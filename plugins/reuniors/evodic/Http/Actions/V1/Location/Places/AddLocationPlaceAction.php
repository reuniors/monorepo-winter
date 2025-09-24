<?php namespace reuniors\evodic\Http\Actions\V1\Location\Places;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Evodic\Models\Location;
use Reuniors\Evodic\Models\Place;

class AddLocationPlaceAction extends BaseAction
{

    public function rules()
    {
        return [];
    }

    public function handle(Location $location, Place $place)
    {
        $location->places()->attach($place->id);
        return [
            'success' => true,
            'data' => []
        ];
    }

    public function asController(Location $location, Place $place)
    {
        return $this->handle($location, $place);
    }
}
