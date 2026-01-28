<?php namespace Reuniors\Questionnaire\Http\Actions\V1\Wizard;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Questionnaire\Models\WizardDefinition;
use Reuniors\Questionnaire\Models\QuestionnaireRegistration;
use Carbon\Carbon;

/**
 * StartWizardAction
 * 
 * Initializes a new wizard session
 * Creates a QuestionnaireRegistration record to track progress
 */
class StartWizardAction extends BaseAction
{
    use AsAction;

    public function handle(array $attributes = [])
    {
        $wizardSlug = $attributes['wizard_slug'] ?? null;
        $user = request()->user();

        if (!$wizardSlug) {
            throw new \Exception('Wizard slug is required');
        }

        $wizard = WizardDefinition::query()
            ->where('slug', $wizardSlug)
            ->where('is_active', true)
            ->withFullDefinition()
            ->firstOrFail();

        // Check if user authentication is required
        if ($wizard->requires_auth && !$user) {
            throw new \Exception('Authentication required for this wizard');
        }

        // Create new wizard session
        $registration = new QuestionnaireRegistration();
        $registration->user_id = $user?->id;
        $registration->wizard_definition_id = $wizard->id;
        $registration->wizard_status = 'draft';
        $registration->total_steps_count = $wizard->steps->count();
        $registration->completed_steps_count = 0;
        $registration->wizard_data = [];
        
        // Set expiration (30 days from now)
        $registration->expires_at = Carbon::now()->addDays(30);
        
        $registration->save();

        return [
            'registration_id' => $registration->id,
            'registration_code' => $registration->code,
            'wizard' => $wizard,
            'expires_at' => $registration->expires_at->toIso8601String(),
        ];
    }
}
