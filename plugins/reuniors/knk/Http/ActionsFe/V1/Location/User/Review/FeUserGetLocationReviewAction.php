<?php namespace Reuniors\Knk\Http\ActionsFe\V1\Location\User\Review;

use Auth;
use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Location;
use Reuniors\Knk\Models\LocationRatingHistory;
use Reuniors\Knk\Models\UserBadgeHistory;

class FeUserGetLocationReviewAction extends BaseAction
{
    public function rules()
    {
        return [
            'citySlug' => ['string', 'required'],
            'slug' => ['string', 'required'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $user = Auth::getUser();
        $citySlug = $attributes['citySlug'];
        $slug = $attributes['slug'];

        $location = Location
            ::getFE([
                'citySlug' => $citySlug,
                'slug' => $slug,
            ])
            ->firstOrFail();

        $userLocationComment = $location->comments()
            ->where('user_id', $user->id)
            ->first();

        $userLocationRatings = LocationRatingHistory
            ::where('user_id', $user->id)
            ->where('location_id', $location->id)
            ->with('location_rating')
            ->get();

        $userLocationBadges = UserBadgeHistory
            ::where('user_id', $user->id)
            ->whereHas('location_badge_history', function ($query) use ($location) {
                $query->where('location_id', $location->id);
            })
            ->with('location_badge_history')
            ->get();

        return [
            'comment' => $userLocationComment,
            'ratings' => $userLocationRatings,
            'userBadges' => $userLocationBadges,
        ];
    }
}
