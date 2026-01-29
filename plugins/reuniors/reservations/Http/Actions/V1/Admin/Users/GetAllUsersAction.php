<?php
namespace Reuniors\Reservations\Http\Actions\V1\Admin\Users;

use Reuniors\Base\Http\Actions\BaseAction;
use Winter\User\Models\User;

class GetAllUsersAction extends BaseAction
{
    public function handle(array $attributes = [])
    {
        $search = $attributes['search'] ?? '';
        $perPage = $attributes['perPage'] ?? 20;
        $page = $attributes['page'] ?? 1;
        $groupCode = $attributes['groupCode'] ?? null;
        $sortBy = $attributes['sortBy'] ?? 'created_at';
        $sortDirection = $attributes['sortDirection'] ?? 'desc';

        $query = User::query()
            ->with(['groups'])
            ->withCount(['groups']);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%$search%")
                  ->orWhere('surname', 'like', "%$search%")
                  ->orWhere('email', 'like', "%$search%")
                  ->orWhere('username', 'like', "%$search%");
            });
        }

        if ($groupCode) {
            $query->whereHas('groups', function ($q) use ($groupCode) {
                $q->where('code', $groupCode);
            });
        }

        // Map camelCase to snake_case for database columns
        $columnMap = [
            'name' => 'name',
            'email' => 'email',
            'createdAt' => 'created_at',
            'lastLogin' => 'last_login',
        ];

        $dbColumn = $columnMap[$sortBy] ?? 'created_at';
        $query->orderBy($dbColumn, $sortDirection);

        $users = $query->paginate($perPage, ['*'], 'page', $page);

        return [
            'data' => $users->items(),
            'current_page' => $users->currentPage(),
            'lastPage' => $users->lastPage(),
            'per_page' => $users->perPage(),
            'total' => $users->total(),
        ];
    }
}
