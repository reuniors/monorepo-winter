<?php namespace Reuniors\Questionnaire\Http\Actions\V1\Admin;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Questionnaire\Models\QuestionnaireRegistration;

/**
 * ReturnWizardForEditAction
 *
 * Admin-only. Sets registration status to returned_for_edit so the user can edit the wizard again.
 * Caller must ensure admin middleware is applied on the route.
 */
class ReturnWizardForEditAction extends BaseAction
{
    public function rules(): array
    {
        return [
            'id' => ['required', 'integer'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $id = $attributes['id'] ?? request()->route('id');

        $registration = QuestionnaireRegistration::query()
            ->whereNotNull('wizard_definition_id')
            ->findOrFail($id);

        $registration->returnForEdit();

        return $registration->fresh(['wizard_definition']);
    }
}
