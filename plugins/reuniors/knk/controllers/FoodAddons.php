<?php namespace Reuniors\Knk\Controllers;

use Backend\Classes\Controller;
use BackendMenu;

class FoodAddons extends Controller
{
    public $implement = [
        'Backend\Behaviors\ListController',
        'Backend\Behaviors\FormController',
        'Reuniors\Reorder\Controllers\OrderSwapController',
    ];
    
    public $listConfig = 'config_list.yaml';
    public $formConfig = 'config_form.yaml';

    public function __construct()
    {
        parent::__construct();
    }
}
