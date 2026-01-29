<?php
namespace Reuniors\Reservations\Http\Actions\V1\Admin\Wizards;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Questionnaire\Models\WizardDefinition;

/**
 * GetAllWizardsAction
 * 
 * Returns paginated list of ALL wizard definitions
 * Admin-only endpoint for managing platform-wide wizards
 */
class GetAllWizardsAction extends BaseAction
{
    public function handle(array $attributes = [])
    {
        $search = $attributes['search'] ?? '';
        $perPage = $attributes['perPage'] ?? 20;
        $page = $attributes['page'] ?? 1;
        $type = $attributes['type'] ?? null;
        $isActive = isset($attributes['isActive']) 
            ? filter_var($attributes['isActive'], FILTER_VALIDATE_BOOLEAN) 
            : null;
        $requiresApproval = isset($attributes['requiresApproval']) 
            ? filter_var($attributes['requiresApproval'], FILTER_VALIDATE_BOOLEAN) 
            : null;
        $sortBy = $attributes['sortBy'] ?? 'created_at';
        $sortDirection = $attributes['sortDirection'] ?? 'desc';

        $query = WizardDefinition::query()
            ->withCount(['steps', 'registrations']);

        // Search filter
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%$search%")
                  ->orWhere('slug', 'like', "%$search%")
                  ->orWhere('description', 'like', "%$search%");
            });
        }

        // Type filter
        if ($type) {
            $query->where('type', $type);
        }

        // Active filter
        if ($isActive !== null) {
            $query->where('is_active', $isActive);
        }

        // Requires approval filter
        if ($requiresApproval !== null) {
            $query->where('requires_approval', $requiresApproval);
        }

        // Map camelCase to snake_case for database columns
        $columnMap = [
            'name' => 'name',
            'slug' => 'slug',
            'type' => 'type',
            'isActive' => 'is_active',
            'requiresApproval' => 'requires_approval',
            'createdAt' => 'created_at',
        ];

        $dbColumn = $columnMap[$sortBy] ?? 'created_at';
        $query->orderBy($dbColumn, $sortDirection);

        $wizards = $query->paginate($perPage, ['*'], 'page', $page);

        return [
            'data' => collect($wizards->items())->map(function ($wizard) {
                return [
                    'id' => $wizard->id,
                    'slug' => $wizard->slug,
                    'name' => $wizard->name,
                    'description' => $wizard->description,
                    'type' => $wizard->type,
                    'isActive' => $wizard->is_active,
                    'requiresAuth' => $wizard->requires_auth,
                    'requiresApproval' => $wizard->requires_approval,
                    'autoCreateEntities' => $wizard->auto_create_entities,
                    'stepsCount' => $wizard->steps_count ?? 0,
                    'submissionsCount' => $wizard->registrations_count ?? 0,
                    'createdAt' => $wizard->created_at?->toIso8601String(),
                    'updatedAt' => $wizard->updated_at?->toIso8601String(),
                ];
            }),
            'current_page' => $wizards->currentPage(),
            'lastPage' => $wizards->lastPage(),
            'per_page' => $wizards->perPage(),
            'total' => $wizards->total(),
        ];
    }
}
