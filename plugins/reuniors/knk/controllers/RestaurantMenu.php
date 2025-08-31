<?php namespace Reuniors\Knk\Controllers;

use Backend\Classes\Controller;
use BackendMenu;

class RestaurantMenu extends Controller
{
    public $implement = [
        'Backend\Behaviors\ListController',
        'Backend\Behaviors\FormController',
        'Backend.Behaviors.RelationController',
        'Reuniors\Reorder\Controllers\OrderSwapController'
    ];
    
    public $listConfig = 'config_list.yaml';
    public $formConfig = 'config_form.yaml';
    public $relationConfig = 'config_relation.yaml';

    public function __construct()
    {
        parent::__construct();
        BackendMenu::setContext('Reuniors.Knk', 'knk', 'knk-food-menu');
    }

    public function relationExtendViewWidget($widget, $field)
    {
        if ($widget->model instanceof \Reuniors\Knk\Models\FoodCategory) {
            $widget->model->restaurant_menu_id_inject = $this->params[0];
        }
    }

    public function relationExtendManageWidget($widget, $field)
    {
        if ($widget->model instanceof \Reuniors\Knk\Models\FoodCategory) {
            $widget->model->restaurant_menu_id_inject = $this->params[0];
        }
    }
}
