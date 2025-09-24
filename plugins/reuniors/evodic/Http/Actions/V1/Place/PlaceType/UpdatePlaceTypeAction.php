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

    public function handle(array $attributes = [], PlaceType $placeType = null)
    {
        $data = $attributes['data'];

        $placeType->update($data);

        return $placeType;
    }

    public function asController(PlaceType $placeType = null): array
    {
        return parent::asController($placeType);
    }
}
