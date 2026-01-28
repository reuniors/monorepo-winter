<?php
namespace Reuniors\Reservations\Http\Actions\V1\Admin\Questionnaires;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Questionnaire\Models\QuestionnaireRegistration;

/**
 * GetAllQuestionnairesAction
 * 
 * Returns paginated list of ALL questionnaire registrations
 * Admin-only endpoint for managing platform-wide questionnaire submissions
 */
class GetAllQuestionnairesAction extends BaseAction
{
    use AsAction;

    public function handle(array $attributes = [])
    {
        $search = $attributes['search'] ?? '';
        $perPage = $attributes['perPage'] ?? 20;
        $page = $attributes['page'] ?? 1;
        $status = $attributes['status'] ?? null;
        $wizardDefinitionId = $attributes['wizardDefinitionId'] ?? null;
        $sortBy = $attributes['sortBy'] ?? 'created_at';
        $sortDirection = $attributes['sortDirection'] ?? 'desc';

        $query = QuestionnaireRegistration::query()
            ->with(['wizard_definition']);

        // Search filter
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('code', 'like', "%$search%")
                  ->orWhereHas('wizard_definition', function ($wizardQuery) use ($search) {
                      $wizardQuery->where('name', 'like', "%$search%")
                                  ->orWhere('slug', 'like', "%$search%");
                  });
            });
        }

        // Status filter (using wizard_status column)
        if ($status) {
            $query->where('wizard_status', $status);
        }

        // Wizard definition filter
        if ($wizardDefinitionId) {
            $query->where('wizard_definition_id', $wizardDefinitionId);
        }

        // Only show wizard-related questionnaires
        $query->whereNotNull('wizard_definition_id');

        // Map camelCase to snake_case for database columns
        $columnMap = [
            'code' => 'code',
            'status' => 'wizard_status',
            'submittedAt' => 'wizard_completed_at',
            'createdAt' => 'created_at',
        ];

        $dbColumn = $columnMap[$sortBy] ?? 'created_at';
        $query->orderBy($dbColumn, $sortDirection);

        $questionnaires = $query->paginate($perPage, ['*'], 'page', $page);

        return [
            'data' => collect($questionnaires->items())->map(function ($questionnaire) {
                // Use existing progress calculation from model
                $progress = $questionnaire->wizard_progress ?? null;

                return [
                    'id' => $questionnaire->id,
                    'code' => $questionnaire->code,
                    'wizardDefinitionId' => $questionnaire->wizard_definition_id,
                    'wizardDefinition' => $questionnaire->wizard_definition ? [
                        'id' => $questionnaire->wizard_definition->id,
                        'name' => $questionnaire->wizard_definition->name,
                        'slug' => $questionnaire->wizard_definition->slug,
                    ] : null,
                    'userId' => null, // User info not stored directly
                    'user' => null, // User info not stored directly
                    'status' => $questionnaire->wizard_status ?? 'draft',
                    'currentStepId' => $questionnaire->current_step_id,
                    'wizardCompleted' => ($questionnaire->wizard_status === 'completed'),
                    'wizardProgress' => $progress,
                    'submittedAt' => $questionnaire->wizard_completed_at?->toIso8601String(),
                    'createdAt' => $questionnaire->created_at?->toIso8601String(),
                    'updatedAt' => $questionnaire->updated_at?->toIso8601String(),
                ];
            }),
            'current_page' => $questionnaires->currentPage(),
            'lastPage' => $questionnaires->lastPage(),
            'per_page' => $questionnaires->perPage(),
            'total' => $questionnaires->total(),
        ];
    }
}
