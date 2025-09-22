<?php namespace Reuniors\Knk\Http\ActionsFe\V1\Location;

use Illuminate\Support\Facades\Cache;
use Reuniors\Knk\Classes\CacheData;
use Reuniors\Knk\Classes\Enums\LocationCacheKeyEnum;
use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Location;
use Reuniors\Base\Models\City;

class FeGetCitiesTopLocationsAction extends BaseAction
{
    public function rules()
    {
        return [
            'citySlug' => ['string'],
            'perCity' => ['integer'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $citySlug = $attributes['citySlug'] ?? null;
        $perCity = $attributes['perCity'] ?? 10;
        $cities = CacheData::get(LocationCacheKeyEnum::citiesWithLocationsCount) ?? [];
//        Cache::forget(LocationCacheKeyEnum::topLocations);

        $bestLocations = Cache::rememberForever(
            LocationCacheKeyEnum::topLocations,
            function () use($perCity, $cities) {
                $locations = null;

                foreach ($cities as $city) {
                    if (($city['locationsCount'] ?? 0) < 5) {
                        continue;
                    }
                    $bestCityLocations = Location::query()
                        ->select(...Location::FE_SELECT)
                        ->where('city_id', $city['id'])
                        ->where('is_closed', 0)
                        ->where('active', 1)
                        ->orderByDesc('likes_count')
                        ->orderByDesc('rating_average_grade')
                        ->orderByDesc('comments_count')
                        ->with(['cover_image', 'logo'])
                        ->limit($perCity)
                        ->get();

                    $locations = $locations
                        ? $locations->merge($bestCityLocations)
                        : $bestCityLocations;
                }

                return $locations->toArray();
            }
        );

        if ($citySlug) {
            $city = City::query()
                ->where('slug', $citySlug)
                ->firstOrFail();
            $bestLocations = array_filter($bestLocations, function ($location) use ($city) {
                return $location['city_id'] === $city->id;
            });
        }

        return $bestLocations;
    }
}
