<?php namespace Reuniors\Knk\Http\ActionsFe\V1\Location;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Location;

class FeGetOneLocation extends BaseAction
{
    public function rules()
    {
        return [
            'citySlug' => ['string', 'required'],
            'slug' => ['string', 'required'],
            'withWorkingTime' => ['boolean'],
            'withMenu' => ['boolean'],
            'withGallery' => ['boolean'],
        ];
    }

    public function handle(array $attributes = [])
    {
        return Location
            ::getFE([
                'citySlug' => $attributes['citySlug'] ?? null,
                'slug' => $attributes['slug'],
                'withWorkingTime' => $attributes['withWorkingTime'] ?? false,
                'withMenu' => $attributes['withMenu'] ?? false,
                'withGallery' => $attributes['withGallery'] ?? false,
                'withRatings' => true,
                'withUserId' => true,
                'withRelatedLocations' => true,
                'withFoodLikes' => true,
                'withBadges' => true,
                'withTags' => true,
            ])
            ->firstOrFail();
    }
}
