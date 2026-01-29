<?php namespace Reuniors\Questionnaire\Http\Actions\V1\Wizard;

use Illuminate\Support\Facades\Validator;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Questionnaire\Classes\WizardValidationService;
use Reuniors\Questionnaire\Models\QuestionnaireRegistration;

/**
 * CompleteWizardAction
 *
 * Marks wizard as completed.
 * Validates all wizard data before marking complete.
 */
class CompleteWizardAction extends BaseAction
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
        ];
    }

    public function handle(array $attributes = [])
    {
        Validator::make($attributes, $this->rules())->validate();

        $registrationId = $attributes['registration_id'] ?? $attributes['registrationId'] ?? null;

        $registration = QuestionnaireRegistration::with('wizard_definition')
            ->findOrFail($registrationId);

        // Check if expired
        if ($registration->isExpired()) {
            throw new \Exception('Wizard session has expired');
        }

        // Validate entire wizard data
        $validation = $this->validationService->validateCompleteWizard(
            $registration->wizard_data,
            $registration->wizard_definition
        );

        if (!$validation['valid']) {
            throw new \ValidationException($validation['errors']);
        }

        // Mark as completed
        $registration->completeWizard();

        // If auto-create is enabled, create entities now
        if ($registration->wizard_definition->auto_create_entities) {
            // TODO: Implement WizardEntityService to create entities
            // $this->createEntitiesFromWizard($registration);
        }

        return [
            'success' => true,
            'registration' => $registration,
            'requires_approval' => $registration->wizard_definition->requires_approval,
            'message' => $registration->wizard_definition->requires_approval 
                ? 'Wizard completed. Awaiting admin approval.' 
                : 'Wizard completed successfully!',
        ];
    }
}
