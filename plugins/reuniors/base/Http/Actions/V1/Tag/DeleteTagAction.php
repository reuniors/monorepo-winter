<?php namespace Reuniors\Base\Http\Actions\V1\Tag;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Base\Models\Tag;

class DeleteTagAction extends BaseAction {
    public function rules()
    {
        return [
            'id' => 'required|integer|exists:reuniors_base_tags,id',
        ];
    }

    public function handle(array $attributes = [])
    {
        $tag = Tag::findOrFail($attributes['id']);
        $tag->delete();

        return true;
    }
}
