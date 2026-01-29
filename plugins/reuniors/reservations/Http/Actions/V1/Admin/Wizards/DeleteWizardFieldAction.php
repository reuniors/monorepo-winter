<?php
namespace Reuniors\Reservations\Http\Actions\V1\Admin\Wizards;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Questionnaire\Models\WizardField;

/**
 * DeleteWizardFieldAction
 *
 * Deletes a wizard field (soft delete).
 * Admin-only endpoint.
 */
class DeleteWizardFieldAction extends BaseAction
{
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

        $field->delete();

        return ['success' => true];
    }
}
