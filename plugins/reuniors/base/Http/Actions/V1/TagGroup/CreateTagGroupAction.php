<?php namespace Reuniors\Base\Http\Actions\V1\TagGroup;

use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Base\Models\TagGroup;

class CreateTagGroupAction extends BaseAction {
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'nullable|string|max:50',
            'parent_id' => 'nullable|integer|exists:reuniors_base_tag_groups,id',
            'sort_order' => 'nullable|integer|min:0',
            'slug' => 'nullable|string|max:255|unique:reuniors_base_tag_groups,slug',
            'active' => 'nullable|boolean',
            'show_in_filters' => 'nullable|boolean',
        ];
    }

    public function handle(array $data)
    {
        $tagGroup = TagGroup::create($data);

        return [
            'success' => true,
            'data' => $tagGroup->load(['parent', 'children']),
            'message' => 'Tag group created successfully'
        ];
    }

    public function asController(Request $request)
    {
        return $this->handle($request->all());
    }
}
