<?php namespace Reuniors\Knk\Components;

use Cms\Classes\ComponentBase;
use Reuniors\Knk\Classes\HelperCommon;
use Reuniors\Knk\Models\Banner;
use Reuniors\Knk\Models\Category;
use Reuniors\Knk\Models\Location;

class LocationsComponent extends BaseKnkComponent
{
    public $locations;
    public $locationCategorySlug;
    public $locationSelectedTags;
    public $currentListPage = 1;
    protected $checkCanonical = true;

    public function componentDetails()
    {
        return [
            'name'        => 'Locations',
            'description' => 'List of location'
        ];
    }

    public function defineProperties()
    {
        return [
            'citySlug' => [
                'title'       => 'City (slug)',
                'description' => 'City (slug)',
                'default'     => '{{ :citySlug }}',
                'type'        => 'string',
            ],
            'parentCitySlug' => [
                'title'       => 'Parent city (slug)',
                'description' => 'Parent city (slug)',
                'default'     => '{{ :parentCitySlug }}',
                'type'        => 'string',
            ],
            'categoriesSlug' => [
                'title'       => 'Categories list (comma separator)',
                'description' => 'Categories list (comma separator)',
                'default'     => '{{ :categorySlug }}',
                'type'        => 'string',
            ],
            'showOnHome' => [
                'title'       => 'Show on home page',
                'description' => 'Show on home page',
                'default'     => false,
                'type'        => 'checkbox',
            ],
            'withTags' => [
                'title'       => 'With Tags',
                'description' => 'With Tags',
                'default'     => false,
                'type'        => 'checkbox',
            ],
            'withBanners' => [
                'title'       => 'With Banners',
                'description' => 'With Banners',
                'default'     => false,
                'type'        => 'checkbox',
            ],
            'isCanonical' => [
                'title'       => 'Is Canonical',
                'description' => 'Is Canonical',
                'default'     => '{{ :isCanonical }}',
                'type'        => 'checkbox',
            ],
            'withRelatedLocations' => [
                'title'       => 'With Related Locations',
                'description' => 'With Related Locations',
                'default'     => false,
                'type'        => 'checkbox',
            ],
            'tagGroupName' => [
                'title'       => 'Tags group name',
                'description' => 'Tags group name',
                'default'     => null,
                'type'        => 'string',
            ],

            //
            'sortBy' => HelperCommon::$standardComponentProperties['sortBy'],
            'sortByOrientation' => HelperCommon::$standardComponentProperties['sortByOrientation'],
            'perPage' => HelperCommon::$standardComponentProperties['perPage'],
            'pageNumber' => HelperCommon::$standardComponentProperties['pageNumber'],
        ];
    }

    public function onPageLocations()
    {
        $postData = post();
        if (isset($postData['page'])) {
            $this->setProperty('pageNumber', post('page'));
        }
        $this->pageCycle();
    }

    public function onRunOriginal()
    {
        $tags = input('tags');
        $tags = !$tags || is_array($tags) ? $tags : [$tags];
        $this->locationSelectedTags = $this->page['locationSelectedTags'] = $tags;
        $this->locations = $this->page['locations'] = $this->listLocations();
        if ($this->property('withBanners')) {
            Banner::injectBanners($this->locations, 'Lista restorana');
        }
        $categorySlug = $this->property('categoriesSlug') ?? 'gde-jesti';
        $this->locationCategorySlug = $this->page['locationCategorySlug'] = $categorySlug;
    }

    public function listLocations()
    {
        $currentListPage = get('pages');
        $locations = Location::listFrontEnd([
            'citySlug' => input('municipality') ?? $this->property('citySlug'),
            'categorySlug' => input('category') ?? $this->property('categoriesSlug'),
            'tags' => $this->locationSelectedTags,
            'withTags' => $this->property('withTags'),
            'withRelatedLocations' => $this->property('withRelatedLocations'),
            'tagGroupName' => $this->property('tagGroupName'),
            'locationQuery' => input('filterByName'),
            'sort' => input('sort'),
            'sortBy' => $this->property('sortBy'),
            'sortByOrientation' => input('orientation') ?? $this->property('sortByOrientation'),
            'perPage' => $this->property('perPage'),
            'pageNumber' => $this->property('pageNumber'),
            'active' => 1,
            'withoutClosed' => $this->property('withoutClosed', true),
            'pages' => $currentListPage,
            'withWorkingTime' => $this->property('withWorkingTime', true),
        ]);
        if ($currentListPage) {
            $this->currentListPage = $this->page['currentListPage'] = $locations->lastPage() < $currentListPage
                ? $locations->lastPage()
                : $currentListPage;
        }
        return $locations;
    }

    public function onShowMap()
    {
        $locations = Location::mapData([
                'citySlug' => input('municipality') ?? $this->property('citySlug'),
                'categorySlug' => input('category') ?? $this->property('categoriesSlug'),
                'tags' => input('tags'),
                'withTags' => $this->property('withTags'),
                'withRelatedLocations' => $this->property('withRelatedLocations'),
                'tagGroupName' => $this->property('tagGroupName'),
                'locationQuery' => input('filterByName'),
                'sort' => input('sort'),
                'sortBy' => $this->property('sortBy'),
                'sortByOrientation' => input('orientation') ?? $this->property('sortByOrientation'),
                'perPage' => $this->property('perPage'),
                'pageNumber' => $this->property('pageNumber'),
                'active' => 1
            ])
            ->take(1000)
            ->get([
                'id', 'slug', 'title',
                'address_lat', 'address_long', 'address_data',
                'rating_average_grade', 'city_id', 'main_category_id'
            ]);
        return \Response::json($locations->toArray());
    }

    public function getSortByOptions()
    {
        return [
            'priority' => 'Priority',
            'title' => 'Title'
        ];
    }
}
