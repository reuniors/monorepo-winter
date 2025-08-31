<?php namespace Reuniors\Knk\Http\ActionsFe\V1\Location\VideoReview;

use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Location;

class FeGetLocationVideoReviewsAction extends BaseAction
{
    public function rules()
    {
        return [
            'locationSlug' => ['string', 'required'],
            'cityId' => ['numeric', 'required'],
            'perPage' => 'integer',
        ];
    }

    public function handle(array $attributes = [])
    {
        $location = Location
            ::where('slug', $attributes['locationSlug'])
            ->where('city_id', $attributes['cityId'])
            ->firstOrFail();

        return $location
            ->video_reviews()
            ->with('profile.video_author_photo')
            ->paginate($attributes['perPage'] ?? 10);
    }
}
