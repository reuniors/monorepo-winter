<?php namespace Reuniors\Questionnaire\Http\Actions\V1\Wizard;

use Illuminate\Support\Facades\Validator;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Questionnaire\Models\QuestionnaireRegistration;
use Reuniors\Questionnaire\Models\WizardStep;

/**
 * SkipWizardStepAction
 *
 * Skips an optional wizard step.
 * Only works if step has is_skippable = true.
 */
class SkipWizardStepAction extends BaseAction
{
    public function rules(): array
    {
        return [
            'registration_id' => ['required_without:registrationId', 'integer'],
            'registrationId' => ['required_without:registration_id', 'integer'],
            'step_slug' => ['required_without:stepSlug', 'string'],
            'stepSlug' => ['required_without:step_slug', 'string'],
        ];
    }

    public function handle(array $attributes = [])
    {
        Validator::make($attributes, $this->rules())->validate();

        $registrationId = $attributes['registration_id'] ?? $attributes['registrationId'] ?? null;
        $stepSlug = $attributes['step_slug'] ?? $attributes['stepSlug'] ?? null;

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
