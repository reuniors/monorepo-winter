<?php namespace Reuniors\Knk\Http\ActionsFe\V1\Location\User\Tag;

use Reuniors\Knk\Http\Actions\BaseAction;
use Auth;
use Reuniors\Knk\Models\Location;
use Reuniors\Knk\Models\UserBadgeHistory;

class FeUserGetLocationBadgesAction extends BaseAction
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
        $slug = $attributes['slug'];
        $citySlug = $attributes['citySlug'];
        $userData = Auth::getUser();

        $location = Location
            ::getFE([
                'citySlug' => $citySlug,
                'slug' => $slug,
            ])
            ->firstOrFail();

        return UserBadgeHistory::query()
            ->where('user_id', $userData->id)
            ->whereHas('location_badge_history', function($query) use ($location) {
                $query->where('location_id', $location->id);
            })
            ->with('location_badge_history')
            ->get();
    }
}
