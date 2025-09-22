<?php namespace Reuniors\Evodic\Http\Actions\V1\Tag\Group;

use Illuminate\Http\Request;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Base\Models\TagGroup;

class GetTagGroupsAction
{
    use asAction;

    public function rules()
    {
        return [
            'search' => 'string',
            'perPage' => 'integer',
            'skipId' => 'integer',
            'skip' => ['boolean'],
            'placeTypeId' => ['integer'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $search = $attributes['search'] ?? null;
        $perPage = $attributes['perPage'] ?? 15;
        $skipId = $attributes['skipId'] ?? null;
        $skip = $attributes['skip'] ?? false;
        $pageTypeId = $attributes['placeTypeId'] ?? null;

        $tagGroupsQuery = TagGroup::query();

        if ($search) {
            $tagGroupsQuery->where('title', 'like', "%$search%" );
        }
        if ($skipId) {
            $tagGroupsQuery->where('id', '!=', $skipId);
            $tagGroupsQuery->where('parent_id', '!=', $skipId);
        }
        if ($pageTypeId) {
            if ($skip) {
                $tagGroupsQuery->whereDoesntHave('placeTypes', function ($query) use ($pageTypeId) {
                    $query->where('id', $pageTypeId);
                });
            } else {
                $tagGroupsQuery->whereHas('placeTypes', function ($query) use ($pageTypeId) {
                    $query->where('id', $pageTypeId);
                });
            }
        }

        return $tagGroupsQuery->paginate($perPage);
    }

    public function asController(Request $request)
    {
        $requestData = $request->all();

        return [
            'success' => true,
            'data' => $this->handle($requestData)
        ];
    }
}
