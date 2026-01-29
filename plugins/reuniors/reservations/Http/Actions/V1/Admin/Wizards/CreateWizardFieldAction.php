<?php
namespace Reuniors\Reservations\Http\Actions\V1\Admin\Wizards;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Questionnaire\Models\WizardStep;
use Reuniors\Questionnaire\Models\WizardField;

/**
 * CreateWizardFieldAction
 *
 * Creates a new field for a wizard step.
 * Admin-only endpoint.
 */
class CreateWizardFieldAction extends BaseAction
{
    public function handle(array $attributes = [])
    {
        $stepId = $attributes['stepId'] ?? null;

        if (!$stepId) {
            throw new \InvalidArgumentException('Step ID is required');
        }

        $step = WizardStep::find($stepId);

        if (!$step) {
            throw new \Symfony\Component\HttpKernel\Exception\NotFoundHttpException('Wizard step not found');
        }

        $maxSortOrder = (int) WizardField::where('wizard_step_id', $stepId)->max('sort_order');

        $field = new WizardField();
        $field->wizard_step_id = $stepId;
        $field->field_key = $attributes['fieldKey'] ?? ('field_' . uniqid());
        $field->field_label = $attributes['fieldLabel'] ?? $field->field_key;
        $field->field_type = $attributes['fieldType'] ?? 'text';
        $field->sort_order = $maxSortOrder + 1;
        $field->is_required = $attributes['isRequired'] ?? false;
        $field->is_visible = $attributes['isVisible'] ?? true;
        $field->is_readonly = $attributes['isReadonly'] ?? false;
        $field->placeholder = $attributes['placeholder'] ?? null;
        $field->help_text = $attributes['helpText'] ?? null;
        $field->default_value = $attributes['defaultValue'] ?? null;
        $field->field_options = $attributes['fieldOptions'] ?? null;
        $field->validation_rules = $attributes['validationRules'] ?? null;
        $field->conditions = $attributes['conditions'] ?? null;
        $field->target_field_name = $attributes['targetFieldName'] ?? null;
        $field->target_field_path = $attributes['targetFieldPath'] ?? null;
        $field->parent_field_id = $attributes['parentFieldId'] ?? null;
        $field->metadata = $attributes['metadata'] ?? null;

        $field->save();

        return $this->fieldToArray($field);
    }

    private function fieldToArray(WizardField $field): array
    {
        return [
            'id' => $field->id,
            'wizardStepId' => $field->wizard_step_id,
            'fieldKey' => $field->field_key,
            'fieldLabel' => $field->field_label,
            'fieldType' => $field->field_type,
            'sortOrder' => $field->sort_order,
            'isRequired' => $field->is_required,
            'isVisible' => $field->is_visible,
            'isReadonly' => $field->is_readonly,
            'placeholder' => $field->placeholder,
            'helpText' => $field->help_text,
            'defaultValue' => $field->default_value,
            'fieldOptions' => $field->field_options,
            'validationRules' => $field->validation_rules,
            'conditions' => $field->conditions,
            'targetFieldName' => $field->target_field_name,
            'targetFieldPath' => $field->target_field_path,
            'parentFieldId' => $field->parent_field_id,
            'metadata' => $field->metadata,
        ];
    }
}
