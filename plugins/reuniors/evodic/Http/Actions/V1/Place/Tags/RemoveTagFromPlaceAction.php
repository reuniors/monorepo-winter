<?php namespace Reuniors\Evodic\Http\Actions\V1\Place\Tags;

use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Evodic\Models\Place;
use Reuniors\Base\Models\Tag;

class RemoveTagFromPlaceAction extends BaseAction {
    public function rules()
    {
        return [];
    }

    public function handle(array $attributes = [], Place $place = null, Tag $tag = null)
    {
        $place->tags()->detach($tag);

        return null;
    }

    public function asController(Place $place = null, Tag $tag = null): array
    {
        return parent::asController($place, $tag);

    }
}
