<?php namespace Reuniors\Knk\Http\ActionsFe\V1\User;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Profile;
use Reuniors\Knk\Models\ProfileFollower;
use Auth;

class FeFollowProfileAction extends BaseAction
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

        // Prevent following own profile
        if ($profile->user_id === $currentUser->id) {
            throw new \Exception('Cannot follow your own profile');
        }

        // Check if already following
        if ($profile->isFollowedBy($currentUser->id)) {
            throw new \Exception('Already following this profile');
        }

        // Create follow relationship
        ProfileFollower::create([
            'follower_user_id' => $currentUser->id,
            'profile_id' => $profile->id
        ]);

        return [
            'success' => true,
            'message' => 'Successfully followed profile'
        ];
    }
} 