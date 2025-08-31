<?php namespace Reuniors\Knk\Http\ActionsFe\V1\Location\Review;

use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Location;

class FeGetLocationRatingsAction extends BaseAction
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
        $citySlug = $attributes['citySlug'];
        $slug = $attributes['slug'];
        $location = Location::getFE([
                'citySlug' => $citySlug,
                'slug' => $slug,
            ])
            ->firstOrFail();

        return $location->location_ratings;
    }
}
