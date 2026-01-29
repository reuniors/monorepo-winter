<?php
namespace Reuniors\Reservations\Http\Actions\V1\Admin\Wizards;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Questionnaire\Models\WizardDefinition;

/**
 * CreateWizardAction
 * 
 * Creates a new wizard definition
 * Admin-only endpoint
 */
class CreateWizardAction extends BaseAction
{
    public function handle(array $attributes = [])
    {
        $wizard = new WizardDefinition();
        
        $wizard->slug = $attributes['slug'] ?? null;
        $wizard->name = $attributes['name'] ?? null;
        $wizard->description = $attributes['description'] ?? null;
        $wizard->type = $attributes['type'] ?? 'custom';
        $wizard->is_active = $attributes['isActive'] ?? true;
        $wizard->requires_auth = $attributes['requiresAuth'] ?? true;
        $wizard->requires_approval = $attributes['requiresApproval'] ?? true;
        $wizard->auto_create_entities = $attributes['autoCreateEntities'] ?? false;
        $wizard->primary_entity_type = $attributes['primaryEntityType'] ?? null;
        $wizard->primary_entity_table = $attributes['primaryEntityTable'] ?? null;
        $wizard->metadata = $attributes['metadata'] ?? null;

        $wizard->save();

        return $wizard;
    }
}
