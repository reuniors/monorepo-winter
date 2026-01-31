<?php namespace Reuniors\Questionnaire\Http\Actions\V1\Wizard;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Questionnaire\Models\QuestionnaireRegistration;

/**
 * GetWizardProgressAction
 *
 * Returns current wizard progress and saved data.
 * Used to resume wizard from where user left off.
 */
class GetWizardProgressAction extends BaseAction
{
    public function rules(): array
    {
        return [
            'registrationCode' => ['nullable', 'string'],
        ];
    }

    public function handle(array $attributes = [], $registration_id = null)
    {
        if ($registration_id !== null) {
            $attributes['registrationId'] = $attributes['registrationId'] ?? $registration_id;
        }

        $registrationId = $attributes['registrationId'] ?? null;
        $registrationCode = $attributes['registrationCode'] ?? null;

        $query = QuestionnaireRegistration::with([
            'wizard_definition' => function ($q) {
                $q->withFullDefinition();
            },
            'current_step'
        ]);

        if ($registrationId) {
            $registration = $query->findOrFail($registrationId);
        } else if ($registrationCode) {
            $registration = $query->where('code', $registrationCode)->firstOrFail();
        } else {
            throw new \Exception('Registration ID or code is required');
        }

        // Check if expired
        if ($registration->isExpired()) {
            throw new \Exception('Wizard session has expired');
        }

        return [
            'registration' => $registration,
            'wizard_data' => $registration->wizard_data ?? [],
            'current_step' => $registration->current_step,
            'progress' => $registration->wizard_progress,
            'is_completed' => $registration->wizard_status === QuestionnaireRegistration::STATUS_SUBMITTED,
            'is_editable' => $registration->isEditable(),
        ];
    }

    public function asController($registration_id = null): array
    {
        return parent::asController($registration_id);
    }
}
