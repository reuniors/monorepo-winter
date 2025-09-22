<?php namespace Reuniors\Knk\Http\ActionsFe\V1\Tag;

use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Base\Models\Tag;
use Reuniors\Base\Models\TagGroup;

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
