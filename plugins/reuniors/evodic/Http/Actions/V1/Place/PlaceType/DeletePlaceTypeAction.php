<?php namespace Reuniors\Evodic\Http\Actions\V1\Place\PlaceType;

use Illuminate\Http\Request;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Evodic\Models\PlaceType;

class DeletePlaceTypeAction
{
    use asAction;

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
