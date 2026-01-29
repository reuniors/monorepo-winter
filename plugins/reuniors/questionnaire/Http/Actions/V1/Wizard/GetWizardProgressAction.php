<?php namespace Reuniors\Questionnaire\Http\Actions\V1\Wizard;

use Illuminate\Support\Facades\Validator;
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
            'registration_id' => ['nullable', 'integer'],
            'registrationId' => ['nullable', 'integer'],
            'registration_code' => ['nullable', 'string'],
            'registrationCode' => ['nullable', 'string'],
        ];
    }

    public function handle(array $attributes = [])
    {
        Validator::make($attributes, $this->rules())->validate();

        $registrationId = $attributes['registration_id'] ?? $attributes['registrationId'] ?? null;
        $registrationCode = $attributes['registration_code'] ?? $attributes['registrationCode'] ?? null;

        $v = Validator::make($attributes, []);
        $v->after(function ($validator) use ($registrationId, $registrationCode) {
            if (!$registrationId && !$registrationCode) {
                $validator->errors()->add('registration_id', __('Registration ID or code is required'));
            }
        });
        $v->validate();

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
