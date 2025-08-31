<?php

namespace Reuniors\Knk\Http\ActionsFe\V1\User;

use Reuniors\Knk\Classes\Helpers\ProfileUsernameHelper;
use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Profile;
use Winter\User\Models\User;
use Auth;

class FeGetProfileLikesAction extends BaseAction
{
    public function rules()
    {
        return [
            'username' => ['string', 'max:30', 'regex:/^@?[a-zA-Z0-9._]+$/'],
            'city_slug' => ['nullable', 'string']
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

        $query = $profile->favorite_locations()->with([
            'location.city',
            'location.cover_image',
            'location.logo'
        ]);

        if (isset($attributes['city_slug'])) {
            $query->whereHas('city', function ($q) use ($attributes) {
                $q->where('slug', $attributes['city_slug']);
            });
        }

        $locationFavorites = $query->orderBy('name')->whereHas('location', function ($q) {
            $q->where('active', 1);
        })->paginate(20);

        $locationFavorites->getCollection()->transform(function ($like) {
            return $like->location;
        });

        return $locationFavorites;
    }
}
