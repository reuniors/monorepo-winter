<?php namespace Reuniors\Evodic\Models;

use Illuminate\Support\Collection;
use Model;
use Reuniors\Evodic\Models\FileImage\FileImageSquare;
use Reuniors\Evodic\Models\FileImage\FileImageWide;
use Carbon\Carbon;

/**
 * Model
 */
class Place extends Model
{
    use \Winter\Storm\Database\Traits\Validation;

    use \Winter\Storm\Database\Traits\SoftDelete;

    use WorkingHoursExtenderTrait;

    protected $dates = ['deleted_at'];

    public static $limits = [
        'placeGallery' => 10,
        'placeCover' => 1,
        'placeLogo' => 1,
    ];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_evodic_places';

    public $implement = ['@Winter.Translate.Behaviors.TranslatableModel'];
    public array $translatable = [
        'title',
        'description',
        ['slug', 'index' => true]
    ];

    /**
     * @var array Validation rules
     */
    public $rules = [];

    protected $fillable = [
        'title',
        'name',
        'slug',
        'is_active',
        'description',
        'metadata',
        'place_type_id',
        'city_id',
        'status',
        'address_data',
        'phone_data',
        'is_closed',
        'snippet',
        'price_grade',
        'address_lat',
        'address_long',
        'website_url',
        'google_rating',
        'google_map_url',
        'price_from',
        'price_to',
        'price_currency',
        'knk_slug',
        'extra_data_other',
    ];

    public $jsonable = [
        'metadata',
        'address_data',
        'phone_data',
        'extra_data_other',
    ];

    public $belongsTo = [
        'placeType' => [
            PlaceType::class,
        ],
        'city' => [
            City::class,
        ]
    ];

    public $belongsToMany = [
        'working_time' => [ // all types, for creating
            'Reuniors\Evodic\Models\WorkingTime',
            'table' => 'reuniors_evodic_places_working_hours',
            'key' => 'place_id',
            'otherKey' => 'working_hours_id',
        ],
        'working_hours' => [
            'Reuniors\Evodic\Models\WorkingTime',
            'table' => 'reuniors_evodic_places_working_hours',
            'key' => 'place_id',
            'otherKey' => 'working_hours_id',
            'conditions' => "type = 'working_hours'"
        ],
        'delivery_working_hours' => [
            'Reuniors\Evodic\Models\WorkingTime',
            'table' => 'reuniors_evodic_places_working_hours',
            'key' => 'place_id',
            'otherKey' => 'working_hours_id',
            'conditions' => "type = 'delivery_working_hours'"
        ],
        'locations' => [
            Location::class,
            'table' => 'reuniors_evodic_locations_places',
            'pivot' => ['sort_order'],
            'key' => 'place_id',
            'otherKey' => 'location_id',
        ],
        'tags' => [
            Tag::class,
            'table' => 'reuniors_evodic_places_tags',
            'key' => 'place_id',
            'otherKey' => 'tag_id',
        ],
    ];

    public $attachMany = [
        'placeGallery' => [
            FileImageWide::class,
            'order' => 'sort_order',
            'delete' => true
        ]
    ];

    public $attachOne = [
        'placeCover' => [
            FileImageWide::class,
            'order' => 'sort_order',
            'delete' => true
        ],
        'placeLogo' => [
            FileImageSquare::class,
            'order' => 'sort_order',
            'delete' => true
        ]
    ];


    public function scopeLocationPlaces($query, $options)
    {
        /**
         * @var string $locationSlug
         * @var bool $withGallery
         * @var bool $withCover
         * @var bool $withLogo
         * @var bool $withTags
         * @var bool $workingHours
         */
        extract(array_merge([
            'locationSlug' => null,
            'withGallery' => true,
            'withCover' => true,
            'withLogo' => true,
            'withTags' => true,
            'workingHours' => true,
        ], $options));

        if ($locationSlug) {
            $query = $query->whereHas('locations', function ($query) use ($locationSlug) {
                $query->where('slug', $locationSlug);
            });
        }
        if ($withGallery) {
            $query = $query->with('placeGallery');
        }
        if ($withCover) {
            $query = $query->with('placeCover');
        }
        if ($withLogo) {
            $query = $query->with('placeLogo');
        }
        if ($withTags) {
            $query = $query->with('tags');
        }
        if ($workingHours) {
            $query = $query->with('working_hours');
        }

        return $query;
    }

    public function scopePlaceData($query, $options)
    {
        /**
         * @var string $slug
         * @var bool $withGallery
         * @var bool $withCover
         * @var bool $withLogo
         * @var bool $withTags
         * @var bool $withPlaceType
         * @var bool $workingHours
         */
        extract(array_merge([
            'slug' => null,
            'withGallery' => true,
            'withCover' => true,
            'withLogo' => true,
            'withTags' => true,
            'withPlaceType' => true,
            'workingHours' => true,
        ], $options));

        if ($slug) {
            $query = $query->where('slug', $slug);
        }
        if ($withGallery) {
            $query = $query->with('placeGallery');
        }
        if ($withCover) {
            $query = $query->with('placeCover');
        }
        if ($withLogo) {
            $query = $query->with('placeLogo');
        }
        if ($withTags) {
            $query = $query->with('tags');
        }
        if ($withPlaceType) {
            $query = $query->with('placeType');
        }
        if ($workingHours) {
            $query = $query->with('working_hours');
        }

        return $query;
    }
}
