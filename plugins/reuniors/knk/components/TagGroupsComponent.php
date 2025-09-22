<?php namespace Reuniors\Knk\Components;

use Cms\Classes\ComponentBase;
use Reuniors\Knk\Classes\HelperCommon;
use Reuniors\Base\Models\TagGroup;

class TagGroupsComponent extends BaseKnkComponent
{
    public $tagGroups;

    public function componentDetails()
    {
        return [
            'name'        => 'TagGroups',
            'description' => 'No description provided yet...'
        ];
    }

    public function defineProperties()
    {
        return [
            'isParents' => [
                'title'       => 'Is parents',
                'description' => 'Is parents',
                'default'     => true,
                'type'        => 'checkbox',
            ],
            'withChildren' => [
                'title'       => 'With children',
                'description' => 'With children',
                'default'     => true,
                'type'        => 'checkbox',
            ],
            'withTags' => [
                'title'       => 'With tags',
                'description' => 'With tags',
                'default'     => true,
                'type'        => 'checkbox',
            ],
            'showOnSearch' => [
                'title'       => 'Show on search',
                'description' => 'Show on search',
                'default'     => false,
                'type'        => 'checkbox',
            ],
            'showInFilters' => [
                'title'       => 'Show in filters',
                'description' => 'Show in filters',
                'default'     => false,
                'type'        => 'checkbox',
            ],
            'tagsShowInFilters' => [
                'title'       => 'Tags - Show in filters',
                'description' => 'Tags - Show in filters',
                'default'     => false,
                'type'        => 'checkbox',
            ],
            //
            'sortBy' => HelperCommon::$standardComponentProperties['sortBy'],
            'sortByOrientation' => HelperCommon::$standardComponentProperties['sortByOrientation'],
            'perPage' => HelperCommon::$standardComponentProperties['perPage'],
            'pageNumber' => HelperCommon::$standardComponentProperties['pageNumber'],
        ];
    }

    public function onRunOriginal()
    {
        $this->tagGroups = $this->page['tagGroups'] = $this->listTagGroups();
    }

    public function listTagGroups()
    {
        return TagGroup::listFrontEnd([
            'isParent' => $this->property('isParent'),
            'withChildren' => $this->property('withChildren'),
            'withTags' => $this->property('withTags'),
            'showOnSearch' => $this->property('showOnSearch'),
            'showInFilters' => $this->property('showInFilters'),
            'tagsShowInFilters' => $this->property('tagsShowInFilters'),
            'sortBy' => $this->property('sortBy'),
            'sortByOrientation' => $this->property('sortByOrientation'),
            'perPage' => $this->property('perPage'),
            'pageNumber' => $this->property('pageNumber'),
        ]);
    }
}
