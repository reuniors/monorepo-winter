<?php namespace Reuniors\Evodic\Http\Actions\V1\Place\PlaceType;

use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Evodic\Models\PlaceType;

class DeletePlaceTypeAction extends BaseAction
{

    public function rules()
    {
        return [];
    }

    public function handle(PlaceType $placeType)
    {
        $placeType->delete();

        return [
            'success' => true,
        ];
    }

    public function asController(Request $request, PlaceType $placeType)
    {
        return $this->handle($placeType);
    }
}
