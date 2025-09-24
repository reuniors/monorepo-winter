<?php namespace Reuniors\Evodic\Http\Actions\V1\Place\PlaceType;

use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Evodic\Models\PlaceType;

class UpdatePlaceTypeAction extends BaseAction
{

    public function rules()
    {
        return [
            'data' => ['required', 'array'],
            'data.title' => ['required', 'string'],
        ];
    }

    public function handle(array $attributes = [], PlaceType $placeType)
    {
        $data = $attributes['data'];

        $placeType->update($data);

        return [
            'success' => true,
            'data' => $placeType
        ];
    }

    public function asController(Request $request, PlaceType $placeType)
    {
        $requestData = $request->all();
        return $this->handle($requestData, $placeType);
    }
}
