<?php namespace Reuniors\Questionnaire\Http\Actions\V1\Wizard;

use Illuminate\Support\Facades\Schema;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Questionnaire\Models\QuestionnaireRegistration;
use Auth;

/**
 * ListMyWizardRegistrationsAction
 *
 * Returns current user's wizard runs (questionnaire registrations with wizard_definition_id).
 * Max 3 per user for list display. Requires authentication.
 */
class ListMyWizardRegistrationsAction extends BaseAction
{
    public const MAX_LIST = 3;

    public function rules(): array
    {
        return [];
    }

    public function handle(array $attributes = [])
    {
        $user = request()->user() ?? Auth::getUser(); // API (Sanctum) or web session
        if (!$user) {
            throw new \Exception('Authentication required');
        }

        $table = (new QuestionnaireRegistration())->getTable();
        if (!Schema::hasColumn($table, 'user_id')) {
            return collect([]);
        }

        return QuestionnaireRegistration::query()
            ->where('user_id', $user->id)
            ->whereNotNull('wizard_definition_id')
            ->with('wizard_definition:id,name,slug,type')
            ->orderByDesc('updated_at')
            ->limit(self::MAX_LIST)
            ->get();
    }
}
