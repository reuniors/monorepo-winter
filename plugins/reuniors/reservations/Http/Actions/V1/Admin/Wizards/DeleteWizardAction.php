<?php
namespace Reuniors\Reservations\Http\Actions\V1\Admin\Wizards;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Questionnaire\Models\WizardDefinition;

/**
 * DeleteWizardAction
 * 
 * Soft deletes a wizard definition
 * Admin-only endpoint
 */
class DeleteWizardAction extends BaseAction
{
    use AsAction;

    public function handle(array $attributes = [])
    {
        $id = $attributes['id'] ?? null;

        if (!$id) {
            throw new \Exception('Wizard ID is required');
        }

        $wizard = WizardDefinition::find($id);

        if (!$wizard) {
            throw new \Symfony\Component\HttpKernel\Exception\NotFoundHttpException('Wizard not found');
        }

        // Soft delete
        $wizard->delete();

        return [
            'message' => 'Wizard deleted successfully',
        ];
    }
}
