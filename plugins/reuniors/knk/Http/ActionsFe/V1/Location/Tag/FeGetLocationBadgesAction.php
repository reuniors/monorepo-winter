<?php namespace Reuniors\Knk\Http\ActionsFe\V1\Location\Tag;

use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Location;

class FeGetLocationBadgesAction extends BaseAction
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

        $location = Location
            ::getFE([
                'citySlug' => $citySlug,
                'slug' => $slug,
            ])
            ->firstOrFail();

        return $location->location_badge_history()
            ->where('selected_count', '>', 0)
            ->orderBy('selected_count', 'desc')
            ->limit(10)
            ->with('tag')
            ->get();
    }
}
