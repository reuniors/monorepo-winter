<?php namespace reuniors\evodic\Http\Actions\V1\Place;

use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Evodic\Models\Place;

class GetOnePlaceAction extends BaseAction
{

    public function rules()
    {
        return [];
    }

    public function handle(Place $place)
    {
        $place->load([
            'city', 'city.country',
            'placeCover', 'placeLogo', 'placeGallery',
            'working_hours', 'delivery_working_hours',
            'placeType'
        ]);

        return [
            'success' => true,
            'data' => $place
        ];
    }

    public function asController(Request $request, Place $place)
    {
        return $this->handle($place);
    }
}
