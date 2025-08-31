<?php namespace Reuniors\Knk\Http\ActionsFe\V1\User;

use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Knk\Models\ProfileFollower;
use Auth;

class FeUnfollowProfileAction extends BaseAction
{
    public function rules()
    {
        return [
            'username' => ['required', 'string', 'max:30', 'regex:/^@?[a-zA-Z0-9._]+$/']
        ];
    }

    public function handle(array $attributes = [])
    {
        $currentUser = Auth::getUser();
        
        if (!$currentUser) {
            throw new \Exception('User not authenticated');
        }

        // Get profile by username using FeGetProfileAction
        $getProfileAction = new FeGetProfileAction();
        $profile = $getProfileAction->handle(['username' => $attributes['username']]);

        if (!$profile) {
            throw new \Exception('Profile not found');
        }

        // Check if following
        if (!$profile->isFollowedBy($currentUser->id)) {
            throw new \Exception('Not following this profile');
        }

        // Remove follow relationship
        ProfileFollower::where('follower_user_id', $currentUser->id)
            ->where('profile_id', $profile->id)
            ->delete();

        return [
            'success' => true,
            'message' => 'Successfully unfollowed profile'
        ];
    }
} 