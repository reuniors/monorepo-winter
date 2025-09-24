<?php namespace Reuniors\Evodic\Http\Actions\V1\Place\PlaceType\TagGroups;

use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Evodic\Models\PlaceType;

class GetPlaceTypeTagGroups extends BaseAction {
    public function rules()
    {
        return [
            'perPage' => ['integer'],
        ];
    }

    public function handle(array $attributes, PlaceType $placeType)
    {
        $perPage = $attributes['perPage'] ?? 20;

        return $placeType->tagGroups()->paginate($perPage);
    }

    public function asController(Request $request, PlaceType $placeType)
    {
        $request->all();

        return [
            'data' => $this->handle($request->all(), $placeType),
            'success' => true
        ];
    }
}
