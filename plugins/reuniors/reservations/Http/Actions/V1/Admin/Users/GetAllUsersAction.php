<?php
namespace Reuniors\Reservations\Http\Actions\V1\Admin\Users;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Base\Http\Actions\BaseAction;
use Winter\User\Models\User;

class GetAllUsersAction extends BaseAction
{
    use AsAction;

    public function handle(array $attributes = [])
    {
        $search = $attributes['search'] ?? '';
        $perPage = $attributes['perPage'] ?? 20;
        $page = $attributes['page'] ?? 1;
        $groupCode = $attributes['groupCode'] ?? null;

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

        $query->orderBy('created_at', 'desc');
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
