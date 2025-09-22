<?php namespace Reuniors\Knk\Http\Actions\V1\Tag\Group;

use Reuniors\Knk\Classes\S;
use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Base\Models\TagGroup;

class UpdateTagGroupAction extends BaseAction
{
    public function rules()
    {
        return [
            'data' => ['required', 'array'],
            'data.title' => ['required', 'string'],
        ];
    }

    public function handle(array $attributes = [], TagGroup $tagGroup = null)
    {
        $data = $attributes['data'];

        $data['name'] = S::camel($data['title']);

        $tagGroup->update($data);

        return $tagGroup;
    }

    public function asController(TagGroup $tagGroup = null): array
    {
        return parent::asController($tagGroup);
    }
}
