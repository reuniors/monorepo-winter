<?php namespace Reuniors\Questionnaire\Http\Actions\V1\Wizard;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Questionnaire\Models\QuestionnaireRegistration;

/**
 * ListMyWizardRegistrationsAction
 *
 * Returns current user's wizard runs (questionnaire registrations with wizard_definition_id).
 * Max 3 per user for list display. Requires authentication.
 */
class ListMyWizardRegistrationsAction extends BaseAction
{
    use AsAction;

    public const MAX_LIST = 3;

    public function handle(array $attributes = [])
    {
        $user = request()->user();
        if (!$user) {
            throw new \Exception('Authentication required');
        }

        $registrations = QuestionnaireRegistration::query()
            ->where('user_id', $user->id)
            ->whereNotNull('wizard_definition_id')
            ->with('wizard_definition:id,name,slug,type')
            ->orderByDesc('updated_at')
            ->limit(self::MAX_LIST)
            ->get();

        return $registrations->map(function ($reg) {
            return [
                'id' => $reg->id,
                'code' => $reg->code,
                'wizardDefinitionId' => $reg->wizard_definition_id,
                'wizardName' => $reg->wizard_definition?->name ?? '',
                'wizardSlug' => $reg->wizard_definition?->slug ?? '',
                'wizardStatus' => $reg->wizard_status,
                'completedStepsCount' => $reg->completed_steps_count,
                'totalStepsCount' => $reg->total_steps_count,
                'wizardStartedAt' => $reg->wizard_started_at?->toIso8601String(),
                'wizardCompletedAt' => $reg->wizard_completed_at?->toIso8601String(),
                'expiresAt' => $reg->expires_at?->toIso8601String(),
                'updatedAt' => $reg->updated_at?->toIso8601String(),
            ];
        })->values()->all();
    }
}
