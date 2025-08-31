<?php namespace Reuniors\Knk\Classes;

use Cms\Classes\Controller;
use Reuniors\Knk\Http\ActionsFe\V1\Category\LocationCategoryGetOneAction;
use Reuniors\Knk\Http\ActionsFe\V1\City\FeGetCityData;
use Reuniors\Knk\Http\ActionsFe\V1\Location\FeGetCategoryLocations;
use Reuniors\Knk\Http\ActionsFe\V1\Location\FeGetCitiesCategoriesLocations;
use Reuniors\Knk\Http\ActionsFe\V1\Location\FeGetCityCategoriesLocations;
use Reuniors\Knk\Models\Location;

class PageFeInit
{
    const HOME = 'home';
    const CITY = 'city';
    const CATEGORY = 'category';
    const LOCATION = 'location';
    const LOCATION_TAB = 'location_tab';

    public $url = '';

    public $city = null;

    public $municipality = null;

    public $category = null;

    public $locationsData = null;

    public ?Location $location = null;

    public ?string $tab = null;

    public string $type;

    /**
     * @var Controller
     */
    protected $controller;

    /**
     * @param Controller $controller
     * @return string|void
     * @throws Redirect404Exception
     */
    public function init(Controller $controller)
    {
        $page = $controller->getPage();
        $citySlug = $controller->param('citySlug');
        $municipalitySlug = $controller->param('municipalitySlug');
        $categorySlug = $controller->param('categorySlug');
        $slug = $controller->param('slug');
        $tab = $controller->param('tab');

        if (!$citySlug) {
            $this->type = self::HOME;
            return null;
        }
        $city = FeGetCityData::run([
            'citySlug' => $citySlug
        ]);
        if (!$city) {
            return $controller->run('404');
        }
        $this->city = $city;

        if (!$municipalitySlug) {
            $this->type = self::CITY;
            return null;
        }
        $municipality = FeGetCityData::run([
            'citySlug' => $municipalitySlug,
            'parentId' => $city['id']
        ]);
        if (!$municipality) {
            $tab = $slug;
            $slug = $categorySlug;
            $categorySlug = $municipalitySlug;
        } else {
            $this->type = self::CITY;
            $this->municipality = $municipality;
        }

        if (!$categorySlug) {
            $this->type = self::CITY;
            return null;
        }
        $category = LocationCategoryGetOneAction::run([
            'categorySlug' => $categorySlug
        ]);
        if (!$category) {
            return $controller->run('404');
        }
        $this->category = $category;

        if (!$slug) {
            $this->type = self::CATEGORY;
            return null;
        }
        $location = Location::where('slug', $slug)
            ->where('city_id', $city['id'])
            ->first();
        if (!$location) {
            return $controller->run('404');
        }
        $this->location = $location;

        if(!$tab) {
            $this->type = self::LOCATION;
            return null;
        }
        $this->type = self::LOCATION_TAB;
        $availableTabs = array_keys(Location::$tabs);
        if (!in_array($tab, $availableTabs)) {
            return $controller->run('404');
        }
        $this->tab = $tab;
    }

    public function initLocationsData()
    {
        switch ($this->type) {
            case self::HOME:
                $this->locationsData = FeGetCitiesCategoriesLocations::run([
                    'perPage' => 7
                ]);
                return $this->locationsData;
            case self::CITY:
                $this->locationsData = FeGetCityCategoriesLocations::run([
                    'citySlug' => $this->city['slug'],
                    'locationsPerPage' => 7
                ]);
                $this->url .= $this->city['slug'];
                return $this->locationsData;
            case self::CATEGORY:
                $this->locationsData = FeGetCategoryLocations::run([
                    'citySlug' => $this->city['slug'],
                    'categorySlug' => $this->category['slug'],
                    'perPage' => 12
                ])->items();
                $this->url .= $this->city['slug'] . '/' . $this->category['slug'];
                return $this->locationsData;
            case self::LOCATION:
                return $this->locationsData;
            case self::LOCATION_TAB:
                return $this->locationsData;
        }
    }
}
