<?php namespace Reuniors\Knk\Http\Actions\V1\Tag;

use Reuniors\Knk\Classes\S;
use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Tag;

class UpdateTagAction extends BaseAction
{
    public function rules()
    {
        return [
            'data' => ['required', 'array'],
            'data.title' => ['required', 'string'],
        ];
    }

    public function handle(array $attributes = [], Tag $tag = null)
    {
        $data = $attributes['data'];

        $data['name'] = S::camel($data['title']);

        $tag->update($data);

        return $tag;
    }

    public function asController(Tag $tag = null): array
    {
        return parent::asController($tag);
    }
}
