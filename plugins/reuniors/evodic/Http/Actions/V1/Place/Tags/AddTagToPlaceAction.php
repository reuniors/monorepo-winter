<?php namespace Reuniors\Evodic\Http\Actions\V1\Place\Tags;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Evodic\Models\Place;
use Reuniors\Base\Models\Tag;
use Illuminate\Http\Request;

class AddTagToPlaceAction extends BaseAction {
    public function rules()
    {
        return [];
    }

    public function handle(array $attributes, Place $place, Tag $tag)
    {
        $place->tags()->attach($tag);

        return $tag;
    }

    public function asController(Request $request, Place $place, Tag $tag)
    {
        $requestData = $request->all();

        return [
            'data' => $this->handle($requestData, $place, $tag),
            'success' => true
        ];
    }
}
