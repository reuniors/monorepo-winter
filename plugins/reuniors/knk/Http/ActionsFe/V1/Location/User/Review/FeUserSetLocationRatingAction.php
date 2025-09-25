<?php namespace Reuniors\Knk\Http\ActionsFe\V1\Location\User\Review;

use Auth;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Http\ActionsFe\V1\Location\User\Comment\FeUserSetLocationCommentAction;
use Reuniors\Knk\Models\Location;
use Reuniors\Knk\Models\LocationRating;
use Reuniors\Knk\Models\LocationRatingHistory;

class FeUserSetLocationRatingAction extends BaseAction
{
    public function rules()
    {
        return [
            'citySlug' => ['string', 'required'],
            'slug' => ['string', 'required'],
            'grade' => ['required', 'numeric', 'min:5', 'max:10'],
            'ratingType' => ['string', 'in:general,ambiance,atmosphere,food,hygiene,pricing,service'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $slug = $attributes['slug'];
        $citySlug = $attributes['citySlug'];
        $grade = $attributes['grade'];
        $ratingType = $attributes['ratingType'] ?? 'general';
        $userData = Auth::getUser();

        $location = Location
            ::getFE([
                'citySlug' => $citySlug,
                'slug' => $slug,
            ])
            ->firstOrFail();

        $locationRating = LocationRating::query()
            ->where('location_id', $location->id)
            ->where('rating_type', $ratingType)
            ->first();

        if (!$locationRating) {
            $locationRating = LocationRating::create([
                'location_id' => $location->id,
                'rating_type' => $ratingType,
                'counter' => 0,
            ]);
        }

        $locationRatingHistory = LocationRatingHistory
            ::where('location_rating_id', $locationRating->id)
            ->where('location_id', $location->id)
            ->where('user_id', $userData->id)
            ->first();

        if (!$locationRatingHistory) {
            $locationRatingHistory = new LocationRatingHistory;
            $locationRatingHistory->location_rating_id = $locationRating->id;
            $locationRatingHistory->location_id = $location->id;
            $locationRatingHistory->user_id = $userData->id;
        }

        $locationRatingHistory->grade = $grade;
        $locationRatingHistory->save();

        FeUserSetLocationCommentAction::run([
            'citySlug' => $citySlug,
            'slug' => $slug,
            'comment' => '__empty__',
        ]);

        return $locationRatingHistory;
    }
}
