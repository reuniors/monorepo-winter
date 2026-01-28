<?php namespace Reuniors\Questionnaire\Controllers;

use Backend\Classes\Controller;
use BackendMenu;
use Winter\Storm\Support\Facades\Flash;
use Reuniors\Questionnaire\Models\WizardDefinition;

/**
 * WizardDefinitions Controller
 * 
 * Backend controller for managing wizard definitions
 */
class WizardDefinitions extends Controller
{
    public $implement = [
        'Backend\Behaviors\ListController',
        'Backend\Behaviors\FormController',
        'Backend\Behaviors\RelationController',
    ];
    
    public $listConfig = 'config_list.yaml';
    public $formConfig = 'config_form.yaml';
    public $relationConfig = 'config_relation.yaml';

    public $requiredPermissions = ['reuniors.questionnaire.access_wizards'];

    public function __construct()
    {
        parent::__construct();
        
        BackendMenu::setContext('Reuniors.Questionnaire', 'questionnaire', 'wizards');
    }

    /**
     * Duplicate wizard action
     */
    public function onDuplicate($recordId = null)
    {
        $wizard = WizardDefinition::findOrFail($recordId);
        
        $clone = $wizard->replicate();
        $clone->slug = $wizard->slug . '-copy-' . time();
        $clone->name = $wizard->name . ' (Copy)';
        $clone->is_active = false;
        $clone->save();
        
        // Clone steps
        foreach ($wizard->steps as $step) {
            $stepClone = $step->replicate();
            $stepClone->wizard_definition_id = $clone->id;
            $stepClone->save();
            
            // Clone fields
            foreach ($step->fields as $field) {
                $fieldClone = $field->replicate();
                $fieldClone->wizard_step_id = $stepClone->id;
                $fieldClone->save();
            }
        }
        
        Flash::success('Wizard duplicated successfully!');
        
        return $this->listRefresh();
    }
}
