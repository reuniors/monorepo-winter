<?php namespace Reuniors\Knk\Http\ActionsFe\V1\Location\VideoReview;

use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Knk\Http\ActionsFe\V1\City\FeGetCityData;
use Reuniors\Knk\Models\LocationVideoReview;

class FeGetCityVideoReviews extends BaseAction
{
    protected $perPage = 1500;

    public function rules()
    {
        return [
            'citySlug' => ['string', 'required'],
            'perPage' => 'integer',
        ];
    }

    public function handle(array $attributes = [])
    {
        $citySlug = $attributes['citySlug'];

        $cityData = FeGetCityData::run([
            'citySlug' => $citySlug,
        ]);

        return LocationVideoReview::query()
            ->with('profile.video_author_photo')
            ->whereHas('location', function ($query) use ($cityData) {
                $query->where('city_id', $cityData['id']);
            })
            ->paginate($attributes['perPage'] ?? $this->perPage)
            ->makeVisible('location_id');
    }
}
