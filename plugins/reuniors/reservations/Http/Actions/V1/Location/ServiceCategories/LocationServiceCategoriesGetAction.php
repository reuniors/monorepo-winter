<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\ServiceCategories;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;
use Reuniors\Reservations\Models\ServiceCategory;

class LocationServiceCategoriesGetAction extends BaseAction
{
    public function rules()
    {
        return [
            'locationSlug' => ['string', 'required'],
            'active' => ['boolean'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $location = Location::where('slug', $attributes['locationSlug'])
            ->firstOrFail();

        $query = ServiceCategory::where('location_id', $location->id);

        if (isset($attributes['active']) && $attributes['active']) {
            $query->where('active', true);
        }

        return $query
            ->with('serviceGroups')
            ->orderBy('sort_order')
            ->orderBy('title')
            ->get();
    }
}

