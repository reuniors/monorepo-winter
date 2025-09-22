<?php namespace Reuniors\Knk\Classes;

use Cms\Classes\Controller;
use Illuminate\Support\Facades\Facade;
use Input;
use October\Rain\Support\Traits\Singleton;
use Reuniors\Knk\Classes\Meta\Meta;
use Reuniors\Knk\Classes\PageFeInit;
use Reuniors\Knk\Models\Category;
use Reuniors\Knk\Models\Location;
use Reuniors\Knk\Models\RegionCity;

class KNKGlobals extends Facade
{
    use Singleton;
    protected $currentCity;
    protected $currentCategory;
    protected $currentLocation;
    protected $controller;
    const FE_ROUTES = [
        'l', 'p', 'administration', 'questionnaire', 'administration-other'
    ];

    public function afterInit() {
        $citySlug = $this->controller->param('citySlug');
        $categorySlug = $this->controller->param('categorySlug');
        $slug = $this->controller->param('slug');
        if ($citySlug) {
            $this->controller['currentCity'] = $this->currentCity = RegionCity
                ::where('slug', $citySlug)
                ->first();
            if ($categorySlug) {
                $this->controller['currentCategory'] = $this->currentCategory = Category
                    ::where('slug', $categorySlug)
                    ->first();
                if ($slug && $this->currentCity && $this->currentCategory) {
                    $this->controller['currentLocation'] = $this->currentLocation = Location
                        ::where('slug', $slug)
                        ->first();
                }
            }
        }
    }

    public function currentCategory()
    {
        return $this->currentCategory;
    }

    public function currentCity()
    {
        return $this->currentCity;
    }

    public function currentLocation()
    {
        return $this->currentLocation;
    }

    public function currentController($controller = null)
    {
        if (isset($controller)) {
            $this->controller = $controller;
            $this->afterInit();
        }
        return $controller;
    }

    /**
     * @param Controller $controller
     * @throws Redirect404Exception
     */
    public function initData($controller)
    {
        $this->controller = $controller->controller;
        $page = $this->controller->getPage();

        $citySlug = $this->controller->param('citySlug');
        if (in_array($citySlug, self::FE_ROUTES)) {
            return null;
        }
        $pageFeInit = new PageFeInit();

        $initResponse = $pageFeInit->init($this->controller);
        if ($initResponse) {
            return null;
        }
        $pageFeInit->initLocationsData();
        $page['pageMeta'] = new Meta($this->controller, 'Kuda na klopu?');
        $page['initialData'] = [
            'pageData' => [
                'type' => $pageFeInit->type,
                'url' => $pageFeInit->url,
            ],
            'city' => $pageFeInit->city,
            'municipality' => $pageFeInit->municipality,
            'category' => $pageFeInit->category,
            'location' => $pageFeInit->location,
            'tab' => $pageFeInit->tab,
            'locationsData' => $pageFeInit->locationsData,
        ];
    }
}
