<?php namespace Reuniors\Knk\Components;

use Cms\Classes\ComponentBase;
use Cms\Classes\Controller;
use Illuminate\Support\Str;
use Reuniors\Knk\Classes\CacheData;
use Reuniors\Knk\Classes\Device;
use Reuniors\Knk\Classes\HelperCommon;
use Reuniors\Knk\Classes\Meta\Meta;
use Reuniors\Knk\Classes\OldRedirects;
use Reuniors\Knk\Classes\Redirect404Exception;
use Cache;
use App;
use Reuniors\Knk\Models\Location;
use Reuniors\Base\Models\City;
use System\Models\PluginVersion;

abstract class BaseKnkComponent extends ComponentBase
{
    protected $propertyNameCategorySlug = 'categoriesSlug';
    protected $propertyNameSlug = 'slug';
    protected $checkCanonical = false;
    protected static $addedCanonicalHeader = false;
    public $isMobile;
    public $minJs = '';
    public $knkPluginVersion;
    /** @var Meta */
    public $pageMeta;

    public function onRun()
    {
        try {
            $redirectPage = $this->fixCategorySlug();
            if ($redirectPage) {
                return $redirectPage;
            }
            $this->setDefaultPageVars();
            if ($this->checkCanonical) {
                $this->addCanonicalHeaderToComponent();
            }
            return $this->onRunOriginal();
        } catch (Redirect404Exception $redirect404Exception) {
            $this->setStatusCode(404);
            return $this->controller->run('404');
        }
    }

    public function fixCategorySlug()
    {
        if ($this->property($this->propertyNameCategorySlug)) {
            $municipalitySlug = $this->property('municipalitySlug') ?? $this->property('citySlug');
            $citySlug = $this->property('citySlug');
            $categorySlug = HelperCommon::shortenCategorySlug(
                $this->property($this->propertyNameCategorySlug),
                $municipalitySlug,
                $isOldCategorySlug
            );
            $this->setProperty(
                $this->propertyNameCategorySlug,
                $categorySlug
            );
            $controller = new Controller();
            $redirectUrl = $this->fixMenuSlug(
                $controller, $isOldCategorySlug, $citySlug, $categorySlug, $municipalitySlug
            );
            if ($isOldCategorySlug && !$redirectUrl) {
                $pageParams = [
                    'citySlug' => $citySlug,
                    'categorySlug' => $categorySlug,
                ];
                $fileName = 'location/p20-locations-list';
                if ($municipalitySlug && $municipalitySlug !== $citySlug) {
                    $pageParams['municipalitySlug'] = $municipalitySlug;
                    $fileName = 'location/p10-locations-municipality';
                }
                $redirectUrl = $controller->pageUrl($fileName, $pageParams);
//                $this->setProperty(
//                    'categorySlug',
//                    $categorySlug
//                );
//                $this->setProperty(
//                    'isOldCategorySlug',
//                    $isOldCategorySlug
//                );
//                $this->setProperty(
//                    'isCanonical',
//                    true
//                );
            }
            if ($redirectUrl) {
                return \Redirect::to($redirectUrl, 301);
            }
        }
        return null;
    }

    public function fixMenuSlug($controller, $isOldCategorySlug, $citySlug, $categorySlug, $municipalitySlug = null)
    {
        if ($this->property($this->propertyNameSlug)) {
            $oldMenuSlug = $this->property($this->propertyNameSlug);
            $slug = HelperCommon::shortenMenuSlug(
                $oldMenuSlug,
                $isOldMenuSlug
            );
            $this->setProperty(
                $this->propertyNameSlug,
                $slug
            );
            if ($isOldMenuSlug) {
                $oldRedirects = new OldRedirects;
                if (isset($oldRedirects->redirectSlugs[$oldMenuSlug])) {
                    return $oldRedirects->redirectSlugs[$oldMenuSlug];
                }
                $tab = HelperCommon::$oldSiteMenuPrefix;
                $tabValue = Location::getTabValue($tab);
                $pageParams = [
                    'citySlug' => $citySlug,
                    'categorySlug' => $categorySlug,
                    'slug' => $slug,
                    'tabValue' => $tabValue,
                    'tab' => $tab,
                ];
                $fileName = 'location/p40-one-location-tab';
                if ($municipalitySlug && $municipalitySlug !== $citySlug) {
                    $pageParams['municipalitySlug'] = $municipalitySlug;
                    $fileName = 'location/p35-municipality-one-location-tab';
                }
                return $controller->pageUrl($fileName, $pageParams);
//                $this->setProperty(
//                    'slug',
//                    $slug
//                );
//                $this->setProperty(
//                    'tab',
//                    $tab
//                );
//                $this->setProperty(
//                    'tabValue',
//                    $tabValue
//                );
//                $this->setProperty(
//                    'isCanonical',
//                    true
//                );
            } elseif ($isOldCategorySlug) {
                $pageParams = [
                    'citySlug' => $citySlug,
                    'categorySlug' => $categorySlug,
                    'slug' => $slug,
                ];
                $fileName = 'location/p50-one-location';
                if ($municipalitySlug && $municipalitySlug !== $citySlug) {
                    $pageParams['municipalitySlug'] = $municipalitySlug;
                    $fileName = 'location/p30-municipality-one-location';
                }
                return $controller->pageUrl($fileName, $pageParams);
            }
        }
    }

