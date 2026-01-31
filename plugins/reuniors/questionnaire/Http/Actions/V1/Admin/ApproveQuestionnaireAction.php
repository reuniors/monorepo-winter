<?php namespace Reuniors\Questionnaire\Http\Actions\V1\Admin;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Questionnaire\Models\QuestionnaireRegistration;

/**
 * ApproveQuestionnaireAction
 *
 * Admin-only. Sets registration status to approved.
 */
class ApproveQuestionnaireAction extends BaseAction
{
    public function handle(array $attributes = [], QuestionnaireRegistration $registration = null)
    {
        $registration->approve();

        return $registration->fresh(['wizard_definition']);
    }

    public function asController(QuestionnaireRegistration $registration = null): array
    {
        return parent::asController($registration);
    }
}
