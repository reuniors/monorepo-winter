<?php namespace Reuniors\Knk\Http\ActionsFe\V1\Location\Review;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Location;

class FeGetLocationUsersRatingsAction extends BaseAction
{
    public function rules()
    {
        return [
            'citySlug' => ['string', 'required'],
            'slug' => ['string', 'required'],
            'usersIds' => ['array'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $citySlug = $attributes['citySlug'];
        $slug = $attributes['slug'];
        $usersIds = $attributes['usersIds'] ?? [];

        $location = Location
            ::getFE([
                'citySlug' => $citySlug,
                'slug' => $slug,
            ])
            ->firstOrFail();


    }
}
