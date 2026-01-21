<?php namespace Reuniors\Questionnaire\Http\Actions\V1\Wizard;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Questionnaire\Models\QuestionnaireRegistration;

/**
 * GetWizardProgressAction
 * 
 * Returns current wizard progress and saved data
 * Used to resume wizard from where user left off
 */
class GetWizardProgressAction extends BaseAction
{
    use AsAction;

    public function handle(array $attributes = [])
    {
        $registrationId = $attributes['registration_id'] ?? null;
        $registrationCode = $attributes['registration_code'] ?? null;

        if (!$registrationId && !$registrationCode) {
            throw new \Exception('Registration ID or code is required');
        }

        $query = QuestionnaireRegistration::with(['wizard_definition', 'current_step']);

        if ($registrationId) {
            $registration = $query->findOrFail($registrationId);
        } else {
            $registration = $query->where('code', $registrationCode)->firstOrFail();
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
            'is_completed' => $registration->wizard_status === 'completed',
        ];
    }
}
