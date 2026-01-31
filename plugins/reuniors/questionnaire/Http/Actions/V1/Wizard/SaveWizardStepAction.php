<?php namespace Reuniors\Questionnaire\Http\Actions\V1\Wizard;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Questionnaire\Classes\WizardValidationService;
use Reuniors\Questionnaire\Models\QuestionnaireRegistration;
use Reuniors\Questionnaire\Models\WizardStep;

/**
 * SaveWizardStepAction
 *
 * Saves data for a specific wizard step.
 * Validates input and step data before saving.
 */
class SaveWizardStepAction extends BaseAction
{
    protected $validationService;

    public function __construct()
    {
        $this->validationService = new WizardValidationService();
    }

    public function rules(): array
    {
        return [
            'registrationId' => ['required', 'integer'],
            'stepSlug' => ['required', 'string'],
            'data' => ['nullable', 'array'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $registrationId = $attributes['registrationId'];
        $stepSlug = $attributes['stepSlug'];
        $stepData = $attributes['data'] ?? [];

        $registration = QuestionnaireRegistration::with(['wizard_definition.steps'])
            ->findOrFail($registrationId);

        // Check if wizard has expired
        if ($registration->isExpired()) {
            throw new \Exception('Wizard session has expired');
        }

        // Only draft, in_progress, or returned_for_edit can be edited
        if (!$registration->isEditable()) {
            throw new \Exception('Wizard is no longer editable');
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

        // Get next step BEFORE updating progress
        $nextStep = $this->getNextStep($registration, $step);

        // Update progress - use next step ID (so GET progress returns correct current_step), or keep current if last step
        $progressStepId = $nextStep ? $nextStep->id : $step->id;
        $registration->updateWizardProgress($progressStepId);

        return [
            'registration' => $registration,
            'next_step' => $nextStep,
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
