<?php namespace Reuniors\Questionnaire\Http\Actions\V1\Wizard;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Questionnaire\Models\QuestionnaireRegistration;
use Reuniors\Questionnaire\Models\WizardStep;

/**
 * SkipWizardStepAction
 * 
 * Skips an optional wizard step
 * Only works if step has is_skippable = true
 */
class SkipWizardStepAction extends BaseAction
{
    use AsAction;

    public function handle(array $attributes = [])
    {
        $registrationId = $attributes['registration_id'] ?? null;
        $stepSlug = $attributes['step_slug'] ?? null;

        if (!$registrationId || !$stepSlug) {
            throw new \Exception('Registration ID and step slug are required');
        }

        $registration = QuestionnaireRegistration::with('wizard_definition')
            ->findOrFail($registrationId);

        // Check if expired
        if ($registration->isExpired()) {
            throw new \Exception('Wizard session has expired');
        }

        // Find the step
        $step = WizardStep::query()
            ->where('wizard_definition_id', $registration->wizard_definition_id)
            ->where('slug', $stepSlug)
            ->firstOrFail();

        // Check if step is skippable
        if (!$step->is_skippable) {
            throw new \Exception('This step cannot be skipped');
        }

        // Mark step as skipped in wizard_data
        $wizardData = $registration->wizard_data ?? [];
        $wizardData[$stepSlug] = ['__skipped' => true];
        $registration->wizard_data = $wizardData;

        // Update progress
        $registration->updateWizardProgress($step->id);

        // Get next step
        $nextStep = WizardStep::query()
            ->where('wizard_definition_id', $registration->wizard_definition_id)
            ->where('sort_order', '>', $step->sort_order)
            ->orderBy('sort_order')
            ->with('fields')
            ->first();

        return [
            'success' => true,
            'registration' => $registration,
            'next_step' => $nextStep,
            'progress' => $registration->wizard_progress,
        ];
    }
}
