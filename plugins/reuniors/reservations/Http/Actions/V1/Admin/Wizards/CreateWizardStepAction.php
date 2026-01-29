<?php
namespace Reuniors\Reservations\Http\Actions\V1\Admin\Wizards;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Questionnaire\Models\WizardDefinition;
use Reuniors\Questionnaire\Models\WizardStep;

/**
 * CreateWizardStepAction
 *
 * Creates a new step for a wizard.
 * Admin-only endpoint.
 */
class CreateWizardStepAction extends BaseAction
{
    public function handle(array $attributes = [])
    {
        $wizardId = $attributes['wizardId'] ?? $attributes['id'] ?? null;

        if (!$wizardId) {
            throw new \InvalidArgumentException('Wizard ID is required');
        }

        $wizard = WizardDefinition::find($wizardId);

        if (!$wizard) {
            throw new \Symfony\Component\HttpKernel\Exception\NotFoundHttpException('Wizard not found');
        }

        $maxSortOrder = (int) WizardStep::where('wizard_definition_id', $wizardId)->max('sort_order');

        $name = $attributes['name'] ?? ('Korak ' . ($maxSortOrder + 1));
        $slug = $attributes['slug'] ?? \Str::slug($name);

        $step = new WizardStep();
        $step->wizard_definition_id = $wizardId;
        $step->name = $name;
        $step->slug = $slug;
        $step->sort_order = $maxSortOrder + 1;
        $step->description = $attributes['description'] ?? null;
        $step->is_skippable = $attributes['isSkippable'] ?? false;
        $step->is_informational = $attributes['isInformational'] ?? false;
        $step->data_storage_strategy = $attributes['dataStorageStrategy'] ?? 'json';
        $step->target_entity_type = $attributes['targetEntityType'] ?? null;
        $step->target_entity_table = $attributes['targetEntityTable'] ?? null;
        $step->validation_rules = $attributes['validationRules'] ?? null;
        $step->conditions = $attributes['conditions'] ?? null;
        $step->metadata = $attributes['metadata'] ?? null;

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
            'fields' => [],
        ];
    }
}
