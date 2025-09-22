<?php namespace Reuniors\Knk\Classes;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\URL;
use Reuniors\Knk\Models\Category;
use Reuniors\Knk\Models\Location;
use Reuniors\Base\Models\City;

class CachePagesData
{
    protected static $tabs = [
        'home',
        'explore',
        'search',
        'location'
    ];

    const PAGE_TYPE_HOME = 'home';
    const PAGE_TYPE_EXPLORE = 'explore';
    const PAGE_TYPE_SEARCH = 'search';
    const PAGE_TYPE_LOCATION = 'location';

    const LOCATION_PAGINATION = 10;

    /**
     * @param $name
     * @param float|int $durationInHours - 1 day default
     * @return mixed
     */
    public static function get($name)
    {
        if (self::check($name)) {
            return Cache::get($name);
        }
        return Cache::rememberForever($name, function () use ($name) {
            return self::getOriginalData($name);
        });
    }

    public static function check($name)
    {
        return Cache::has($name);
    }

    public static function put($name, $data)
    {
        Cache::put($name, $data);
    }

    public static function forget($name)
    {
        Cache::forget($name);
    }

    public static function getUrlCachedData(
        bool $hasFrontPrefix,
        string $tabOrCity = null,
        string $cityOrCategory = null,
        string $categoryOrLocation = null
    ) {
        if (!$tabOrCity) {
            return self::getDefaultData();
        }
        if (!$hasFrontPrefix) {
            if ($categoryOrLocation) {

            }
        }
        if (in_array($tabOrCity, self::$tabs)) {
            $pageType = $tabOrCity;
        } else {
            $pageType = self::PAGE_TYPE_LOCATION;
        }

        switch ($pageType) {
            case self::PAGE_TYPE_HOME:
                if ($categoryOrLocation) {
                    throw new Redirect404Exception();
                }
                if (!$cityOrCategory) {
                    return self::getDefaultData();
                }
                $name = "$tabOrCity:$cityOrCategory";
                return self::getHomeCityData($cityOrCategory);
            case self::PAGE_TYPE_EXPLORE:
                if (!$cityOrCategory) {
                    return self::getDefaultData();
                }
                break;
            case self::PAGE_TYPE_SEARCH:
                $name = 'search-data';
                break;
            case self::PAGE_TYPE_LOCATION:
                $name = 'location-data';
                break;
        }
    }

    public static function getDefaultData()
    {
        $name = 'page:default';

        if (self::check($name)) {
            return self::get($name);
        }

        $data = [
            'categories' => CacheData::get('categories'),
            'cities' => CacheData::get('city-data'),
        ];

        self::put($name, $data);
        return $data;
    }

    public static function getHomeCityData($city)
    {
        $name = "page:home/$city";
        if (self::check($name)) {
            return self::get($name);
        }
        $cities = CacheData::get('city-data');

        if (!isset($cities[$city])) {
            throw new Redirect404Exception();
        }

        $city = $cities[$city];

        $data = [
            'city' => $city,
            'categories' => CacheData::get('categories'),
            'locations' => Location::where('city_id', $city['id'])
                ->paginate(self::LOCATION_PAGINATION),
        ];
        self::put($name, $data);
        return $data;
    }

    public function getLocationData($citySlug, $categorySlug, $slug)
    {
        $name = "page:location/$citySlug/$categorySlug/$slug";
        if (self::check($name)) {
            return self::get($name);
        }
        $cities = CacheData::get('city-data');
        $categories = CacheData::get('categories');

        if (!isset($cities[$citySlug])) {
            throw new Redirect404Exception();
        }

        if (!isset($categories[$categorySlug])) {
            throw new Redirect404Exception();
        }

        $city = $cities[$citySlug];
        $category = $categories[$categorySlug];

        $location = Location::where('city_id', $city['id'])
            ->where('category_id', $category['id'])
            ->where('slug', $slug)
            ->first();

        if (!isset($location)) {
            throw new Redirect404Exception();
        }

        $data = [
            'city' => $city,
            'category' => $category,
            'location' => $location,
        ];
        self::put($name, $data);
        return $data;
    }

    public static function getOriginalData($name)
    {
        switch ($name) {
            case 'city-data':
                return City::where('active', 1)
                    ->get(['slug', 'metadata', 'description', 'title'])
                    ->keyBy('slug')
                    ->toArray();
            case 'cities-municipalities':
                return City::where('active', 1)
                    ->with('parent_city')
                    ->get()
                    ->pluck('parent_city.slug', 'slug');
            case 'city-locations':
                return self::getCitiesLocations();
            case 'city-locations-byCategory':
                return self::getCitiesCategoriesLocations();
        }
    }
}
