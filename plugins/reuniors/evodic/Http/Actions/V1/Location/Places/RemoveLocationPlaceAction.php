<?php namespace reuniors\evodic\Http\Actions\V1\Location\Places;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Evodic\Models\Location;
use Reuniors\Evodic\Models\Place;

class RemoveLocationPlaceAction
{
    use asAction;

    public function rules()
    {
        return [];
    }

    public function handle(Location $location, Place $place)
    {
        $location->places()->detach($place->id);
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
