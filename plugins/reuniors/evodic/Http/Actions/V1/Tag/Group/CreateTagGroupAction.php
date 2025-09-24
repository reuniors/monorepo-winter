<?php namespace Reuniors\Evodic\Http\Actions\V1\Tag\Group;

use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Evodic\Classes\Helpers\S;
use Reuniors\Base\Models\TagGroup;

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
