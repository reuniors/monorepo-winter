<?php namespace Reuniors\Questionnaire\Http\Actions\V1\Wizard;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Questionnaire\Models\QuestionnaireRegistration;
use Reuniors\Questionnaire\Models\WizardStep;
use Reuniors\Questionnaire\Classes\WizardValidationService;

/**
 * SaveWizardStepAction
 * 
 * Saves data for a specific wizard step
 * Validates data before saving
 */
class SaveWizardStepAction extends BaseAction
{
    use AsAction;

    protected $validationService;

    public function __construct()
    {
        $this->validationService = new WizardValidationService();
    }

    public function handle(array $attributes = [])
    {
        $registrationId = $attributes['registration_id'] ?? null;
        $stepSlug = $attributes['step_slug'] ?? null;
        $stepData = $attributes['data'] ?? [];

        if (!$registrationId || !$stepSlug) {
            throw new \Exception('Registration ID and step slug are required');
        }

        $registration = QuestionnaireRegistration::with(['wizard_definition.steps'])
            ->findOrFail($registrationId);

        // Check if wizard has expired
        if ($registration->isExpired()) {
            throw new \Exception('Wizard session has expired');
        }

        // Find the step
        $step = WizardStep::query()
            ->where('wizard_definition_id', $registration->wizard_definition_id)
            ->where('slug', $stepSlug)
            ->with('fields')
            ->firstOrFail();

        // Validate step data
        $validation = $this->validationService->validateStep($step, $stepData);

        if (!$validation['valid']) {
            throw new \ValidationException($validation['errors']);
        }

        // Save step data to wizard_data JSON field
        $wizardData = $registration->wizard_data ?? [];
        $wizardData[$stepSlug] = $stepData;
        $registration->wizard_data = $wizardData;

        // Update progress
        $registration->updateWizardProgress($step->id);

        return [
            'success' => true,
            'registration' => $registration,
            'next_step' => $this->getNextStep($registration, $step),
            'progress' => $registration->wizard_progress,
        ];
    }

    /**
     * Get next step in wizard
     */
    protected function getNextStep($registration, $currentStep)
    {
        $nextStep = WizardStep::query()
            ->where('wizard_definition_id', $registration->wizard_definition_id)
            ->where('sort_order', '>', $currentStep->sort_order)
            ->orderBy('sort_order')
            ->with('fields')
            ->first();

        return $nextStep;
    }
}
