<?php namespace Reuniors\Base\Http\Actions\V1\Tag;

use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Base\Models\Tag;

class GetTagsAction extends BaseAction {
    public function rules()
    {
        return [
            'search' => 'nullable|string|max:255',
            'per_page' => 'nullable|integer|min:1|max:100',
            'tag_group_id' => 'nullable|integer|exists:reuniors_base_tag_groups,id',
            'tag_group_ids' => 'nullable|array',
            'tag_group_ids.*' => 'integer|exists:reuniors_base_tag_groups,id',
            'active' => 'nullable|boolean',
            'show_in_filters' => 'nullable|boolean',
        ];
    }

    public function handle(array $attributes = [])
    {
        $search = $attributes['search'] ?? null;
        $perPage = $attributes['per_page'] ?? 15;
        $tagGroupId = $attributes['tag_group_id'] ?? null;
        $tagGroupIds = $attributes['tag_group_ids'] ?? null;
        $active = $attributes['active'] ?? null;
        $showInFilters = $attributes['show_in_filters'] ?? null;

        $tags = Tag::with('tag_group');

        if ($search) {
            $tags->where('name', 'like', "%{$search}%");
        }

        if ($tagGroupId) {
            $tags->where('tag_group_id', $tagGroupId);
        }

        if ($tagGroupIds) {
            $tags->whereIn('tag_group_id', $tagGroupIds);
        }

        if ($active !== null) {
            $tags->where('active', $active);
        }

        if ($showInFilters !== null) {
            $tags->where('show_in_filters', $showInFilters);
        }

        return [
            'success' => true,
            'data' => $tags->orderBy('sort_order')->paginate($perPage)
        ];
    }

    public function asController(Request $request)
    {
        return $this->handle($request->all());
    }
}
