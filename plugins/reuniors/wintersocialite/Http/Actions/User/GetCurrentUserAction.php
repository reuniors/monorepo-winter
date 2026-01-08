<?php namespace reuniors\wintersocialite\Http\Actions\User;

use Event;
use Reuniors\Base\Http\Actions\BaseAction;
use Auth;
use Winter\User\Models\User as UserModel;

class GetCurrentUserAction extends BaseAction
{
    public function handle(array $attributes = []): array
    {
        $user = Auth::getUser();
        
        if (!$user instanceof UserModel) {
            throw new \Exception('User not authenticated');
        }

        // Load groups if not already loaded
        if (!$user->relationLoaded('groups')) {
            $user->load(['groups' => function ($query) {
                $query->select('name', 'code');
            }]);
        }
        
        // Fire event to allow other plugins to filter groups (e.g., by location)
        // Event listeners can modify $user->groups collection
        Event::fire('winter.user.groups.before.send', [$user]);
        
        if ($user->groups && method_exists($user->groups, 'makeHidden')) {
            $user->groups->makeHidden('pivot');
        }
        
        // Return only data - BaseAction::asController() will add success and wrap in data
        return [
            'user' => $user->only(['name', 'email', 'groups', 'phone', 'id']),
        ];
    }
}

