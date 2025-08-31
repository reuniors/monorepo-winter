<?php namespace Reuniors\Knk\Models;

use Model;

/**
 * Model
 */
class Category extends MariaDbBase
{
    use \October\Rain\Database\Traits\Validation;
    use \October\Rain\Database\Traits\SoftDelete;
    use \October\Rain\Database\Traits\NestedTree;

    protected $dates = ['deleted_at'];

    public $implement = ['RainLab.Translate.Behaviors.TranslatableModel'];
    public $translatable = [
        'title',
        'text',
        'description',
        ['slug', 'index' => true]
    ];

    public $attachOne = [
        'category_icon' => ['System\Models\File', 'order' => 'sort_order', 'delete' => true],
    ];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_knk_categories';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];

    /**
     * @var string[] Json properties
     */
    protected $jsonable = [
        'metadata'
    ];

    public $hasMany = [
        'banners' => ['Reuniors\Knk\Models\Banner'],
    ];

    public $belongsToMany = [
        'locations' => [
            'Reuniors\Knk\Models\Location',
            'table' => 'reuniors_knk_locations_categories',
        ],
    ];

    protected $fillable = [
        'name',
        'title',
        'text',
        'description',
        'slug',
        'priority',
        'active',
        'metadata',
    ];

    public function scopeGetFE($query, $options)
    {
        /**
         * Default options
         * @var $citySlug
         * @var $categorySlug
         * @var $withRedirect
         * @var $withLocations
         * @var $tagsFilters
         */
        extract(array_merge([
            'citySlug' => null,
            'categorySlug' => null,
            'withRedirect' => false,
            'withLocations' => false,
            'tagsFilters'
        ], $options));

        if ($withLocations) {
            $query->with(['locations' => function($locationQuery) use ($citySlug) {
                if ($citySlug !== null) {
                    $locationQuery->whereHas('city', function($cityQuery) use ($citySlug) {
                        $cityQuery->where('slug', $citySlug);
                    });
                }
            }, 'locations.cover_image']);
        }
        if ($categorySlug !== null) {
            $query->where('slug', $categorySlug);
        }
        return $query;
    }

    public function scopeListFrontEnd($query, $options)
    {
        /**
         * Default options
         * @var $getBannerZone
         * @var $getLocations
         * @var $categoriesSlug
         * @var $active
         * @var $limit
         * @var $offset
         * @var $perPage
         * @var $pageNumber
         * @var $sortBy
         * @var $sortByOrientation
         *
         */
        extract(array_merge([
            'getBannerZone' => null,
            'getLocations'  => null,
            'categoriesSlug'  => null,
            'active'        => null,
            'limit'        => 100,
            'offset'        => 0,
            'perPage'       => 10,
            'pageNumber'    => 1,
            'sortBy'        => null,
            'sortByOrientation' => 'desc',
        ], $options));

        $searchableFields = ['name', 'type'];
        $categoryWith = [];

        /*
         * Slug
         */
//        if ($active !== null) {
//            $query->where('active', 1);
//        }
        if (!empty($categoriesSlug)) {
            $categoriesSlug = !is_array($categoriesSlug)
                ? explode(',', $categoriesSlug) : $categoriesSlug;
            $query->whereIn('slug', $categoriesSlug);
        }
        if ($getBannerZone) {
            $categoryWith[] = 'banner_zones.banners.banr_image';
        }
        if ($getLocations) {
            $categoryWith[] = 'locations.cover_image';
        }
        if (!empty($categoryWith)) {
            $query->with($categoryWith);
        }
        if ($limit !== null) {
            $query->limit($limit);
        }
        if ($offset !== null) {
            $query->offset($offset);
        }
        return $query->paginate(
            (int)$perPage,
            $pageNumber
        );
    }

    public function scopeIsActive($query, bool $isActive = null)
    {
        if ($isActive !== null) {
            $query->where('active', $isActive);
        }
        return $query;
    }
}
