<?php namespace Reuniors\Knk\Http\ActionsFe\V1\Location\User\Tag;

use Auth;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Location;
use Reuniors\Knk\Models\LocationBadgeHistory;
use Reuniors\Knk\Models\LocationRating;
use Reuniors\Knk\Models\LocationRatingHistory;
use Reuniors\Base\Models\Tag;
use Reuniors\Base\Models\TagGroup;
use Reuniors\Knk\Models\UserBadgeHistory;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class FeUserSetLocationBadgeAction extends BaseAction
{
    public function rules()
    {
        return [
            'citySlug' => ['string', 'required'],
            'slug' => ['string', 'required'],
            'tagId' => ['required', 'numeric'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $slug = $attributes['slug'];
        $citySlug = $attributes['citySlug'];
        $tagId = $attributes['tagId'];
        $userData = Auth::getUser();

        $location = Location
            ::getFE([
                'citySlug' => $citySlug,
                'slug' => $slug,
            ])
            ->firstOrFail();

        $tag = Tag
            ::where('id', $tagId)
            ->with('tag_group')
            ->firstOrFail();

        if ($tag->tag_group_id === null) {
            throw new BadRequestHttpException('Badge is invalid');
        }

        $locationBadgeHistory = LocationBadgeHistory::query()
            ->where('location_id', $location->id)
            ->where('tag_id', $tag->id)
            ->first();

        if (!$locationBadgeHistory) {
            $locationBadgeHistory = LocationBadgeHistory::create([
                'location_id' => $location->id,
                'tag_id' => $tag->id,
                'tag_group_id' => $tag->tag_group_id,
                'selected_count' => 0,
            ]);
        }

        $tagGroup = $tag->tag_group;
        $tagGroupCombineType = $tagGroup->combine_type ?? null;
        $existingUserBadgeHistory = $locationBadgeHistory->users_badges_history()
            ->where('user_id', $userData->id)
            ->first();

        if ($tagGroupCombineType === TagGroup::COMBINE_TYPES_EXCLUSIVELY_VAL) {
            $existingOldBadges = UserBadgeHistory::query()
                ->whereHas('location_badge_history', function ($query) use (
                    $locationBadgeHistory, $existingUserBadgeHistory
                ) {
                    $query
                        ->where('location_id', $locationBadgeHistory->location_id)
                        ->where('tag_group_id', $locationBadgeHistory->tag_group_id);
                })
                ->get();
            $existingOldBadges->each(function ($existingBadge) {
                $existingBadge->delete();
            });
        }

        if ($existingUserBadgeHistory) {
            $existingUserBadgeHistory->delete();
        } else {
            UserBadgeHistory::create([
                'location_badge_history_id' => $locationBadgeHistory->id,
                'user_id' => $userData->id,
            ]);
        }

        return true;
    }
}
