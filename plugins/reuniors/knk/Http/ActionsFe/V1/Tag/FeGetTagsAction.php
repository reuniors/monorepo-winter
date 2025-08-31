<?php namespace Reuniors\Knk\Http\ActionsFe\V1\Tag;

use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Tag;
use Winter\Storm\Support\Facades\DB;

class FeGetTagsAction extends BaseAction
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
            'citySlug' => 'string',
            'categorySlug' => 'string',
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
        $citySlug = $attributes['citySlug'] ?? null;
        $categorySlug = $attributes['categorySlug'] ?? null;

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
        if ($citySlug) {
            $tags->whereHas('locations', function ($query) use ($citySlug) {
                $query->whereHas('city', function ($query) use ($citySlug) {
                    $query->where('slug', $citySlug);
                });
            });
        }
        if ($categorySlug) {
            $tags->whereHas('locations', function ($query) use ($categorySlug) {
                $query->whereHas('categories', function ($query) use ($categorySlug) {
                    $query->where('slug', $categorySlug);
                });
            });
        }

        return $tags->paginate($perPage);
    }
}
