<?php namespace Reuniors\Knk\Components;

use Cms\Classes\ComponentBase;
use Reuniors\Knk\Classes\HelperCommon;
use Reuniors\Knk\Classes\Redirect404Exception;
use Reuniors\Knk\Facades\Globals;
use Reuniors\Knk\Models\Category;
use Reuniors\Base\Models\City;

class CategoriesComponent extends BaseKnkComponent
{
    public $categories;
    public $city;

    public function componentDetails()
    {
        return [
            'name'        => 'Categories',
            'description' => 'Get categories...'
        ];
    }

    public function defineProperties()
    {
        return [
            'categoriesSlug' => [
                'title'       => 'Categories list (comma separator)',
                'description' => 'Categories list (comma separator)',
                'default'     => null,
                'type'        => 'string',
            ],
            'get_locations' => [
                'title'       => 'Get Locations',
                'description' => 'Get Locations',
                'default'     => false,
                'type'        => 'checkbox',
            ],
            'get_banner_zone' => [
                'title'       => 'Get Banner zone',
                'description' => 'Get Banner zone',
                'default'     => false,
                'type'        => 'checkbox',
            ],
            'citySlug' => [
                'title'       => 'City (slug)',
                'description' => 'City (slug)',
                'default'     => '{{ :citySlug }}',
                'type'        => 'string',
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
        try {
            $this->categories = $this->page['categories'] = $this->listCategories();
            $this->city = $this->page['city'] = $this->getCity();
        } catch (Redirect404Exception $e) {
            $this->setStatusCode(404);
            return $this->controller->run('404');
        }
    }

    public function listCategories()
    {
        return Category::listFrontEnd([
            'getBannerZone' => $this->property('get_banner_zone'),
            'categoriesSlug' => $this->property('categoriesSlug'),
            'getLocations' => $this->property('get_locations'),
            'perPage' => $this->property('perPage'),
            'pageNumber' => $this->property('pageNumber'),
            'sortBy' => $this->property('sortBy'),
            'sortByOrientation' => $this->property('sortByOrientation'),
            'active' => 1
        ]);
    }

    /**
     * @return mixed
     * @throws Redirect404Exception
     */
    public function getCity()
    {
        $citySlug = $this->property('citySlug');
        if (!$citySlug || $citySlug == 'default') {
            return null;
        }
        $city = Globals::currentCity();
        if (empty($city)) {
            throw new Redirect404Exception();
        }
        return $city->toArray();
    }

    public function getSortByOptions()
    {
        return [
            'priority' => 'Priority',
            'title' => 'Title'
        ];
    }
}
