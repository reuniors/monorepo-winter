<?php namespace Reuniors\Knk\Controllers;

use Backend\Classes\Controller;
use BackendMenu;

class Food extends Controller
{
    public $implement = [
        'Backend\Behaviors\ListController',
        'Backend\Behaviors\FormController',
        'Backend\Behaviors\ReorderController',
        'Backend.Behaviors.RelationController',
        'Reuniors\Reorder\Controllers\OrderSwapController',
    ];
    
    public $listConfig = 'config_list.yaml';
    public $formConfig = 'config_form.yaml';
    public $reorderConfig = 'config_reorder.yaml';
    public $relationConfig = 'config_relation.yaml';

    public function relationExtendViewWidget($widget, $field)
    {
        if ($widget->model instanceof \Reuniors\Knk\Models\FoodTypePrice) {
            $widget->model->food_id_inject = $this->params[0];
        }
    }
    public function relationExtendManageWidget($widget, $field)
    {
        if ($widget->model instanceof \Reuniors\Knk\Models\FoodTypePrice) {
            $widget->model->food_id_inject = $this->params[0];
        }
    }

    public function __construct()
    {
        parent::__construct();
        BackendMenu::setContext('Reuniors.Knk', 'knk', 'knk-food-menu');
    }
}
