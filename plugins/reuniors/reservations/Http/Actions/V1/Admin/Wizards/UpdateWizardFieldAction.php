<?php
namespace Reuniors\Reservations\Http\Actions\V1\Admin\Wizards;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Questionnaire\Models\WizardField;

/**
 * UpdateWizardFieldAction
 *
 * Updates an existing wizard field.
 * Admin-only endpoint.
 */
class UpdateWizardFieldAction extends BaseAction
{
    use AsAction;

    public function handle(array $attributes = [])
    {
        $id = $attributes['id'] ?? $attributes['fieldId'] ?? null;

        if (!$id) {
            throw new \InvalidArgumentException('Field ID is required');
        }

        $field = WizardField::find($id);

        if (!$field) {
            throw new \Symfony\Component\HttpKernel\Exception\NotFoundHttpException('Wizard field not found');
        }

        $fillableMap = [
            'fieldKey' => 'field_key',
            'fieldLabel' => 'field_label',
            'fieldType' => 'field_type',
            'sortOrder' => 'sort_order',
            'isRequired' => 'is_required',
            'isVisible' => 'is_visible',
            'isReadonly' => 'is_readonly',
            'placeholder' => 'placeholder',
            'helpText' => 'help_text',
            'defaultValue' => 'default_value',
            'fieldOptions' => 'field_options',
            'validationRules' => 'validation_rules',
            'conditions' => 'conditions',
            'targetFieldName' => 'target_field_name',
            'targetFieldPath' => 'target_field_path',
            'metadata' => 'metadata',
        ];

        foreach ($fillableMap as $camel => $snake) {
            if (array_key_exists($camel, $attributes)) {
                $field->{$snake} = $attributes[$camel];
            }
        }

        $field->save();

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
