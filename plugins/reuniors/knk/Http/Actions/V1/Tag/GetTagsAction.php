<?php namespace Reuniors\Knk\Http\Actions\V1\Tag;

use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Base\Models\Tag;
use Winter\Storm\Support\Facades\DB;

class GetTagsAction extends BaseAction
{
    public function rules()
    {
        return [
            'skip' => 'boolean',
            'search' => 'string',
            'perPage' => 'integer',
            'tagGroupId' => 'integer',
            'tagGroupIds' => 'array',
            'locationId' => 'integer',
            'columns' => 'string',
            'orderBy' => 'string',
            'orderDirection' => 'string',
        ];
    }

    public function handle(array $attributes = [])
    {
        $skip = $attributes['skip'] ?? false;
        $search = $attributes['search'] ?? null;
        $perPage = $attributes['perPage'] ?? 15;
        $tagGroupId = $attributes['tagGroupId'] ?? null;
        $tagGroupIds = $attributes['tagGroupIds'] ?? null;
        $locationId = $attributes['locationId'] ?? null;
        $columns = $attributes['columns'] ?? null;
        $orderBy = $attributes['orderBy'] ?? 'numOfWords';
        $orderDirection = $attributes['orderDirection'] ?? 'asc';

        $tags = Tag::query();

        if ($columns) {
            $columns = explode(',', $columns);
            $tags->select($columns);
        }
        if ($search) {
            $tags->where('title', 'like', "%$search%" );
            $tags->orderBy(DB::raw('title LIKE "'.$search.'%"'), 'desc');
        }
        if ($tagGroupId) {
            $tags->where('tag_group_id', $tagGroupId);
        }
        if ($tagGroupIds) {
            $tags->whereIn('tag_group_id', $tagGroupIds);
        }
        if ($locationId) {
            if ($skip) {
                $tags->whereDoesntHave('locations', function ($query) use ($locationId) {
                    $query->where('location_id', $locationId);
                });
            } else {
                $tags->whereHas('locations', function ($query) use ($locationId) {
                    $query->where('location_id', $locationId);
                });
            }
        }
        if ($orderBy) {
            if ($orderBy == 'numOfWords') {
                $tags->orderBy(DB::raw('LENGTH(title) - LENGTH(REPLACE(title, " ", "")) + 1'), $orderDirection);
            } else {
                $tags->orderBy($orderBy, $orderDirection);
            }
        }

        return $tags->paginate($perPage);
    }
}
