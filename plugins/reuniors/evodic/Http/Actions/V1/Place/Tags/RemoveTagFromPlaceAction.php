<?php namespace Reuniors\Evodic\Http\Actions\V1\Place\Tags;

use Illuminate\Http\Request;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Evodic\Models\Place;
use Reuniors\Base\Models\Tag;

class RemoveTagFromPlaceAction
{
    use AsAction;

    public function rules()
    {
        return [];
    }

    public function handle(array $attributes, Place $place, Tag $tag)
    {
        $place->tags()->detach($tag);

        return null;
    }

    public function asController(Request $request, Place $place, Tag $tag)
    {
        $requestData = $request->all();
        $this->handle($requestData, $place, $tag);

        return [
            'success' => true
        ];
    }
}
