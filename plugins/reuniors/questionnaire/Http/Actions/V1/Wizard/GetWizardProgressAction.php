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
            'registrationId' => ['nullable', 'integer'],
            'registrationCode' => ['nullable', 'string'],
        ];
    }

    public function handle(array $attributes = [])
    {
        // For GET /wizard/progress/{registration_id}: merge route param (snake_case) into attributes as camelCase
        if (request()->route('registration_id')) {
            $attributes['registrationId'] = $attributes['registrationId'] ?? request()->route('registration_id');
        }

        Validator::make($attributes, $this->rules())->validate();

        $registrationId = $attributes['registrationId'] ?? null;
        $registrationCode = $attributes['registrationCode'] ?? null;

        $v = Validator::make($attributes, []);
        $v->after(function ($validator) use ($registrationId, $registrationCode) {
            if (!$registrationId && !$registrationCode) {
                $validator->errors()->add('registrationId', __('Registration ID or code is required'));
            }
        });
        $v->validate();

        $query = QuestionnaireRegistration::with([
            'wizard_definition' => function ($q) {
                $q->withFullDefinition();
            },
            'current_step'
        ]);

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
            'is_completed' => $registration->wizard_status === QuestionnaireRegistration::STATUS_SUBMITTED,
            'is_editable' => $registration->isEditable(),
        ];
    }
}
