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

    public function handle(array $attributes = [], PlaceType $placeType = null)
    {
        return $placeType;
    }

    public function asController(PlaceType $placeType = null): array
    {
        return parent::asController($placeType);
    }
}
