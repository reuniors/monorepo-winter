<?php namespace Reuniors\Evodic\Http\Actions\V1\Place\Tags;

use Illuminate\Http\Request;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Evodic\Models\Place;
use Reuniors\Evodic\Models\PlaceType;

class GetPlaceTags
{
    use AsAction;

    public function rules()
    {
        return [
            'perPage' => ['integer'],
        ];
    }

    public function handle(array $attributes, Place $place)
    {
        $perPage = $attributes['perPage'] ?? 20;

        return $place->tags()->paginate($perPage);
    }

    public function asController(Request $request, Place $place)
    {
        $request->all();

        return [
            'data' => $this->handle($request->all(), $place),
            'success' => true
        ];
    }
}
