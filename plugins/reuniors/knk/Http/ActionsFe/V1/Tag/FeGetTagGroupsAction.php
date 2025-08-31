<?php namespace Reuniors\Knk\Http\ActionsFe\V1\Tag;

use Illuminate\Support\Facades\Cache;
use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Knk\Models\TagGroup;

class FeGetTagGroupsAction extends BaseAction
{
    public function handle(array $attributes = [])
    {
        return Cache::rememberForever('tagGroups', function () {
            return TagGroup::query()
                ->where('active', 1)
                ->get();
        });
    }
}
