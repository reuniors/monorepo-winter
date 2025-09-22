<?php namespace Reuniors\Knk\Models;

use Model;
use October\Rain\Database\Traits\Sortable;
use Reuniors\Knk\Facades\Globals;

/**
 * Model
 */
class Banner extends Model
{
    use \October\Rain\Database\Traits\Validation;
    use \October\Rain\Database\Traits\SoftDelete;
    use Sortable;

    const SORT_ORDER = 'sort_order';

    protected $dates = ['deleted_at'];

    const LOCATIONS_BANNER_POSITION = 3;


    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_knk_banners';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];

    public $attachOne = [
        'banr_image' => ['System\Models\File', 'order' => 'sort_order', 'delete' => true],
    ];

    public $belongsTo = [
        'banner_zone' => [
            'Reuniors\Knk\Models\BannerZone',
            'order' => 'name'
        ],
        'category' => [
            'Reuniors\Knk\Models\Category',
            'order' => 'name'
        ],
        'city' => [
            'Reuniors\Base\Models\City',
            'order' => 'name'
        ],
        'connected_location' => [
            'Reuniors\Knk\Models\Location',
            'order' => 'priority desc'
        ]
    ];

    public $belongsToMany = [
        'locations' => [
            'Reuniors\Knk\Models\Location',
            'table' => 'reuniors_knk_banners_locations',
            'order' => 'name',
        ],
    ];

    public function scopeListFrontEnd($query, $options)
    {
        /**
         * Default options
         * @var $bannerZone
         * @var $citySlug
         * @var $categorySlug
         * @var $locationSlug
         * @var $withConnectedLocation
         * @var $active
         * @var $exclusiveCategory
         * @var $notInIds
         *
         * @var $sortBy
         * @var $sortByOrientation
         * @var $perPage
         * @var $pageNumber
         */
        extract(array_merge([
            'bannerZone'   => null,
            'citySlug' => null,
            'categorySlug' => null,
            'locationSlug' => null,
            'withConnectedLocation' => null,
            'active'       => null,
            'exclusiveCategory' => true,
            'notInIds' => [],

            'sortBy'        => null,
            'sortByOrientation' => 'desc',
            'perPage'       => 1000,
            'pageNumber'    => 1,
        ], $options));

        $searchableFields = ['name', 'type'];

        /*
         * Slug
         */
        if ($active !== null) {
            $query->where('active', 1);
        }
        if ($categorySlug || $citySlug || $locationSlug) {
            $query->where(function ($bannerQueryOr)
            use ($citySlug, $categorySlug, $locationSlug, $exclusiveCategory) {
                if ($citySlug !== null) {
                    if ($categorySlug === null || $exclusiveCategory) {
                        $bannerQueryOr->orWhereHas('city', function ($cityQuery) use ($citySlug) {
                            $cityQuery->where('slug', $citySlug);
                        });
                    } else {
                        $bannerQueryOr->where(function ($bannerQueryOr) use ($citySlug, $categorySlug) {
                            $bannerQueryOr
                                ->orWhereHas('city', function ($cityQuery) use ($citySlug) {
                                    $cityQuery->where('slug', $citySlug);
                                })
                                ->orWhereHas('category', function ($categoryQuery) use ($categorySlug) {
                                    $categoryQuery->where('slug', $categorySlug);
                                });
                        });
                    }
                }
                if ($categorySlug !== null && (!$citySlug || $exclusiveCategory)) {
                    $bannerQueryOr->orWhereHas('category', function ($categoryQuery) use ($categorySlug) {
                        $categoryQuery->where('slug', $categorySlug);
                    });
                }
                if ($locationSlug !== null) {
                    $bannerQueryOr->orWhereHas('locations', function ($locationQuery) use ($locationSlug) {
                        $locationQuery->where('slug', $locationSlug);
                    });
                }
            });
        }
        if ($withConnectedLocation !== null) {
            $query->with([
                'connected_location' => function($query) use ($locationSlug) {
                    $query->where('slug', '<>', $locationSlug);
                },
                'connected_location.categories',
                'connected_location.cover_image'
            ]);
            if ($locationSlug !== null) {
                $query->whereHas('connected_location', function ($locationQuery) use ($locationSlug) {
                    $locationQuery->where('slug', '<>', $locationSlug);
                });
            }
        }
        if ($bannerZone) {
            $query->whereHas('banner_zone', function($bannerQuery) use ($bannerZone) {
                $bannerQuery->where('name', $bannerZone);
            });
        }
        if ($locationSlug !== null) {
            $query
                ->select($this->getTable() . '.*')
                ->orderByDesc('reuniors_knk_banners_locations.banner_id')
                ->leftJoin(
                    'reuniors_knk_banners_locations',
                    'reuniors_knk_banners_locations.banner_id', '=', 'reuniors_knk_banners.id'
                );
        }
        if (!empty($notInIds)) {
            $query->whereNotIn('id', $notInIds);
        }
        if ($sortBy !== null) {
            $query->orderBy($sortBy, $sortByOrientation);
        }
        return $query
            ->with(['banr_image', 'banner_zone'])
            ->paginate(
                $perPage,
                $pageNumber
            );
    }

    public static function injectBanners(&$locations, $bannerZone, $page = 1)
    {
        $cityData = Globals::currentCity();
        $categoryData = Globals::currentCategory();
        $locationLength = count($locations);
        if ($locationLength < 1) {
            return;
        }
        $numberOfBanners = ceil($locationLength / self::LOCATIONS_BANNER_POSITION);
        $locationBannerPosition = self::LOCATIONS_BANNER_POSITION < $locationLength
            ? self::LOCATIONS_BANNER_POSITION
            : $locationLength;
        $banners = Banner::listFrontEnd([
            'bannerZone' => $bannerZone,
            'citySlug' => $cityData->slug,
            'categorySlug' => $categoryData ? $categoryData->slug : null,
            'withConnectedLocation' => true,
            'sortBy' => 'priority',
            'perPage' => $numberOfBanners,
            'pageNumber' => $page,
            'active' => 1
        ]);
        $currentBannerPosition = 0;
        if (!count($banners)) {
            return;
        }
        while ($currentBannerPosition < $locationLength) {
            foreach ($banners as $banner) {
                $currentBannerPosition += $locationBannerPosition;
                if ($currentBannerPosition > $locationLength) {
                    break;
                }
                $banner->isBanner = true;
                $locations->splice($currentBannerPosition - 1, 0, [
                    $banner
                ]);
            }
        }
    }
}
