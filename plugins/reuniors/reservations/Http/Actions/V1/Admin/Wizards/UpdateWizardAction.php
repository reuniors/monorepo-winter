<?php
namespace Reuniors\Reservations\Http\Actions\V1\Admin\Wizards;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Questionnaire\Models\WizardDefinition;

/**
 * UpdateWizardAction
 * 
 * Updates an existing wizard definition
 * Admin-only endpoint
 */
class UpdateWizardAction extends BaseAction
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

        // Update only provided attributes
        if (isset($attributes['slug'])) {
            $wizard->slug = $attributes['slug'];
        }
        if (isset($attributes['name'])) {
            $wizard->name = $attributes['name'];
        }
        if (isset($attributes['description'])) {
            $wizard->description = $attributes['description'];
        }
        if (isset($attributes['type'])) {
            $wizard->type = $attributes['type'];
        }
        if (isset($attributes['isActive'])) {
            $wizard->is_active = $attributes['isActive'];
        }
        if (isset($attributes['requiresAuth'])) {
            $wizard->requires_auth = $attributes['requiresAuth'];
        }
        if (isset($attributes['requiresApproval'])) {
            $wizard->requires_approval = $attributes['requiresApproval'];
        }
        if (isset($attributes['autoCreateEntities'])) {
            $wizard->auto_create_entities = $attributes['autoCreateEntities'];
        }
        if (isset($attributes['primaryEntityType'])) {
            $wizard->primary_entity_type = $attributes['primaryEntityType'];
        }
        if (isset($attributes['primaryEntityTable'])) {
            $wizard->primary_entity_table = $attributes['primaryEntityTable'];
        }
        if (isset($attributes['metadata'])) {
            $wizard->metadata = $attributes['metadata'];
        }

        $wizard->save();

        return $wizard;
    }
}
