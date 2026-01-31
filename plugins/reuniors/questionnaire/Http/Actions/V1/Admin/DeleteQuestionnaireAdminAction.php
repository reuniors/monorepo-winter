<?php namespace Reuniors\Questionnaire\Http\Actions\V1\Admin;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Questionnaire\Models\QuestionnaireRegistration;

/**
 * DeleteQuestionnaireAdminAction
 *
 * Admin-only. Soft-deletes a questionnaire registration.
 */
class DeleteQuestionnaireAdminAction extends BaseAction
{
    public function handle(array $attributes = [], QuestionnaireRegistration $registration = null)
    {
        $registration->delete();

        return null;
    }

    public function asController(QuestionnaireRegistration $registration = null): array
    {
        return parent::asController($registration);
    }
}
