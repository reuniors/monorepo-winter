<?php namespace Reuniors\Questionnaire\Http\Actions\V1\Admin;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Questionnaire\Models\QuestionnaireRegistration;

/**
 * GetQuestionnaireDetailsAction
 *
 * Admin-only. Returns a single questionnaire registration with full wizard definition
 * and wizard_data for view/preview. Caller must ensure admin middleware is applied.
 */
class GetQuestionnaireDetailsAction extends BaseAction
{
    public function handle(array $attributes = [], QuestionnaireRegistration $registration = null)
    {
        $registration->load([
            'wizard_definition' => function ($q) {
                $q->withFullDefinition();
            },
            'current_step'
        ]);

        return [
            'registration' => $registration,
            'wizard_data' => $registration->wizard_data ?? [],
            'current_step' => $registration->current_step,
            'progress' => $registration->wizard_progress,
            'is_completed' => $registration->wizard_status === QuestionnaireRegistration::STATUS_SUBMITTED,
            'is_editable' => $registration->isEditable(),
        ];
    }

    public function asController(QuestionnaireRegistration $registration = null): array
    {
        return parent::asController($registration);
    }
}
