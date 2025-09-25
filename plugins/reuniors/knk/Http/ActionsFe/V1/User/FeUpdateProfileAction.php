<?php namespace Reuniors\Knk\Http\ActionsFe\V1\User;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Profile;
use Winter\User\Models\User;
use Auth;
use Input;
use Validator;

class FeUpdateProfileAction extends BaseAction
{
    public function rules()
    {
        return [
            'first_name' => 'nullable|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'nickname' => 'nullable|string|max:255',
            'city_id' => 'nullable|integer',
            'bio' => 'nullable|string|max:1000',
            'instagram_username' => 'nullable|string|max:255',
            'tiktok_username' => 'nullable|string|max:255',
            'youtube_channel' => 'nullable|string|max:255',
            'food_categories' => 'nullable|array',
            'food_categories.*' => 'exists:reuniors_knk_food_categories,id',
            'favorite_locations' => 'nullable|array',
            'favorite_locations.*' => 'exists:reuniors_knk_locations,id',
            'dietary_tags' => 'nullable|array',
            'dietary_tags.*' => 'exists:reuniors_knk_dietary_tags,id',
            'avatar' => 'nullable|file|image|max:10240'
        ];
    }

    public function handle(array $attributes = [])
    {
        $user = Auth::getUser();
        
        if (!$user) {
            throw new \Exception('User not authenticated');
        }

        // Map frontend fields to user model fields
        $userFields = [];
        if (isset($attributes['first_name'])) {
            $userFields['name'] = $attributes['first_name'];
        }
        if (isset($attributes['last_name'])) {
            $userFields['surname'] = $attributes['last_name'];
        }
        if (isset($attributes['nickname'])) {
            $userFields['nickname'] = $attributes['nickname'];
        }
        if (isset($attributes['city_id'])) {
            $userFields['city_id'] = $attributes['city_id'];
        }

        if (!empty($userFields)) {
            $user->fill($userFields);
            $user->save();
        }

        // Get or create profile
        $profile = Profile::where('user_id', $user->id)->first();
        if (!$profile) {
            $profile = Profile::create([
                'user_id' => $user->id
            ]);
        }

        // Update profile fields
        $profileFields = array_intersect_key($attributes, array_flip([
            'bio',
            'instagram_username',
            'tiktok_username',
            'youtube_channel'
        ]));

        if (!empty($profileFields)) {
            $profile->fill($profileFields);
            $profile->save();
        }

        // Handle relationships
        if (isset($attributes['food_categories'])) {
            $profile->food_categories()->sync($attributes['food_categories']);
        }

        if (isset($attributes['favorite_locations'])) {
            $profile->favorite_locations()->sync($attributes['favorite_locations']);
        }

        if (isset($attributes['dietary_tags'])) {
            $profile->dietary_tags()->sync($attributes['dietary_tags']);
        }

        // Handle avatar upload
        if (Input::hasFile('avatar')) {
            $profile->avatar = Input::file('avatar');
            $profile->save();
        }

        return $profile->fresh(['user', 'food_categories', 'favorite_locations', 'dietary_tags', 'avatar']);
    }
} 