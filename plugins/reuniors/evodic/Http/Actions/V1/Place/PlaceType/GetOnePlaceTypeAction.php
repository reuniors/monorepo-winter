<?php namespace Reuniors\Evodic\Http\Actions\V1\Place\PlaceType;

use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Evodic\Models\PlaceType;

class GetOnePlaceTypeAction extends BaseAction
{

    public function rules()
    {
        return [];
    }

    public function handle(PlaceType $placeType)
    {
        return [
            'success' => true,
            'data' => $placeType
        ];
    }

    public function asController(Request $request, PlaceType $placeType)
    {
        return $this->handle($placeType);
    }
}
