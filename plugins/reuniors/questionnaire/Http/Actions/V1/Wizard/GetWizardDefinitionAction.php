<?php namespace Reuniors\Questionnaire\Http\Actions\V1\Wizard;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Questionnaire\Models\WizardDefinition;

/**
 * GetWizardDefinitionAction
 * 
 * Returns complete wizard definition with all steps and fields
 * Used to initialize wizard on frontend
 */
class GetWizardDefinitionAction extends BaseAction
{
    use AsAction;

    public function handle(array $attributes = [])
    {
        $slug = $attributes['slug'] ?? null;

        if (!$slug) {
            throw new \Exception('Wizard slug is required');
        }

        $wizard = WizardDefinition::query()
            ->where('slug', $slug)
            ->where('is_active', true)
            ->withFullDefinition()
            ->firstOrFail();

        return $wizard;
    }
}
