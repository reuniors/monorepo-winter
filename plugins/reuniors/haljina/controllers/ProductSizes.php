<?php namespace Reuniors\Haljina\Controllers;

use Backend\Classes\Controller;
use BackendMenu;

class ProductSizes extends Controller
{
    public $implement = [        'Backend\Behaviors\ListController',        'Backend\Behaviors\FormController'    ];

    public $listConfig = 'config_list.yaml';
    public $formConfig = 'config_form.yaml';

    public function __construct()
    {
        parent::__construct();
        BackendMenu::setContext('Reuniors.Haljina', 'main-menu-item-products', 'side-menu-item-product-sizes');
    }
}
