<?php
namespace Reuniors\Reservations\Models;

use Reuniors\Reservations\Models\FileImage\FileImageSquare;
use Reuniors\Reservations\Models\FileImage\FileImageWide;
use Model;
use System\Models\File;

/**
 * Model
 */
class Location extends Model
{
    use \Winter\Storm\Database\Traits\Validation;
    use \Winter\Storm\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at'];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_reservations_locations';

    /**
     * @var array Validation rules
     */
    public $rules = [];

    protected $fillable = [
        'title',
        'name',
        'slug',
        'description',
        'metadata',
        'active',
        'is_private',
        'active_at',
        'deactivate_at',
        'main_owner_id',
        'city_id',
        'address_data',
        'phone_data',
        'address_lat',
        'address_long',
        'snippet',
        'wifi_password',
        'type',
        'google_map_url',
        'settings',
        'pwa_metadata',
        'has_multiple_activities',
    ];

    public $implement = ['RainLab.Translate.Behaviors.TranslatableModel'];

    public $translatable = [
        'title',
        'snippet',
        'description', ['slug', 'index' => true]
    ];

    public $appends = [
        'street_full',
    ];

    public $jsonable = [
        'metadata',
        'address_data',
        'phone_data',
        'settings',
        'pwa_metadata',
    ];

    public $belongsTo = [
        'city' => [
            'Reuniors\Base\Models\City',
            'key' => 'city_id',
        ],
    ];

    public $belongsToMany = [
        'working_hours' => [
            'Reuniors\Reservations\Models\WorkingTime',
            'table' => 'reuniors_reservations_locations_working_hours',
            'key' => 'location_id',
            'otherKey' => 'working_hours_id'
        ],
        'workers' => [
            'Reuniors\Reservations\Models\LocationWorker',
            'table' => 'reuniors_reservations_locations_location_workers',
            'key' => 'location_id',
            'otherKey' => 'location_worker_id',
        ],
        'services_groups' => [
            'Reuniors\Reservations\Models\ServiceGroup',
            'table' => 'reuniors_reservations_locations_services_groups',
            'key' => 'location_id',
            'otherKey' => 'services_group_id',
        ],
        'promoCodes' => [
            'Reuniors\Reservations\Models\PromoCode',
            'key' => 'location_id',
        ],
    ];

    public $hasMany = [
        'reservations' => [
            'Reuniors\Reservations\Models\ClientReservation',
            'key' => 'location_id',
        ],
        'news' => [
            News::class,
            'key' => 'location_id',
        ],
        'serviceCategories' => [
            'Reuniors\Reservations\Models\ServiceCategory',
            'key' => 'location_id',
        ],
    ];

    public $attachMany = [
        'gallery' => ['System\Models\File', 'delete' => true],
    ];

    public $attachOne = [
        'logo' => [FileImageSquare::class, 'delete' => true],
        'cover' => [FileImageWide::class, 'delete' => true],
        'pwa_icon' => [File::class, 'delete' => true],
    ];

    public function getTypeOptions()
    {
        return [
            0 => 'Barber',
            1 => 'Restaurant',
        ];
    }

    public function getStreetFullAttribute()
    {
        return $this->address_data['street'] . ' ' . $this->address_data['street_number'] . ', ' . $this->address_data['municipality'];
    }

    protected static function boot()
    {
        parent::boot();

        // Auto-generate PWA metadata on create/update if not provided
        static::saving(function ($location) {
            $pwaMetadata = $location->pwa_metadata ?? [];
            
            // Auto-generate name and short_name if not provided
            if (empty($pwaMetadata['name']) && !empty($location->title)) {
                $pwaMetadata['name'] = $location->title . ' ' . 'RZR.rs';
            }
            if (empty($pwaMetadata['short_name']) && !empty($location->title)) {
                $pwaMetadata['short_name'] = $location->title;
            }
            
            // Only update if we have something to save
            if (!empty($pwaMetadata)) {
                $location->pwa_metadata = $pwaMetadata;
            }
        });

        // Invalidate location data cache when location is saved/updated
        static::saved(function ($location) {
            if ($location->slug) {
                \Reuniors\Reservations\Http\Actions\V1\Location\Cache\ClearLocationDataCache::invalidateCache($location->slug);
            }
        });

        // Invalidate location data cache when location is deleted
        static::deleted(function ($location) {
            if ($location->slug) {
                \Reuniors\Reservations\Http\Actions\V1\Location\Cache\ClearLocationDataCache::invalidateCache($location->slug);
            }
        });
    }

    // Accessor for camelCase conversion
    public function getIsPrivateAttribute($value)
    {
        return $this->attributes['is_private'] ?? null;
    }

    // Accessor for camelCase conversion
    public function getHasMultipleActivitiesAttribute($value)
    {
        return $this->attributes['has_multiple_activities'] ?? null;
    }

    public function scopeGetFeData($query, array $options = [])
    {
        /** @var string $slug */
        extract([
            'slug' => null,
            ...$options,
        ]);

        //        $query->with('city');
        $query->with('working_hours');
        $query->with('workers', function ($query) {
            $query->where('active', 1);
        });
        $query->with('services_groups');
        $query->with('services_groups.services');
        $query->with('gallery');
        $query->with('logo');
        $query->with('cover');
        $query->with('pwa_icon');
        $query->with(['news' => function ($query) {
            $query->active();
        }]);

        if ($slug) {
            $query->where('slug', $slug);
        }

        return $query;
    }
}
