<?php namespace Reuniors\Questionnaire\Http\Actions\V1\Admin;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Questionnaire\Models\QuestionnaireRegistration;

/**
 * RejectQuestionnaireAction
 *
 * Admin-only. Sets registration status to rejected.
 */
class RejectQuestionnaireAction extends BaseAction
{
    public function rules(): array
    {
        return [
            'reason' => ['nullable', 'string'],
        ];
    }

    public function handle(array $attributes = [], QuestionnaireRegistration $registration = null)
    {
        $reason = $attributes['reason'] ?? null;
        $registration->reject(is_string($reason) ? trim($reason) : null);

        return $registration->fresh(['wizard_definition']);
    }

    public function asController(QuestionnaireRegistration $registration = null): array
    {
        return parent::asController($registration);
    }
}
