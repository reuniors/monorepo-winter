<?php
namespace Reuniors\Knk\Http\ActionsFe\V1\User;

use Reuniors\Knk\Classes\Helpers\ProfileUsernameHelper;
use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Profile;
use Winter\User\Models\User;
use Auth;

class FeGetProfileAction extends BaseAction
{
    public function rules()
    {
        return [
            'username' => ['nullable', 'string', 'max:30', 'regex:/^@?[a-zA-Z0-9._]+$/']
        ];
    }

    public function handle(array $attributes = [])
    {
        $user = Auth::getUser();

        if (!$user) {
            throw new \Exception('User not authenticated');
        }

        // If username is provided, search by it
        if (isset($attributes['username'])) {
            $usernameData = ProfileUsernameHelper::processUsername($attributes['username']);
            $platformColumn = ProfileUsernameHelper::getPlatformColumn($usernameData['platform']);

            $profileQuery = Profile::with([
                'favorite_locations',
                'dietary_tags',
                'avatar',
                'user',
                'followers.follower:user_id'
            ])->where($platformColumn, $usernameData['username']);

            return $profileQuery->first();
        }

        // If no username provided, get current user's profile
        $profile = Profile::with([
            'favorite_locations',
            'dietary_tags',
            'avatar',
            'user',
            'followers.follower:user_id'
        ])->where('user_id', $user->id)->first();

        if (!$profile) {
            $profile = Profile::create([
                'user_id' => $user->id
            ]);
        }

        return $profile;
    }
}
