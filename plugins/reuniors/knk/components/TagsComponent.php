<?php namespace Reuniors\Knk\Components;

use Cms\Classes\ComponentBase;
use Reuniors\Knk\Models\Tag;

class TagsComponent extends BaseKnkComponent
{
    public $tags;

    public function componentDetails()
    {
        return [
            'name'        => 'Tags Component',
            'description' => 'No description provided yet...'
        ];
    }

    public function defineProperties()
    {
        return [
            'tagGroupSlug' => [
                'title'       => 'TagGroup (slug)',
                'description' => 'TagGroup (slug)',
                'default'     => null,
                'type'        => 'string',
            ],
            'tagSlug' => [
                'title'       => 'Tag (slug)',
                'description' => 'Tag (slug)',
                'default'     => '{{ :tagSlug }}',
                'type'        => 'string',
            ]
        ];
    }

    public function onRunOriginal()
    {
        $this->tags = $this->page['tags'] = $this->listTags();
    }

    public function listTags()
    {
        return Tag::listFrontEnd([
            'tagGroupSlug' => $this->property('tagGroupSlug'),
            'tagSlug' => $this->property('tagSlug'),
        ])->get()->toArray();
    }
}
