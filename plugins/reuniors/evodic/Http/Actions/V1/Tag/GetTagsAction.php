<?php namespace Reuniors\Evodic\Http\Actions\V1\Tag;

use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Evodic\Http\Actions\V1\Tag\Group\GetTagGroupsAction;
use Reuniors\Evodic\Models\Location;
use Reuniors\Evodic\Models\PlaceType;
use Reuniors\Base\Models\Tag;

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
            'placeTypeId' => 'integer',
            'placeId' => 'integer',
        ];
    }

    public function handle(array $attributes = [])
    {
        $skip = $attributes['skip'] ?? false;
        $search = $attributes['search'] ?? null;
        $perPage = $attributes['perPage'] ?? 15;
        $tagGroupId = $attributes['tagGroupId'] ?? null;
        $tagGroupIds = $attributes['tagGroupIds'] ?? null;
        $placeTypeId = $attributes['placeTypeId'] ?? null;
        $placeId = $attributes['placeId'] ?? null;

        if ($placeTypeId) {
            $tagGroupIds = GetTagGroupsAction::run(['placeTypeId' => $placeTypeId])
                ->pluck('id')
                ->toArray();
        }

        $tags = Tag::query();

        if ($search) {
            $tags->where('title', 'like', "%$search%" );
        }
        if ($tagGroupId) {
            $tags->where('tag_group_id', $tagGroupId);
        }
        if ($tagGroupIds) {
            $tags->whereIn('tag_group_id', $tagGroupIds);
        }
        if ($placeId) {
            if ($skip) {
                $tags->whereDoesntHave('places', function ($query) use ($placeId) {
                    $query->where('place_id', $placeId);
                });
            } else {
                $tags->whereHas('places', function ($query) use ($placeId) {
                    $query->where('place_id', $placeId);
                });
            }
        }

        return $tags->paginate($perPage);
    }
}
