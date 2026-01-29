<?php
namespace Reuniors\Reservations\Http\Actions\V1\Admin\Users;

use Reuniors\Base\Http\Actions\BaseAction;
use Winter\User\Models\User;

class GetUserDetailsAction extends BaseAction
{
    public function handle(array $attributes = [])
    {
        $id = $attributes['id'] ?? null;

        if (!$id) {
            throw new \Exception('User ID is required');
        }

        $user = User::query()
            ->with(['groups', 'avatar'])
            ->findOrFail($id);

        return $user;
    }
}
