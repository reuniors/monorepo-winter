<?php namespace Reuniors\Evodic\Http\Actions\V1\Place\Tags;

use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Evodic\Models\Place;
use Reuniors\Evodic\Models\PlaceType;

class GetPlaceTags extends BaseAction {
    public function rules()
    {
        return [
            'perPage' => ['integer'],
        ];
    }

    public function handle(array $attributes = [], Place $place = null)
    {
        $perPage = $attributes['perPage'] ?? 20;

        return $place->tags()->paginate($perPage);
    }

    public function asController(Place $place = null): array
    {
        return parent::asController($place);
    }
}
