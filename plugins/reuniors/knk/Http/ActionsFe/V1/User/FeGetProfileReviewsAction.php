<?php

namespace Reuniors\Knk\Http\ActionsFe\V1\User;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Profile;
use Reuniors\Knk\Classes\Helpers\ProfileUsernameHelper;
use Winter\User\Models\User;
use Auth;
use Reuniors\Knk\Models\LocationRatingHistory;

class FeGetProfileReviewsAction extends BaseAction
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

        $locationRatingHistoryTable = (new LocationRatingHistory())->getTable();

        $query = $profile->location_rating_history()
            ->with([
                'location',
                'comment',
                'location.city',
                'location.cover_image',
                'location.logo'
            ])
            ->selectRaw("ROUND(AVG(grade), 2) as avg_grade")
            ->whereHas('location')
            ->groupBy("location_id", "user_id");

        if (isset($attributes['city_slug'])) {
            $query->whereHas('location.city', function ($q) use ($attributes) {
                $q->where('slug', $attributes['city_slug']);
            });
        }

        return $query->orderBy('created_at', 'desc')->paginate(10);
    }
}