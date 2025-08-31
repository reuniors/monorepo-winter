<?php namespace Reuniors\Knk\Http\ActionsFe\V1\Story;

use Reuniors\Knk\Http\Actions\BaseAction;

class FeGetStoriesAction extends BaseAction
{
    public function rules()
    {
        return [
            'page' => ['integer'],
            'perPage' => ['integer'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $page = $attributes['page'] ?? 0;
        $perPage = $attributes['perPage'] ?? 10;

    }
}
