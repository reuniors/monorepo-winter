<?php
namespace Reuniors\Knk\Http\ActionsFe\V1\Location\Comment;

use Illuminate\Support\Facades\DB;
use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Location;
use Reuniors\Knk\Models\LocationRatingHistory;
use Reuniors\Knk\Models\UserBadgeHistory;

class FeUserGetLocationCommentsAction extends BaseAction
{
    public function rules()
    {
        return [
            'citySlug' => ['string', 'required'],
            'slug' => ['string', 'required'],
            'perPage' => ['integer'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $citySlug = $attributes['citySlug'];
        $slug = $attributes['slug'];
        $perPage = $attributes['perPage'] ?? 15;

        $location = Location::getFE([
            'citySlug' => $citySlug,
            'slug' => $slug,
        ])
            ->firstOrFail();

        $locationComments = $location
            ->comments()
            ->with('profile.user', function ($query) {
                $query->select('id', 'name', 'surname');
            })
            ->paginate($perPage);
        $usersIds = $locationComments->pluck('user_id')->toArray();

        if (!empty($usersIds)) {
            $usersIds = array_unique($usersIds);
            $locationRatingHistory = LocationRatingHistory::select('user_id', DB::raw('ROUND(AVG(grade), 1) as avg_grade'))
                ->where('location_id', $location->id)
                ->whereIn('user_id', $usersIds)
                ->groupBy('user_id')
                ->get()
                ->keyBy('user_id');
            $userBadgeHistory = UserBadgeHistory::query()
                ->whereHas('location_badge_history', function ($query) use ($location) {
                    $query->where('location_id', $location->id);
                })
                ->with('location_badge_history.tag')
                ->whereIn('user_id', $usersIds)
                ->get();
            $locationComments->each(function ($comment) use ($locationRatingHistory, $userBadgeHistory) {
                $comment->avg_grade = $locationRatingHistory[$comment->user_id]->avg_grade ?? null;
                $comment->badges_ids = $userBadgeHistory->where('user_id', $comment->user_id)->pluck('location_badge_history.tag.id')->toArray();
            });
        }

        return $locationComments;
        //            ->with('location_rating_history', function ($query) use ($location) {
        //                $query
        //                    ->select('location_rating_id', 'user_id', DB::raw('ROUND(AVG(grade), 1) as avg_grade'))
        //                    ->where('location_id', $location->id);
        //            })
        //            ->with('user_badge_history', function ($query) use ($location) {
        //                $query
        //                    ->select('location_badge_history_id', 'user_id')
        //                    ->whereHas('location_badge_history', function ($query) use ($location) {
        //                        $query->where('location_id', $location->id);
        //                    });
        //            })
    }
}
