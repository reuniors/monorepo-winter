<?php namespace Reuniors\Questionnaire\Http\Actions\V1\Wizard;

use Carbon\Carbon;
use Illuminate\Validation\ValidationException;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Questionnaire\Models\QuestionnaireRegistration;
use Reuniors\Questionnaire\Models\WizardDefinition;
use Auth;

/**
 * StartWizardAction
 *
 * Initializes a new wizard session.
 * Creates a QuestionnaireRegistration record to track progress.
 */
class StartWizardAction extends BaseAction
{
    public function rules(): array
    {
        return [
            'wizardSlug' => ['required', 'string'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $wizardSlug = $attributes['wizardSlug'];
        $user = Auth::getUser();

        $wizard = WizardDefinition::query()
            ->where('slug', $wizardSlug)
            ->where('is_active', true)
            ->withFullDefinition()
            ->firstOrFail();

        // Check if user authentication is required
        if ($wizard->requires_auth && !$user) {
            throw new \Exception('Authentication required for this wizard');
        }

        // Max 3 registrations per user per wizard
        $maxPerWizard = 3;
        $count = QuestionnaireRegistration::query()
            ->where('wizard_definition_id', $wizard->id)
            ->where('user_id', $user?->id)
            ->whereNull('deleted_at')
            ->count();

        if ($count >= $maxPerWizard) {
            throw ValidationException::withMessages([
                'limit' => [__('Maksimalan broj wizarda (3) je dostignut.')],
            ]);
        }

        // Check if user already has a draft for this wizard - return existing draft instead of creating new
        $existingDraft = QuestionnaireRegistration::query()
            ->where('wizard_definition_id', $wizard->id)
            ->where('wizard_status', QuestionnaireRegistration::STATUS_DRAFT)
            ->where('user_id', $user?->id)
            ->whereNull('deleted_at')
            ->first();

        if ($existingDraft) {
            // Return existing draft registration
            return [
                'registration_id' => $existingDraft->id,
                'registration_code' => $existingDraft->code,
                'wizard' => $wizard,
                'expires_at' => $existingDraft->expires_at->toIso8601String(),
            ];
        }

        // Create new wizard session
        $registration = new QuestionnaireRegistration();
        $registration->title = $wizard->name ?? $wizardSlug;
        $registration->user_id = $user?->id;
        $registration->wizard_definition_id = $wizard->id;
        $registration->wizard_status = QuestionnaireRegistration::STATUS_DRAFT;
        $registration->total_steps_count = $wizard->steps->count();
        $registration->completed_steps_count = 0;
        $registration->wizard_data = [];

        // Set expiration (30 days from now)
        $registration->expires_at = Carbon::now()->addDays(30);

        $registration->save();

        return [
            'registration_id' => $registration->id,
            'registration_code' => $registration->code,
            'wizard' => $wizard,
            'expires_at' => $registration->expires_at->toIso8601String(),
        ];
    }
}
