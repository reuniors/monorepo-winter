<?php namespace Reuniors\Knk\Http\Actions\V1\Tag\Group;

use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Base\Models\TagGroup;

class GetTagGroupsAction extends BaseAction
{
    public function rules()
    {
        return [
            'search' => 'string',
            'perPage' => 'integer',
            'skipId' => 'integer',
        ];
    }

    public function handle(array $attributes = [])
    {
        $search = $attributes['search'] ?? null;
        $perPage = $attributes['perPage'] ?? 15;
        $skipId = $attributes['skipId'] ?? null;

        $tagGroupsQuery = TagGroup::query();

        if ($search) {
            $tagGroupsQuery->where('title', 'like', "%$search%" );
        }
        if ($skipId) {
            $tagGroupsQuery->where('id', '!=', $skipId);
            $tagGroupsQuery->where('parent_id', '!=', $skipId);
        }

        return $tagGroupsQuery->paginate($perPage);
    }
}
