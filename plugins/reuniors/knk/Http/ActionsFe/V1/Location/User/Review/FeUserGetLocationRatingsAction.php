<?php namespace Reuniors\Knk\Http\ActionsFe\V1\Location\User\Review;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Location;

class FeUserGetLocationRatingsAction extends BaseAction
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
