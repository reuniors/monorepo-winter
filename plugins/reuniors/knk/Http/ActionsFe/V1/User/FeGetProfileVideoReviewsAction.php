<?php
namespace Reuniors\Knk\Http\ActionsFe\V1\User;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Profile;
use Reuniors\Knk\Classes\Helpers\ProfileUsernameHelper;
use Winter\User\Models\User;
use Auth;

class FeGetProfileVideoReviewsAction extends BaseAction
{
    public function rules()
    {
        return [
            'username' => ['required', 'string', 'max:30', 'regex:/^@?[a-zA-Z0-9._]+$/'],
            'city_slug' => ['nullable', 'string']
        ];
    }

    public function handle(array $attributes = [])
    {
        $user = Auth::getUser();

        if (!$user) {
            throw new \Exception('User not authenticated');
        }

        $usernameData = ProfileUsernameHelper::processUsername($attributes['username']);
        $platformColumn = ProfileUsernameHelper::getPlatformColumn($usernameData['platform']);

        $profileQuery = Profile::with([
            'video_reviews.location.city',
            'video_reviews.location.cover_image'
        ])->where($platformColumn, $usernameData['username']);

        $profile = $profileQuery->first();

        if (!$profile) {
            throw new \Exception('Profile not found');
        }

        $query = $profile->video_reviews();

        if (isset($attributes['city_slug'])) {
            $query->whereHas('location.city', function ($q) use ($attributes) {
                $q->where('slug', $attributes['city_slug']);
            });
        }

        return $query->orderBy('created_at', 'desc')->paginate(20);
    }
}