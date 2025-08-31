<?php namespace Reuniors\Evodic\Models;

use Model;

/**
 * Model
 */
class LocationList extends BaseList
{
    public $belongsToMany = [
        'locations' => [
            'Reuniors\Evodic\Models\Location',
            'table' => 'reuniors_evodic_locations_lists',
            'order' => 'name'
        ],
    ];
}
