<?php
namespace Reuniors\Knk\Http\ActionsFe\V1\Location;

use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Location;
use Reuniors\Knk\Models\LocationLikeHistory;
use Reuniors\Knk\Models\Profile;
use Auth;

class FeGetFollowersLikedLocationsAction extends BaseAction
{
    public function rules()
    {
        return [
            'citySlug' => ['string', 'required'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $citySlug = $attributes['citySlug'];
        $user = Auth::getUser();

        if (!$user) {
            throw new \Exception('User not authenticated');
        }

        $followersIds = Profile::query()
            ->whereHas('followers', function ($query) use ($user) {
                $query->where('follower_user_id', $user->id);
            })
            ->pluck('user_id');

        if ($followersIds->isEmpty()) {
            return [];
        }

        $locations = Location::query()
            ->whereHas('city', function ($query) use ($citySlug) {
                $query->where('slug', $citySlug);
            })
            ->whereHas('likes_history', function ($query) use ($followersIds) {
                $query->whereIn('user_id', $followersIds);
            })
            ->with(['cover_image'])
            ->get();

        return $locations;
    }
}
