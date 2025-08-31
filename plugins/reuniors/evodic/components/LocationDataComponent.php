<?php namespace Reuniors\Evodic\Components;

use Cms\Classes\ComponentBase;
use Reuniors\Evodic\Http\ActionsOnFe\V1\Location\GetLocationDataAction;
use Reuniors\Evodic\Http\ActionsOnFe\V1\Location\GetLocationPlacesAction;
use Reuniors\Evodic\Http\ActionsOnFe\V1\Location\GetLocationPlaceTypesAction;

class LocationDataComponent extends ComponentBase
{
    public $location;
    public $places;
    public $placeTypes;

    /**
     * Gets the details for the component
     */
    public function componentDetails()
    {
        return [
            'name'        => 'LocationDataComponent Component',
            'description' => 'No description provided yet...'
        ];
    }

    /**
     * Returns the properties provided by the component
     */
    public function defineProperties()
    {
        return [
            'locationSlug' => [
                'title'       => 'Location slug',
                'description' => 'Location slug',
                'default'     => '{{ :slug }}',
                'type'        => 'string',
            ],
        ];
    }

    public function onRun()
    {
        parent::onRun();
        $this->location = $this->page['location'] = GetLocationDataAction::run([
            'slug' => $this->property('locationSlug'),
            'cache' => true
        ]);
        $this->places = $this->page['places'] = GetLocationPlacesAction::run([
            'locationSlug' => $this->property('locationSlug'),
            'cache' => true
        ]);
        $this->placeTypes = $this->page['placeTypes'] = GetLocationPlaceTypesAction::run([
            'locationSlug' => $this->property('locationSlug'),
            'cache' => true
        ]);
    }
}
