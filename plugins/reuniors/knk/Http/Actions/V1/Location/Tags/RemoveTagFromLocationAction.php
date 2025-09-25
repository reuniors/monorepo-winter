<?php namespace Reuniors\Knk\Http\Actions\V1\Location\Tags;

use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Location;
use Reuniors\Base\Models\Tag;

class RemoveTagFromLocationAction extends BaseAction
{
    public function rules()
    {
        return [];
    }

    public function handle(array $attributes = [], Location $location = null, Tag $tag = null)
    {
        $location->tags()->detach($tag);

        return null;
    }

    public function asController(Location $location = null, Tag $tag = null): array
    {
        return parent::asController($location, $tag);
    }
}
