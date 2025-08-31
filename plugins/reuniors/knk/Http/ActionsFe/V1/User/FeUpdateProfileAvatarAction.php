<?php
namespace Reuniors\Knk\Http\ActionsFe\V1\User;

use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Profile;
use Auth;
use Input;

class FeUpdateProfileAvatarAction extends BaseAction
{
    public function rules()
    {
        return [
            'file' => ['nullable', 'file', 'image', 'max:10240']
        ];
    }

    public function handle(array $attributes = [])
    {
        $user = Auth::getUser();

        if (!$user) {
            throw new \Exception('User not authenticated');
        }

        // Get or create profile
        $profile = Profile::where('user_id', $user->id)->first();
        if (!$profile) {
            $profile = Profile::create([
                'user_id' => $user->id
            ]);
        }

        // Handle avatar operations
        if (!Input::hasFile('file')) {
            // Delete existing avatar if it exists
            if ($profile->avatar) {
                $profile->avatar->delete();
                $profile->avatar = null;
                $profile->save();
            }
        } elseif (Input::hasFile('file')) {
            // Delete existing avatar if it exists
            if ($profile->avatar) {
                $profile->avatar->delete();
            }

            // Upload new avatar
            $profile->avatar = Input::file('file');
            $profile->save();
        }

        return $profile->avatar;
    }
}
