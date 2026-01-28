<?php
namespace Reuniors\Reservations\Http\Actions\V1\Admin\Wizards;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Questionnaire\Models\WizardStep;
use Reuniors\Questionnaire\Models\WizardField;

/**
 * ReorderWizardFieldsAction
 *
 * Updates sort_order of fields within a wizard step.
 * Expects body: { fieldIds: [id1, id2, ...] } in the new order.
 * Admin-only endpoint.
 */
class ReorderWizardFieldsAction extends BaseAction
{
    use AsAction;

    public function handle(array $attributes = [])
    {
        $stepId = $attributes['stepId'] ?? null;
        $fieldIds = $attributes['fieldIds'] ?? $attributes['field_ids'] ?? [];

        if (!$stepId) {
            throw new \InvalidArgumentException('Step ID is required');
        }

        if (!is_array($fieldIds) || empty($fieldIds)) {
            throw new \InvalidArgumentException('fieldIds array is required');
        }

        $step = WizardStep::find($stepId);

        if (!$step) {
            throw new \Symfony\Component\HttpKernel\Exception\NotFoundHttpException('Wizard step not found');
        }

        foreach ($fieldIds as $position => $fieldId) {
            WizardField::where('id', $fieldId)
                ->where('wizard_step_id', $stepId)
                ->update(['sort_order' => $position]);
        }

        return ['success' => true];
    }
}
