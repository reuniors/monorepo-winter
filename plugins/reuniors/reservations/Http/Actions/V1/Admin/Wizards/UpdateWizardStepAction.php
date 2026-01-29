<?php
namespace Reuniors\Reservations\Http\Actions\V1\Admin\Wizards;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Questionnaire\Models\WizardStep;

/**
 * UpdateWizardStepAction
 *
 * Updates an existing wizard step.
 * Admin-only endpoint.
 */
class UpdateWizardStepAction extends BaseAction
{
    public function handle(array $attributes = [])
    {
        $stepId = $attributes['stepId'] ?? $attributes['id'] ?? null;

        if (!$stepId) {
            throw new \InvalidArgumentException('Step ID is required');
        }

        $step = WizardStep::find($stepId);

        if (!$step) {
            throw new \Symfony\Component\HttpKernel\Exception\NotFoundHttpException('Wizard step not found');
        }

        $fillableMap = [
            'name' => 'name',
            'slug' => 'slug',
            'description' => 'description',
            'sortOrder' => 'sort_order',
            'isSkippable' => 'is_skippable',
            'isInformational' => 'is_informational',
            'dataStorageStrategy' => 'data_storage_strategy',
            'targetEntityType' => 'target_entity_type',
            'targetEntityTable' => 'target_entity_table',
            'validationRules' => 'validation_rules',
            'conditions' => 'conditions',
            'metadata' => 'metadata',
        ];

        foreach ($fillableMap as $camel => $snake) {
            if (array_key_exists($camel, $attributes)) {
                $value = $attributes[$camel];
                if (in_array($snake, ['validation_rules', 'conditions', 'metadata']) && is_array($value)) {
                    $step->{$snake} = $value;
                } else {
                    $step->{$snake} = $value;
                }
            }
        }

        $step->save();

        return [
            'id' => $step->id,
            'wizardDefinitionId' => $step->wizard_definition_id,
            'slug' => $step->slug,
            'name' => $step->name,
            'description' => $step->description,
            'sortOrder' => $step->sort_order,
            'isSkippable' => $step->is_skippable,
            'isInformational' => $step->is_informational,
            'dataStorageStrategy' => $step->data_storage_strategy,
            'targetEntityType' => $step->target_entity_type,
            'targetEntityTable' => $step->target_entity_table,
            'validationRules' => $step->validation_rules,
            'conditions' => $step->conditions,
            'metadata' => $step->metadata,
            'fields' => $step->fields()->orderBy('sort_order')->get()->map(function ($f) {
                return [
                    'id' => $f->id,
                    'fieldKey' => $f->field_key,
                    'fieldLabel' => $f->field_label,
                    'fieldType' => $f->field_type,
                    'sortOrder' => $f->sort_order,
                ];
            })->toArray(),
        ];
    }
}
