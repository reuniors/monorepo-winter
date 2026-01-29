<?php
namespace Reuniors\Reservations\Http\Actions\V1\Admin\Wizards;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Questionnaire\Models\WizardDefinition;

/**
 * ToggleWizardActiveAction
 * 
 * Toggles wizard active status
 * Admin-only endpoint
 */
class ToggleWizardActiveAction extends BaseAction
{
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

        $isActive = isset($attributes['isActive']) 
            ? filter_var($attributes['isActive'], FILTER_VALIDATE_BOOLEAN) 
            : !$wizard->is_active;

        $wizard->is_active = $isActive;
        $wizard->save();

        return [
            'id' => $wizard->id,
            'isActive' => $wizard->is_active,
        ];
    }
}
