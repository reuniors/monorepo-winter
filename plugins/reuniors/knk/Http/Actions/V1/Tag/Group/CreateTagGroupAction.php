<?php namespace Reuniors\Knk\Http\Actions\V1\Tag\Group;

use Reuniors\Knk\Classes\S;
use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Knk\Models\TagGroup;

class CreateTagGroupAction extends BaseAction
{
    public function rules()
    {
        return [
            'data' => ['required', 'array'],
            'data.title' => ['required', 'string'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $data = $attributes['data'];

        $data['name'] = S::camel($data['title']);
        $data['slug'] = S::slug($data['title']);

        $tagGroup = TagGroup::create($data);

        return $tagGroup;
    }
}
