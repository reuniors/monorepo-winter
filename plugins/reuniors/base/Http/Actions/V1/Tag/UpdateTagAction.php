<?php namespace Reuniors\Base\Http\Actions\V1\Tag;

use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Base\Models\Tag;

class UpdateTagAction extends BaseAction {
    public function rules()
    {
        return [
            'id' => 'required|integer|exists:reuniors_base_tags,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'color' => 'nullable|string|size:7',
            'tag_group_id' => 'nullable|integer|exists:reuniors_base_tag_groups,id',
            'sort_order' => 'nullable|integer|min:0',
            'slug' => 'nullable|string|max:255|unique:reuniors_base_tags,slug,' . request('id'),
            'active' => 'nullable|boolean',
            'show_in_filters' => 'nullable|boolean',
        ];
    }

    public function handle(array $data)
    {
        $tag = Tag::findOrFail($data['id']);
        $tag->update($data);

        return [
            'success' => true,
            'data' => $tag->load('tag_group'),
            'message' => 'Tag updated successfully'
        ];
    }

    public function asController(Request $request)
    {
        return $this->handle($request->all());
    }
}
