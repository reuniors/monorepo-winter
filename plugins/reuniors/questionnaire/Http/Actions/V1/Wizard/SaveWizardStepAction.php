<?php namespace Reuniors\Questionnaire\Http\Actions\V1\Wizard;

use Illuminate\Support\Facades\Validator;
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
            'registration_id' => ['required_without:registrationId', 'integer'],
            'registrationId' => ['required_without:registration_id', 'integer'],
            'step_slug' => ['required_without:stepSlug', 'string'],
            'stepSlug' => ['required_without:step_slug', 'string'],
            'data' => ['nullable', 'array'],
        ];
    }

    public function handle(array $attributes = [])
    {
        Validator::make($attributes, $this->rules())->validate();

        $registrationId = $attributes['registration_id'] ?? $attributes['registrationId'] ?? null;
        $stepSlug = $attributes['step_slug'] ?? $attributes['stepSlug'] ?? null;
        $stepData = $attributes['data'] ?? [];

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
