<?php namespace Reuniors\Knk\Http\ActionsFe\V1\Tag;

use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Tag;
use Reuniors\Knk\Models\TagGroup;

class FeGetBadgesAction extends BaseAction
{
    public function handle(array $attributes = [])
    {
        return TagGroup::query()
            ->isBadge()
            ->with('tags')
            ->get();
    }
}
