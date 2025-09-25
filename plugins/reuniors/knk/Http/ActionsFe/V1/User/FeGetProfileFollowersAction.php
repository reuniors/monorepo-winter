<?php

namespace Reuniors\Knk\Http\ActionsFe\V1\User;

use Reuniors\Knk\Classes\Helpers\ProfileUsernameHelper;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Profile;
use Winter\User\Models\User;
use Auth;

class FeGetProfileFollowersAction extends BaseAction
{
    public function rules()
    {
        return [
            'username' => ['string', 'max:30', 'regex:/^@?[a-zA-Z0-9._]+$/']
        ];
    }

    public function handle(array $attributes = [])
    {
        $user = Auth::getUser();

        if (!$user) {
            throw new \Exception('User not authenticated');
        }

        if (isset($attributes['username'])) {
            $usernameData = ProfileUsernameHelper::processUsername($attributes['username']);
            $platformColumn = ProfileUsernameHelper::getPlatformColumn($usernameData['platform']);

            $profileQuery = Profile::where($platformColumn, $usernameData['username']);

            $profile = $profileQuery->first();

            if (!$profile) {
                throw new \Exception('Profile not found');
            }
        } else {
            $profile = Profile::where('user_id', $user->id)->first();

            if (!$profile) {
                $profile = Profile::create([
                    'user_id' => $user->id
                ]);
            }
        }

        $query = $profile->followers();

        return $query
            ->orderBy('created_at', 'desc')
            ->with([
                'follower.avatar',
                'follower.user'
            ])
            ->paginate(20);
    }
}
