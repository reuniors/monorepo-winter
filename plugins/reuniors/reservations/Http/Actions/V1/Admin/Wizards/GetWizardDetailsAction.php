<?php
namespace Reuniors\Reservations\Http\Actions\V1\Admin\Wizards;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Questionnaire\Models\WizardDefinition;

/**
 * GetWizardDetailsAction
 * 
 * Returns single wizard definition with all steps and fields
 * Admin-only endpoint
 */
class GetWizardDetailsAction extends BaseAction
{
    public function handle(array $attributes = [])
    {
        $id = $attributes['id'] ?? null;

        if (!$id) {
            throw new \Exception('Wizard ID is required');
        }

        $wizard = WizardDefinition::withFullDefinition()
            ->findOrFail($id);

        return [
            'id' => $wizard->id,
            'slug' => $wizard->slug,
            'name' => $wizard->name,
            'description' => $wizard->description,
            'type' => $wizard->type,
            'isActive' => $wizard->is_active,
            'requiresAuth' => $wizard->requires_auth,
            'requiresApproval' => $wizard->requires_approval,
            'autoCreateEntities' => $wizard->auto_create_entities,
            'primaryEntityType' => $wizard->primary_entity_type,
            'primaryEntityTable' => $wizard->primary_entity_table,
            'metadata' => $wizard->metadata,
            'steps' => $wizard->steps->map(function ($step) {
                return [
                    'id' => $step->id,
                    'slug' => $step->slug,
                    'name' => $step->name,
                    'description' => $step->description,
                    'sortOrder' => $step->sort_order,
                    'isSkippable' => $step->is_skippable,
                    'isInformational' => $step->is_informational,
                    'targetEntityType' => $step->target_entity_type,
                    'targetEntityTable' => $step->target_entity_table,
                    'dataStorageStrategy' => $step->data_storage_strategy,
                    'validationRules' => $step->validation_rules,
                    'conditions' => $step->conditions,
                    'metadata' => $step->metadata,
                    'fields' => $step->fields->map(function ($field) {
                        return [
                            'id' => $field->id,
                            'fieldKey' => $field->field_key,
                            'fieldType' => $field->field_type,
                            'fieldLabel' => $field->field_label,
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
                    }),
                ];
            }),
            'createdAt' => $wizard->created_at?->toIso8601String(),
            'updatedAt' => $wizard->updated_at?->toIso8601String(),
        ];
    }
}
