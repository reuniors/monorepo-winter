<?php namespace Reuniors\Knk\Models;

use Model;
use October\Rain\Database\Traits\Sortable;

/**
 * Model
 */
class RegionCity extends MariaDbBase
{
    use \October\Rain\Database\Traits\Validation;
    use \October\Rain\Database\Traits\SoftDelete;
    use Sortable;

    const SORT_ORDER = 'sort_order';

    protected $dates = ['deleted_at'];

    public $implement = ['RainLab.Translate.Behaviors.TranslatableModel'];
    public $translatable = [
        'snippet',
        'description',
        'name',
        ['slug', 'index' => true]
    ];

    protected $fillable = [
        'name',
        'has_regions',
        'description',
        'slug',
        'snippet',
        'active',
        'sort_order',
        'title',
        'metadata',
    ];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_knk_region_city';

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

    public $attachOne = [
        'city_logo' => ['System\Models\File', 'order' => 'sort_order', 'delete' => true],
    ];

    public $belongsTo = [
        'parent_city' => [
            'Reuniors\Knk\Models\RegionCity',
            'order' => 'name'
        ]
    ];

    public $hasMany = [
        'cities' => [
            'Reuniors\Knk\Models\RegionCity',
            'key' => 'parent_city_id',
            'otherKey' => 'id'
        ],
        'locations' => [
            'Reuniors\Knk\Models\Location',
            'key' => 'city_id',
        ]
    ];

    public static $linkMunicipalityPages = [
        'location/p50-one-location' => 'location/p30-municipality-one-location',
        'location/p40-one-location-tab' => 'location/p35-municipality-one-location-tab',
//        'location/p20-locations-list' => 'location/p10-locations-municipality',
        'location/p12-location-search' => 'location/p15-locations-municipality-search',
        'home' => 'location/p0-home-municipality',
    ];

    public static $prepositionOptions = [
        'in' => 'u',
        'on' => 'na',
    ];

    public function scopeGetCityFE($query, $options)
    {
        /**
         * @var $citySlug
         * @var $withMunicipality
         */
        extract(array_merge([
            'citySlug' => null,
            'withMunicipality' => false
        ], $options));

        if ($citySlug !== null) {
            $query->where('slug', $citySlug);
        }
        if ($withMunicipality) {
            $query->with('cities');
        }

        return $query;
    }

    public function scopeListFrontEnd($query, $options)
    {
        /**
         * Default options
         * @var $withMunicipality
         * @var $perPage
         * @var $pageNumber
         * @var $sortBy
         * @var $sortByOrientation
         *
         */
        extract(array_merge([
            'withMunicipality' => false,
            'perPage'       => 10,
            'pageNumber'    => 1,
            'sortBy'        => null,
            'sortByOrientation' => 'desc',
        ], $options));

        if (!$withMunicipality) {
            $query->where('parent_city_id', null);
        }
        if ($sortBy) {
            $query->orderBy($sortBy, $sortByOrientation);
        }
        if ($sortByOrientation) {
        }

        return $query
            ->where('active', true)
            ->orderBy('sort_order')
            ->paginate(
                $perPage,
                $pageNumber
            );
    }

    public function getPropositionOptions()
    {
        return self::$prepositionOptions;
    }
}
