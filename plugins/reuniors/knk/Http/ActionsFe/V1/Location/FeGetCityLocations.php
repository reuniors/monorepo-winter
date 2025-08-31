<?php namespace Reuniors\Knk\Http\ActionsFe\V1\Location;

use Illuminate\Database\Query\JoinClause;
use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Category;
use Reuniors\Knk\Models\Location;
use Reuniors\Knk\Models\RegionCity;

class FeGetCityLocations extends BaseAction
{
    public function rules()
    {
        return [
            'perPage' => ['integer'],
            'citySlug' => ['string', 'required'],
            'locationsPerPage' => ['integer']
        ];
    }

    public function handle(array $attributes = [])
    {
        $citySlug = $attributes['citySlug'];
        $cityDataIds = RegionCity::query()
            ->where('slug', $citySlug)
            ->orWhereHas('parent_city', function ($query) use ($citySlug) {
                $query->where('slug', $citySlug);
            })
            ->get()
            ->pluck('id');

        if ($cityDataIds->isEmpty()) {
            return [];
        }

        $locations = Location::query()
            ->select(...Location::FE_SELECT)
            ->whereIn('city_id', $cityDataIds)
            ->where('active', 1)
            ->where('is_closed', 0)
            ->with(['cover_image', 'logo'])
            ->with('categories:id')
            ->with('tags:id')
            ->with('location_badge_history:tag_id')
            ->orderBy('priority', 'DESC')
            ->get()
            ->each(function ($location) {
                $location->categoriesIds = $location->categories->pluck('id');
                $location->tagIds = $location->tags->pluck('id') ?? [];
                if ($location->location_badge_history->isNotEmpty()) {
                    $location->tagIds = $location->tagIds->merge($location->location_badge_history->pluck('tag_id'));
                }
                unset($location->categories);
                unset($location->tags);
                unset($location->location_badge_history);
            });

        return $locations;
    }
}
