<?php namespace Reuniors\Evodic\Http\Actions\V1\Place\PlaceType;

use Illuminate\Http\Request;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Evodic\Models\PlaceType;

class GetOnePlaceTypeAction
{
    use asAction;

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
