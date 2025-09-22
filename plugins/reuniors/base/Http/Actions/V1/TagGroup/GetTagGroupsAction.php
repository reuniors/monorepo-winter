<?php namespace Reuniors\Base\Http\Actions\V1\TagGroup;

use Illuminate\Http\Request;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Base\Models\TagGroup;

class GetTagGroupsAction
{
    use AsAction;

    public function rules()
    {
        return [
            'search' => 'nullable|string|max:255',
            'per_page' => 'nullable|integer|min:1|max:100',
            'type' => 'nullable|string|max:50',
            'parent_id' => 'nullable|integer|exists:reuniors_base_tag_groups,id',
            'active' => 'nullable|boolean',
            'show_in_filters' => 'nullable|boolean',
        ];
    }

    public function handle(array $attributes = [])
    {
        $search = $attributes['search'] ?? null;
        $perPage = $attributes['per_page'] ?? 15;
        $type = $attributes['type'] ?? null;
        $parentId = $attributes['parent_id'] ?? null;
        $active = $attributes['active'] ?? null;
        $showInFilters = $attributes['show_in_filters'] ?? null;

        $tagGroups = TagGroup::with(['parent', 'children', 'tags']);

        if ($search) {
            $tagGroups->where('name', 'like', "%{$search}%");
        }

        if ($type) {
            $tagGroups->where('type', $type);
        }

        if ($parentId !== null) {
            $tagGroups->where('parent_id', $parentId);
        }

        if ($active !== null) {
            $tagGroups->where('active', $active);
        }

        if ($showInFilters !== null) {
            $tagGroups->where('show_in_filters', $showInFilters);
        }

        return [
            'success' => true,
            'data' => $tagGroups->orderBy('sort_order')->paginate($perPage)
        ];
    }

    public function asController(Request $request)
    {
        return $this->handle($request->all());
    }
}
