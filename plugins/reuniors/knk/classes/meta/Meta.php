<?php

namespace Reuniors\Knk\Classes\Meta;

use Cms\Classes\Controller;
use Cms\Classes\Page;
use RainLab\Translate\Models\Message;
use Reuniors\Knk\Classes\CacheData;
use Reuniors\Knk\Classes\Helpers\ArrayH;
use Reuniors\Knk\Models\Location;
use Reuniors\Base\Models\City;

class Meta
{
    /** @var MetaData */
    public $metaData;
    /** @var Controller */
    protected $controller;
    /** @var Page */
    protected $page;
    protected $cachedData = [];
    static $metaDataInitialed = false;

    protected const CACHING_HOURS = 24;

    protected $ignoredUrls = [
        '/sitemap.xml',
        '/404'
    ];

    public function addTitle($title)
    {
        $this->metaData->addToTitle($title);
    }

    public function getTitle()
    {
        return $this->metaData->title;
    }

    public function setMetaDescription($desc)
    {
        $this->metaData->setMetaDescription($desc);
    }

    public function getMetaDescription()
    {
        return $this->metaData->metaDescription;
    }

    public function setOgImage($path)
    {
        $this->metaData->setOgImage($path);
    }

    public function getCachedData($name)
    {
        if (isset($this->cachedData[$name])) {
            return $this->cachedData[$name];
        }
        $this->cachedData[$name] = CacheData::get($name, self::CACHING_HOURS);
        return $this->cachedData[$name];
    }

    public function checkIsIgnored()
    {
        return in_array($_SERVER['REQUEST_URI'], $this->ignoredUrls);
    }

    public function __construct(Controller $controller, $defaultTitle = null)
    {
        if (
            !self::$metaDataInitialed &&
            !isset($_SERVER['HTTP_X_WINTER_REQUEST_HANDLER']) &&
            !$this->checkIsIgnored()
        ) {
            $this->controller = $controller;
            $this->page = $controller->getPage();
            $this->metaData = new MetaData($defaultTitle);
            $this->populateMetaData();
            self::$metaDataInitialed = true;
        }
    }

    public function getCityLocationDescription($citySlug)
    {
        $citiesData = $this->getCachedData('city-data');
        $cityLocationsData = $this->getCachedData('city-locations');
        if (!isset($citiesData[$citySlug])) {
            return '';
        }
        $cityData = $citiesData[$citySlug];
        $description = (
            !empty($cityData['description'])
                ? $cityData['description']
                : "{$cityData['title']} je poznat po:"
        ) . ' ';
        if (isset($cityLocationsData[$citySlug]) && !empty($cityLocationsData[$citySlug])) {
            $lastCategoryTitle = null;
            foreach ($cityLocationsData[$citySlug] as $cityLocationData) {
                if ($lastCategoryTitle !== $cityLocationData['category_title']) {
                    $lastCategoryTitle = $cityLocationData['category_title'];
                    $description .= "{$cityLocationData['category_title']} - {$cityLocationData['title']} | ";
                } else {
                    $description = substr_replace($description, '', -3);
                    $description .= " - {$cityLocationData['title']} | ";
                }
            }
            $description = substr_replace($description, '', -3);
        }
        return $description;
    }

    public function getCityLocationCategoryDescription($citySlug, $categorySlug)
    {
        $citiesData = $this->getCachedData('city-data');
        $cityLocationsData = $this->getCachedData('city-locations-byCategory');
        if (!isset($cityLocationsData[$citySlug]) ||
            !isset($cityLocationsData[$citySlug][$categorySlug]) ||
            !isset($citiesData[$citySlug])
        ) {
            return '';
        }
        $categoryData = $cityLocationsData[$citySlug][$categorySlug];
        $cityData = $citiesData[$citySlug];
        $description = $categoryData['description']
            ? Message::trans($categoryData['description'], [
                'in' => City::$prepositionOptions[
                    ArrayH::getDeepData('preposition', $cityData['metadata'], 'in')
                ],
                'city' => ArrayH::getDeepData('case.dativ', $cityData['metadata'], ''),
                'city2' => ArrayH::getDeepData('case.nominativ', $cityData['metadata'], ''),
            ])
            : '';
        if (isset($categoryData['locations']) && !empty($categoryData['locations'])) {
            $description .= ' ';
            foreach ($categoryData['locations'] as $location) {
                $description .= "{$location['title']} | ";
            }
            $description = substr_replace($description, '', -3);
        }
        return $description;
    }

