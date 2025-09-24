<?php
namespace Reuniors\Reservations\Http\Actions\V1\User;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Base\Http\Actions\BaseAction;
use Winter\User\Models\User;

class UserListAction extends BaseAction
{
    use AsAction;

    public function rules()
    {
        return [
            'search' => ['nullable', 'string'],
            'perPage' => ['nullable', 'integer', 'min:1', 'max:50'],
            'page' => ['nullable', 'integer', 'min:1'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $search = $attributes['search'] ?? '';
        $perPage = $attributes['perPage'] ?? 10;
        $page = $attributes['page'] ?? 1;

        $query = User::query();
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('email', 'like', "%$search%")
                  ->orWhere('name', 'like', "%$search%")
                  ->orWhere('surname', 'like', "%$search%")
                  ->orWhere('username', 'like', "%$search%")
                  ;
            });
        }
        $query->orderBy('email');
        $users = $query->select(['id', 'email', 'name', 'surname'])->paginate($perPage, ['*'], 'page', $page);
        return $users;
    }
} 