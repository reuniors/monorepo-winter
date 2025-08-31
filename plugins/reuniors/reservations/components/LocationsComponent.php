<?php
namespace Reuniors\Reservations\Components;

use Cms\Classes\ComponentBase;
use Reuniors\Reservations\Models\Location;

class LocationsComponent extends ComponentBase
{
    public $locationsData = null;

    /**
     * Gets the details for the component
     */
    public function componentDetails()
    {
        return [
            'name' => 'Locations Component',
            'description' => 'Displays all active locations in a grid layout'
        ];
    }

    /**
     * Returns the properties provided by the component
     */
    public function defineProperties()
    {
        return [
            'limit' => [
                'title' => 'Limit',
                'description' => 'Number of locations to display',
                'default' => 10,
                'type' => 'string',
                'validation' => [
                    'integer' => true,
                    'min' => 1,
                    'max' => 100
                ]
            ],
            'type' => [
                'title' => 'Type Filter',
                'description' => 'Filter by location type',
                'default' => '',
                'type' => 'dropdown',
                'options' => [
                    '' => 'All Types',
                    '0' => 'Barber',
                    '1' => 'Restaurant'
                ]
            ],
            'showCover' => [
                'title' => 'Show Cover Images',
                'description' => 'Display location cover images',
                'default' => true,
                'type' => 'checkbox'
            ],
            'showAddress' => [
                'title' => 'Show Address',
                'description' => 'Display location addresses',
                'default' => true,
                'type' => 'checkbox'
            ],
            'showType' => [
                'title' => 'Show Type',
                'description' => 'Display location types',
                'default' => true,
                'type' => 'checkbox'
            ]
        ];
    }

    public function onRun()
    {
        $limit = (int) $this->property('limit');
        $type = $this->property('type');

        $query = Location::getFeData()
            ->where('active', 1);

        if ($type !== '') {
            $query->where('type', (int) $type);
        }

        $this->locationsData = $this->page['locationsData'] = $query
            ->with('logo')
            ->limit($limit)
            ->get();

        // Pass component properties to the template
        $this->page['showCover'] = $this->property('showCover');
        $this->page['showAddress'] = $this->property('showAddress');
        $this->page['showType'] = $this->property('showType');

        $this->page['pageTitle'] = 'Active Locations';
        $this->page['pageDescription'] = 'Browse all active locations';
    }
}
