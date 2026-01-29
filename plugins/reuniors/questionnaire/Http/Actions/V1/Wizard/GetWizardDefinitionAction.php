<?php namespace Reuniors\Questionnaire\Http\Actions\V1\Wizard;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Questionnaire\Models\WizardDefinition;

/**
 * GetWizardDefinitionAction
 *
 * Returns complete wizard definition with all steps and fields.
 * Used to initialize wizard on frontend. Slug comes from URL path.
 */
class GetWizardDefinitionAction extends BaseAction
{
    public function handle(array $attributes = [], $slug = null)
    {
        $wizard = WizardDefinition::query()
            ->where('slug', $slug)
            ->where('is_active', true)
            ->withFullDefinition()
            ->firstOrFail();

        return $wizard;
    }

    public function asController($slug = null): array
    {
        return parent::asController($slug);
    }
}
