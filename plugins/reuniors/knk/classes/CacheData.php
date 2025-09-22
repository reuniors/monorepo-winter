<?php namespace Reuniors\Knk\Classes;

use Reuniors\Knk\Models\Category;
use Reuniors\Knk\Models\Location;
use Reuniors\Knk\Models\RegionCity;
use Cache;

class CacheData
{
    protected static $cachedData = [];

    /**
     * @param $name
     * @param float|int $durationInHours - 1 day default
     * @return mixed
     */
    public static function get($name, $durationInHours = 24)
    {
        if (self::check($name)) {
            return Cache::get($name);
        }
        $duration = $durationInHours * 3600;
        return Cache::remember($name, $duration, function () use ($name) {
            return self::getOriginalData($name);
        });
    }
    public static function check($name)
    {
        return Cache::has($name);
    }

    public static function forget($name)
    {
        Cache::forget($name);
        return new static();
    }

    public static function forgetAndGet($name)
    {
        return self::forget($name)->get($name);
    }

    protected static function getCitiesLocations()
    {
        $cities = RegionCity::where('active', 1)
            ->get();
        $cachedCities = [];
        foreach ($cities as $city) {
            $locations = null;
            $cachedCities[$city->slug] = [];
            $locations = Location::where('active', 1)
                ->where('main_category_id', '<>', env('CATEGORY_CLOSED_OBJECTS', 410))
                ->with('main_category')
                ->whereHas('city', function ($query) use ($city) {
                    $query->where('id', $city->id);
                })
                ->orderByDesc('priority')
                ->limit(5)
                ->get();
            if ($locations->isNotEmpty()) {
                $cachedCities[$city->slug] = $locations
                    ->sortByDesc('main_category.slug')
                    ->mapWithKeys(function ($location, $key) {
                        return [
                            $location->slug => [
                                'title' => $location->title,
                                'slug' => $location->slug,
                                'category_slug' => $location->main_category
                                    ? $location->main_category->slug
                                    : null,
                                'category_title' => $location->main_category
                                    ? $location->main_category->title
                                    : null,
                            ]
                        ];
                    })
                    ->toArray();
            }
        }
        return $cachedCities;
    }

    protected static function getCitiesCategoriesLocations()
    {
        $categories = Category::where('active', 1)
            ->get();
        $cities = RegionCity::where('active', 1)
            ->get();
        $cachedCities = [];
        foreach ($cities as $city) {
            $locations = null;
            $cachedCities[$city->slug] = [];
            foreach ($categories as $category) {
                $cachedCities[$city->slug][$category->slug] = [
                    'title' => $category->title,
                    'description' => $category->description,
                ];
                $locations = Location::where('active', 1)
                    ->whereHas('city', function ($query) use ($city) {
                        $query->where('id', $city->id);
                    })
                    ->whereHas('categories', function ($query) use ($category) {
                        $query->where('id', $category->id);
                    })
                    ->orderByRaw("main_category_id = $category->id DESC")
                    ->orderByDesc('priority')
                    ->limit(5)
                    ->get();
                if ($locations->isNotEmpty()) {
                    $cachedCities[$city->slug][$category->slug]['locations'] = $locations
                        ->mapWithKeys(function ($location, $key) {
                            return [
                                $location->slug => [
                                    'title' => $location->title,
                                    'slug' => $location->slug,
                                ]
                            ];
                        })->toArray();
                }
                $searchCategorySlug = 'gde-jesti';
                $cachedCities[$city->slug][$searchCategorySlug] = [
                    'title' => 'Gde jesti',
                    'description' => 'Gde jesti? Pretraga svih restorana, brze hrane, picerija, kafana i dr :in :city!',
                ];
                $locations = Location::where('active', 1)
                    ->whereHas('city', function ($query) use ($city) {
                        $query->where('id', $city->id);
                    })
                    ->orderByDesc('priority')
                    ->limit(5)
                    ->get();
                if ($locations->isNotEmpty()) {
                    $cachedCities[$city->slug][$searchCategorySlug]['locations'] = $locations
                        ->mapWithKeys(function ($location, $key) {
                            return [
                                $location->slug => [
                                    'title' => $location->title,
                                    'slug' => $location->slug,
                                ]
                            ];
                        })->toArray();
                }
            }
        }
        return $cachedCities;
    }

    public static function getOriginalData($name)
    {
        switch ($name) {
            case 'city-data':
                return RegionCity::where('active', 1)
                    ->get(['slug', 'metadata', 'description', 'title', 'id', 'parent_city_id as parentCityId'])
                    ->keyBy('slug')
                    ->toArray();
            case 'cities-municipalities':
                return RegionCity::where('active', 1)
                    ->with('parent_city')
                    ->get()
                    ->pluck('parent_city.slug', 'slug');
            case 'city-locations':
                return self::getCitiesLocations();
            case 'city-locations-byCategory':
                return self::getCitiesCategoriesLocations();
            case 'categories':
                return Category::where('active', 1)
                    ->get(['slug', 'description', 'title', 'id'])
                    ->keyBy('slug')
                    ->toArray();
            case 'cities-with-locations-count':
                $allCities = RegionCity::query()
                    ->select(
                        'slug', 'title', 'id', 'parent_city_id as parentCityId'
                    )
                    ->withCount('locations')
                    ->with('cities')
                    ->get()
                    ->keyBy('slug');
                return $allCities
                    ->map(function ($city) use ($allCities) {
                        $childrenCount = 0;
                        if ($city->cities->isNotEmpty()) {
                            foreach ($city->cities as $childCity) {
                                $childrenCount += $allCities[$childCity->slug]->locations_count;
                            }
                        }
                        $city->locationsCount = $city->locations_count + $childrenCount;

                        return $city->only([
                            'slug',
                            'title',
                            'id',
                            'parentCityId',
                            'locationsCount'
                        ]);
                    })
                    ->sortByDesc(function ($city) {
                        return [$city['locationsCount'] ? 1 : -1];
                    })
                    ->keyBy('slug')
                    ->toArray();
        }
    }
}
