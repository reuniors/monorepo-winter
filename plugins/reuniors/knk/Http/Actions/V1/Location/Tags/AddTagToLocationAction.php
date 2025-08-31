<?php namespace Reuniors\Knk\Http\Actions\V1\Location\Tags;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Location;
use Reuniors\Knk\Models\Tag;
use Illuminate\Http\Request;

class AddTagToLocationAction extends BaseAction
{
    public function rules()
    {
        return [];
    }

    public function handle(array $attributes = [], Location $location = null, Tag $tag = null)
    {
        $location->tags()->attach($tag);

        return $tag;
    }

    public function asController(Location $location = null, Tag $tag = null): array
    {
        return parent::asController($location, $tag);
    }
}
