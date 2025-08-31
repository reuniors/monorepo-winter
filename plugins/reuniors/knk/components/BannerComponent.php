<?php namespace Reuniors\Knk\Components;

use Cms\Classes\ComponentBase;
use Reuniors\Knk\Classes\HelperCommon;
use Reuniors\Knk\Models\Banner;

class BannerComponent extends BaseKnkComponent
{
    public $banners;
    protected $propertyNameCategorySlug = 'categorySlug';

    public function componentDetails()
    {
        return [
            'name'        => 'Banners',
            'description' => 'Get banners by zone or category...'
        ];
    }

    public function defineProperties()
    {
        return [
            'bannerZone' => [
                'title'       => 'Banner Zone',
                'description' => 'Banner Zone',
                'default'     => null,
                'type'        => 'string',
            ],
            'citySlug' => [
                'title'       => 'City slug',
                'description' => 'City slug',
                'default'     => '{{ :citySlug }}',
                'type'        => 'string',
            ],
            'categorySlug' => [
                'title'       => 'Category',
                'description' => 'Category',
                'default'     => '{{ :categorySlug }}',
                'type'        => 'string',
            ],
            'locationSlug' => [
                'title'       => 'Location slug',
                'description' => 'Location slug',
                'default'     => '{{ :slug }}',
                'type'        => 'string',
            ],
            'withConnectedLocation' => [
                'title'       => 'With connected location',
                'description' => 'With connected location',
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
        $this->banners = $this->page['banners'] = $this->listBanners();
    }

    public function listBanners()
    {
        return Banner::listFrontEnd([
            'bannerZone'       => $this->property('bannerZone'),
            'citySlug'       => $this->property('citySlug'),
            'categorySlug'       => $this->property('categorySlug'),
            'locationSlug'       => $this->property('locationSlug'),
            'withConnectedLocation'       => $this->property('withConnectedLocation'),
            'sortBy' => $this->property('sortBy'),
            'sortByOrientation' => $this->property('sortByOrientation'),
            'perPage' => $this->property('perPage'),
            'pageNumber' => $this->property('pageNumber'),
            'active' => 1
        ]);
    }

    public function getSortByOptions()
    {
        return [
            'sort_order' => 'Sort Order',
            'name' => 'Name'
        ];
    }
}
