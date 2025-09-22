<?php namespace Reuniors\Knk\Controllers;

use Cms\Classes\CmsException;
use Cms\Classes\Controller;
use Cms\Classes\Page;
use Cms\Classes\Theme;
use Reuniors\Knk\Models\Location;
use Reuniors\Base\Models\City;

class FrontendHelpers extends Controller
{
    public function municipalityHome($citySlug, $municipalitySlug, $isLocationList = false)
    {
        $cmsController = new Controller();

        $cityData = City::where('slug', $municipalitySlug)
            ->whereHas('parent_city', function($parentCityQuery) use ($citySlug) {
                $parentCityQuery->where('slug', $citySlug);
            })
            ->first();
        $theme = Theme::getActiveTheme();
        if ($cityData === null && $isLocationList) {
            return null;
        }
        if ($cityData === null) {
            $pageFile = 'location/p20-locations-list';
            $cmsController->getRouter()->setParameters([
                'citySlug' => $citySlug,
                'categorySlug' => $municipalitySlug,
            ]);
        } else {
            $pageFile = 'home';
            $cmsController->getRouter()->setParameters([
                'citySlug' => $municipalitySlug,
                'parentCitySlug' => $citySlug,
            ]);
        }
        if (($page = Page::load($theme, $pageFile)) === null) {
            throw new CmsException(Lang::get('cms::lang.page.not_found_name', ['name' => $pageFile]));
        }
        return $cmsController->runPage($page);
    }

    public function locationsSearch($citySlug, $municipalitySlug = null)
    {
        $cmsController = new Controller();
        $pageFile = 'location/p20-locations-list';
        $theme = Theme::getActiveTheme();

        if ($municipalitySlug === null) {
            $cmsController->getRouter()->setParameters([
                'citySlug' => $citySlug,
            ]);
        } else {
            $cmsController->getRouter()->setParameters([
                'citySlug' => $municipalitySlug,
                'parentCitySlug' => $citySlug,
            ]);
        }

        if (($page = Page::load($theme, $pageFile)) === null) {
            throw new CmsException(Lang::get('cms::lang.page.not_found_name', ['name' => $pageFile]));
        }
        return $cmsController->runPage($page);
    }

    public function locationsMunicipality($citySlug, $municipalitySlug, $categorySlug, $isOneLocation = false)
    {
        $cmsController = new Controller();

        $cityData = City::where('slug', $municipalitySlug)
            ->whereHas('parent_city', function($parentCityQuery) use ($citySlug) {
                $parentCityQuery->where('slug', $citySlug);
            })
            ->first();
        $theme = Theme::getActiveTheme();
        if ($cityData === null && $isOneLocation) {
            return null;
        }
        if ($cityData === null) {
            $pageFile = 'location/p50-one-location';
            $cmsController->getRouter()->setParameters([
                'citySlug' => $citySlug,
                'categorySlug' => $municipalitySlug,
                'slug' => $categorySlug
            ]);
        } else {
            $pageFile = 'location/p20-locations-list';
            $pageParams = [
                'citySlug' => $municipalitySlug,
                'parentCitySlug' => $citySlug,
                'categorySlug' => $categorySlug,
            ];
            $cmsController->getRouter()->setParameters($pageParams);
        }
        if (($page = Page::load($theme, $pageFile)) === null) {
            throw new CmsException(Lang::get('cms::lang.page.not_found_name', ['name' => $pageFile]));
        }
        return $cmsController->runPage($page);
    }

    public function municipalityOneLocation($citySlug, $municipalitySlug, $categorySlug, $slug)
    {
        $cmsController = $this;
        $tab = Location::getTabValue($slug);
        $pageFile = 'location/p50-one-location';
        $theme = Theme::getActiveTheme();
        if ($tab) {
            $cmsController->getRouter()->setParameters([
                'citySlug' => $citySlug,
                'categorySlug' => $municipalitySlug,
                'slug' => $categorySlug,
                'tab' => $slug,
                'tabValue' => $tab,
            ]);
        } else {
            $cityData = City::where('slug', $municipalitySlug)
                ->whereHas('parent_city', function($parentCityQuery) use ($citySlug) {
                    $parentCityQuery->where('slug', $citySlug);
                })
                ->first();
            if ($cityData === null) {
                $this->setStatusCode(404);
                return $cmsController->run('404');
            }
            $cmsController->getRouter()->setParameters([
                'citySlug' => $citySlug,
                'municipalitySlug' => $municipalitySlug,
                'categorySlug' => $categorySlug,
                'slug' => $slug
            ]);
        }
        if (($page = Page::load($theme, $pageFile)) === null) {
            throw new CmsException(Lang::get('cms::lang.page.not_found_name', ['name' => $pageFile]));
        }
        return $cmsController->runPage($page);
    }

    public function oneLocationTab($citySlug, $categorySlug, $slug, $tabSlug)
    {
        $cmsController = $this;
        $theme = Theme::getActiveTheme();
        $pageFile = 'location/p50-one-location';
        $tab = Location::getTabValue($tabSlug);
        if (!$tab) {
            $cmsController->getRouter()->setParameters([
                'citySlug' => $citySlug,
                'municipalitySlug' => $categorySlug,
                'categorySlug' => $slug,
                'slug' => $tabSlug
            ]);
        } else {
            $cmsController->getRouter()->setParameters([
                'citySlug' => $citySlug,
                'categorySlug' => $categorySlug,
                'slug' => $slug,
                'tab' => $tabSlug,
                'tabValue' => $tab,
            ]);
        }
        if (($page = Page::load($theme, $pageFile)) === null) {
            throw new CmsException(Lang::get('cms::lang.page.not_found_name', ['name' => $pageFile]));
        }
        return $cmsController->runPage($page);
    }

    public function municipalityOneLocationTab($citySlug, $municipalitySlug, $categorySlug, $slug, $tabSlug)
    {
        $cmsController = $this;
        $theme = Theme::getActiveTheme();
        $pageFile = 'location/p50-one-location';
        $tab = Location::getTabValue($tabSlug);
        $pageParams = [
            'citySlug' => $citySlug,
            'municipalitySlug' => $municipalitySlug,
            'categorySlug' => $categorySlug,
            'slug' => $slug,
            'tab' => $tabSlug,
            'tabValue' => $tab,
        ];
        $cmsController->getRouter()->setParameters($pageParams);
        if (($page = Page::load($theme, $pageFile)) === null) {
            throw new CmsException(Lang::get('cms::lang.page.not_found_name', ['name' => $pageFile]));
        }
        return $cmsController->runPage($page);
    }
}
