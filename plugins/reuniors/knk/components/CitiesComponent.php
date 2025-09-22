<?php namespace Reuniors\Knk\Components;

use Redirect;
use App;
use Reuniors\Knk\Classes\HelperCommon;
use Url;
use Cms\Classes\ComponentBase;
use Reuniors\Base\Models\City;

class CitiesComponent extends BaseKnkComponent
{
    public $cities;

    public function componentDetails()
    {
        return [
            'name'        => 'Cities',
            'description' => 'No description provided yet...'
        ];
    }

    public function defineProperties()
    {
        return [
            'withMunicipality' => [
                'title'       => 'With Municipality',
                'description' => 'With Municipality',
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
        $this->cities = $this->page['cities'] = $this->getCities();
    }

    public function getCities()
    {
        return City::listFrontEnd([
            'withMunicipality' => $this->property('withMunicipality'),
            'perPage' => $this->property('perPage'),
            'pageNumber' => $this->property('pageNumber'),
            'sortBy' => $this->property('sortBy'),
            'sortByOrientation' => $this->property('sortByOrientation'),
        ]);
    }

    public function onCityChange()
    {
        $url = $this->controller->pageUrl('home', ['citySlug' => post('slug')]);
        return Redirect::to($url);
    }
}
