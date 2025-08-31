<?php namespace Reuniors\Evodic\Models;

use Illuminate\Support\Facades\Cache;

/**
 * Model
 */
class Location extends AbstractBaseModel
{
    use \Winter\Storm\Database\Traits\Validation;

    use \Winter\Storm\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at'];

    public static $limits = [
        'gallery' => 10,
        'cover_image' => 1,
        'logo' => 1,
    ];

    const TYPE = [
        0 => 'apartment',
        1 => 'hotel',
    ];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_evodic_locations';

    public $implement = ['@Winter.Translate.Behaviors.TranslatableModel'];
    public array $translatable = [
        'title',
        'description',
        ['slug', 'index' => true]
    ];

    protected $fillable = [
        'name',
        'slug',
        'description',
        'title',
        'metadata',
        'active',
        'active_at',
        'deactivate_at',
        'address_data',
        'phone_data',
        'address_lat',
        'address_long',
        'google_map_url',
        'snippet',
        'city_id',
        'main_owner_id',
        'wifi_password',
        'type'
    ];

    protected $casts = [
        'metadata' => 'array',
        'active' => 'boolean',
    ];

    protected $jsonable = [
        'metadata',
        'address_data',
        'phone_data',
    ];

    protected $hidden = [
        'main_owner_id',
    ];

    /**
     * @var array Validation rules
     */
    public $rules = [
        'title' => 'required|max:255',
        'name' => 'required|max:255',
        'slug' => 'required|max:255',
        'description' => 'string',
        'active' => 'boolean',
        'active_at' => ['date', 'nullable'],
        'deactivate_at' => ['date', 'nullable'],
    ];

    public $belongsTo = [
        'city' => [
            'Reuniors\Evodic\Models\City',
            'order' => 'name'
        ],
        'main_owner' => [
            'Reuniors\Evodic\Models\LocationOwner',
            'order' => 'first_name'
        ],
    ];

    public $belongsToMany = [
        'location_lists' => [
            'Reuniors\Evodic\Models\LocationList',
            'table' => 'reuniors_evodic_locations_lists',
            'order' => 'sort_order'
        ],
        'location_owners' => [
            'Reuniors\Evodic\Models\LocationOwner',
            'table' => 'reuniors_evodic_location_owners_locations',
            'order' => 'first_name'
        ],
        'places' => [
            Place::class,
            'table' => 'reuniors_evodic_locations_places',
            'order' => 'name',
            'pivot' => ['sort_order'],
            'key' => 'location_id',
            'otherKey' => 'place_id',
        ],
    ];

    public $hasMany = [
        'qaAnswers' => [
            'Reuniors\Evodic\Models\QaAnswer',
            'key' => 'location_id'
        ],
    ];

    public $hasManyThrough = [
        'qaQuestions' => [
            'Reuniors\Evodic\Models\QaQuestion',
            'through' => 'Reuniors\Evodic\Models\QaAnswer',
            'key' => 'location_id',
            'throughKey' => 'qa_question_id',
            'order' => 'title'
        ],
    ];

    public $attachMany = [
        'gallery' => [
            'Reuniors\Evodic\Models\FileImage\FileImageWide',
            'order' => 'sort_order',
            'delete' => true
        ]
    ];

    public $attachOne = [
        'cover' => [
            'Reuniors\Evodic\Models\FileImage\FileImageWide',
            'order' => 'sort_order',
            'delete' => true
        ],
        'logo' => [
            'Reuniors\Evodic\Models\FileImage\FileImageSquare',
            'order' => 'sort_order',
            'delete' => true
        ]
    ];

    public function scopeList($query, array $options)
    {
        extract(array_merge([
            'selectType' => null,
        ], $options));

        if ($selectType) {
            switch ($selectType) {
                case 'short':
                    $query = $query->select('id', 'name', 'slug');
            }
        }

        return $query;
    }

    public function scopeGetLocationData($query, array $options)
    {
        /**
         * @var string $slug
         * @var bool $withCity
         * @var bool $withMainOwner
         * @var bool $withCover
         * @var bool $withLogo
         * @var bool $withGallery
         * @var bool $qaAnswers
         */
        extract(array_merge([
            'slug' => null,
            'withCity' => true,
            'withMainOwner' => true,
            'withCover' => true,
            'withLogo' => true,
            'withGallery' => true,
            'qaAnswers' => true,
        ], $options));

        if ($slug) {
            $query = $query->where('slug', $slug);
        }
        if ($withCity) {
            $query = $query->with('city');
        }
        if ($withMainOwner) {
            $query = $query->with('main_owner');
        }
        if ($withCover) {
            $query = $query->with('cover');
        }
        if ($withLogo) {
            $query = $query->with('logo');
        }
        if ($withGallery) {
            $query = $query->with('gallery');
        }
        if ($qaAnswers) {
            $query = $query->with(['qaAnswers', 'qaAnswers.qaQuestion']);
        }

        return $query;
    }

    public static function forgetAll($locationSlug)
    {
        Cache::forget('location_data_' . $locationSlug);
        Cache::forget('location_places_' . $locationSlug);
        Cache::forget('location_place_types_' . $locationSlug);
    }
}