    public function initNewController()
    {
        static $newController;
        if (!$newController) {
            $newController = new Controller();
        }
        return $newController;
    }

    public function addCanonicalHeaderToComponent()
    {
        $cacheDuration = 2 * 24; // 2 days
        $controller = $this->controller;
        $properties  = $this->properties;
        $hasMunicipality = false;
        $cityMunicipalities = CacheData::get('cities-municipalities', $cacheDuration);
        $pageFileName = $controller->getPage()->getBaseFileName();
        if (!isset($properties['municipalitySlug']) &&
            isset($properties['citySlug']) &&
            $properties['citySlug'] &&
            isset($cityMunicipalities[$properties['citySlug']]) &&
            $cityMunicipalities[$properties['citySlug']] &&
            $pageFileName !== 'location/p20-locations-list'
        ) {
            $properties['isCanonical'] = true;
            $hasMunicipality = true;
            $properties['municipalitySlug'] = $properties['citySlug'];
            $properties['citySlug'] = $cityMunicipalities[$properties['citySlug']];
        }
        if (!self::$addedCanonicalHeader && $properties && isset($properties['isCanonical'])) {
            $cmsController = $this->initNewController();
            $pageFileName = $controller->getPage()->getBaseFileName();
            $hasTab = isset($properties['tab']) && !empty($properties['tab']);
            $tabPage = 'location/p40-one-location-tab';
            if (isset($properties['categorySlug']) || isset($properties['categoriesSlug'])) {
                $properties['categorySlug'] = $properties['categorySlug'] ?? $properties['categoriesSlug'];
            }
//            elseif ($hasMunicipality && $pageFileName === 'location/p20-locations-list') {
//                $pageFileName = 'location/p15-locations-municipality-search';
//            }
            if ($hasTab) {
                $pageFileName = $tabPage;
            }
            $pageFileName = $hasMunicipality && isset(City::$linkMunicipalityPages[$pageFileName])
                ? City::$linkMunicipalityPages[$pageFileName]
                : $pageFileName;
            $canonicalUrl = $cmsController->pageUrl($pageFileName, $properties);
            $defaultPostfix = '/default';
            if (Str::endsWith($canonicalUrl, $defaultPostfix)) {
                $canonicalUrl = substr($canonicalUrl, 0, -strlen($defaultPostfix));
            }
            header("Link: <$canonicalUrl>; rel=\"canonical\"");
            self::$addedCanonicalHeader = [
                'pageFileName' => $pageFileName,
                'properties' => $properties
            ];
        }
    }

    abstract public function onRunOriginal();

    public function setDefaultPageVars()
    {
        if ($this->isMobile === null) {
            $this->isMobile = $this->page['isMobile'] = Device::isMobile();
        }

        $knkPluginVersion = PluginVersion::getVersion('Reuniors.Knk');
        $this->knkPluginVersion = $knkPluginVersion;
        $this->page['knkPluginVersion'] = $knkPluginVersion;

        $this->minJs = $this->page['minJs'] = App::environment('development')
            ? ''
            : '.min';
        if (!isset($this->page['pageMeta'])) {
            $this->pageMeta = $this->page['pageMeta'] = new Meta($this->controller, 'Kuda na klopu');
        } else {
            $this->pageMeta = $this->page['pageMeta'];
        }
    }
}
