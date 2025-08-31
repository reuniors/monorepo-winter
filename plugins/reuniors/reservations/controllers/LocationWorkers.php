<?php namespace Reuniors\Reservations\Controllers;

use Backend\Classes\Controller;
use BackendMenu;

class LocationWorkers extends Controller
{
    public $implement = [        'Backend\Behaviors\ListController',        'Backend\Behaviors\FormController'    ];

    public $listConfig = 'config_list.yaml';
    public $formConfig = 'config_form.yaml';

    public function __construct()
    {
        parent::__construct();
        BackendMenu::setContext('Reuniors.Reservations', 'main-menu-reservations', 'side-menu-location-workers');
    }
}