    public function getCityTitle($citySlug)
    {
        $citiesData = $this->getCachedData('city-data');
        return isset($citiesData[$citySlug])
            ? $citiesData[$citySlug]['title']
            : '';
    }

    public function getCategoryTitle($citySlug, $categorySlug)
    {
        $cityLocationsData = $this->getCachedData('city-locations-byCategory');
        if (!isset($cityLocationsData[$citySlug]) || !isset($cityLocationsData[$citySlug][$categorySlug])) {
            return '';
        }
        $categoryData = $cityLocationsData[$citySlug][$categorySlug];
        return $categoryData['title'];
    }

    protected function populateMetaData()
    {
        $controller = $this->controller;
        $citySlug = $controller->param('citySlug');
        $municipalitySlug = $controller->param('municipalitySlug');
        $categorySlug = $controller->param('categorySlug');
        $locationSlug = $controller->param('slug');
        $tab = $controller->param('tab');
        if ($citySlug) {
            if ($municipalitySlug) {
                $this->addTitle(
                    $this->getCityTitle($municipalitySlug)
                );
            } else {
                $this->addTitle(
                    $this->getCityTitle($citySlug)
                );
            }
            if ($categorySlug === null && $this->page->getBaseFileName() === 'location/p20-locations-list') {
                $categorySlug = 'gde-jesti';
                $this->addTitle(
                    $this->getCategoryTitle($citySlug, $categorySlug)
                );
                $this->setMetaDescription(
                    $this->getCityLocationCategoryDescription($citySlug, $categorySlug)
                );
            } elseif ($categorySlug) {
                $this->addTitle(
                    $this->getCategoryTitle($citySlug, $categorySlug)
                );
                if ($locationSlug) {
                    $location = Location::where('slug', $locationSlug)->first();
                    if ($location) {
                        $this->addTitle($location->title);
                        if ($tab && $tab != 'info' && isset(Location::$tabs[$tab])) {
                            $categoryTitle = $this->getCategoryTitle($citySlug, $categorySlug);
                            $cityTitle = $this->getCityTitle($citySlug);
                            $this->addTitle(ucfirst($tab));
                            $tabValue = Location::$tabs[$tab];
                            switch ($tabValue) {
                                case 'review':
                                    $prefix = Message::trans('Utisci korisnika');
                                    $this->setMetaDescription(
                                        "$prefix | $location->title $cityTitle"
                                    );
                                    break;
                                case 'menu':
                                    $prefix = ucfirst(Message::trans('Jelovnik'))
                                        . " {$categoryTitle}, najbolje jelo, najbolji restoran, najbolja hrana. Grad $cityTitle -";
                                    $restaurantMenu = $location->restaurant_menu()->first();
                                    $restaurantMenuDescription = $restaurantMenu && $restaurantMenu->description
                                        ? ' - ' . $restaurantMenu->description
                                        : '';
                                    $this->setMetaDescription(
                                        "$prefix $location->title$restaurantMenuDescription"
                                    );
                                    break;
                                case 'gallery':
                                    $desc = Message::trans(
                                        'Galerija, slike, fotografije, slike jela'
                                    );
                                    $this->setMetaDescription(
                                        "$desc | $location->title $cityTitle"
                                    );
                                    break;
                            }
                        } else {
                            $this->setMetaDescription($location->snippet);
                        }
                    }
                } else {
                    $this->setMetaDescription(
                        $this->getCityLocationCategoryDescription($citySlug, $categorySlug)
                    );
                }
            } else {
                if ($municipalitySlug) {
                    $this->setMetaDescription(
                        $this->getCityLocationDescription($municipalitySlug)
                    );
                } else {
                    $this->setMetaDescription(
                        $this->getCityLocationDescription($citySlug)
                    );
                }
            }
        }
    }
}
