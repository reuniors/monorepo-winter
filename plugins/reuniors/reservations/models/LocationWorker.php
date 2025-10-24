<?php
namespace Reuniors\Reservations\Models;

use Carbon\Carbon;
use Reuniors\Reservations\Models\FileImage\FileImageSquare;
use Model;
use Winter\User\Models\UserGroup;
use RainLab\User\Models\User;
use Illuminate\Support\Facades\Log;

/**
 * Model
 */
class LocationWorker extends Model
{
    use \Winter\Storm\Database\Traits\Validation;
    use \Winter\Storm\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at'];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_reservations_location_workers';

    /**
     * @var array Validation rules
     */
    public $rules = [];

    protected $fillable = [
        'first_name',
        'last_name',
        'city_id',
        'metadata',
        'user_id',
        'status',
        'active',
        'phone_data',
        'description',
        'is_synced_service',
    ];

    public $implement = ['RainLab.Translate.Behaviors.TranslatableModel'];

    public $translatable = [
        'description',
        'first_name',
    ];

    protected $appends = ['full_name'];

    protected $jsonable = ['metadata', 'phone_data'];

    public $belongsTo = [
        'city' => 'Reuniors\Base\Models\City',
        'user' => 'RainLab\User\Models\User',
    ];

    public $belongsToMany = [
        'locations' => [
            'Reuniors\Reservations\Models\Location',
            'table' => 'reuniors_reservations_locations_location_workers',
            'key' => 'location_worker_id',
            'otherKey' => 'location_id',
        ],
        'services' => [
            'Reuniors\Reservations\Models\Service',
            'table' => 'reuniors_reservations_location_workers_services',
            'key' => 'location_worker_id',
            'otherKey' => 'service_id',
            'pivot' => ['price', 'duration', 'sort_order', 'active'],
        ],
        'shifts' => [
            'Reuniors\Reservations\Models\LocationWorkerShift',
            'table' => 'reuniors_reservations_location_workers_shifts',
            'key' => 'location_worker_id',
            'otherKey' => 'working_day_id',
            'pivot' => ['shift', 'status'],
        ],
        'working_hours' => [
            'Reuniors\Reservations\Models\WorkingTime',
            'table' => 'reuniors_reservations_location_workers_working_hours',
            'key' => 'location_worker_id',
            'otherKey' => 'working_hours_id',
        ],
    ];

    public $hasMany = [
        'discounts' => 'Reuniors\Reservations\Models\LocationWorkerDiscount',
        'worker_services' => 'Reuniors\Reservations\Models\LocationWorkerService',
    ];

    public $attachOne = [
        'avatar' => [FileImageSquare::class, 'delete' => true],
    ];

    public $attachMany = [
        'gallery' => ['System\Models\File', 'delete' => true],
        'certificates_photos' => ['System\Models\File', 'delete' => true],
    ];

    public function getFullNameAttribute()
    {
        return $this->first_name . ' ' . $this->last_name;
    }

    public function getLevelOptions()
    {
        return [
            0 => 'Beginner',
            1 => 'Intermediate',
            2 => 'Advanced',
        ];
    }

    public function getStatusOptions()
    {
        return [
            0 => 'Active',
            1 => 'Inactive',
            2 => 'Suspended',
        ];
    }

    public function scopeActive($query, $active = true)
    {
        return $query->where('active', $active);
    }

    public function scopeFeWorkers($query, array $options = [])
    {
        /**
         * @var bool $withAvatar
         * @var bool $active
         * @var string|null $locationSlug
         */
        extract([
            'withAvatar' => true,
            'active' => true,
            'locationSlug' => null,
            ...$options,
        ]);

        if ($withAvatar) {
            $query->with('avatar:id,attachment_id,disk_name,file_name');
        }
        if ($active) {
            $query->active();
        }
        if ($locationSlug) {
            $query->whereHas('locations', function ($query) use ($locationSlug) {
                $query->where('slug', $locationSlug);
            });
        }

        return $query;
    }

    /**
     * Get services for specific location
     */
    public function servicesForLocation($locationId)
    {
        return $this->services()
            ->wherePivot('location_id', $locationId)
            ->wherePivot('active', true);
    }

    public function getWorkingTimeByDateAndShift($date, $shift)
    {
        $dayOfWeek = strtolower(
            Carbon::parse($date)->format('D')
        );

        if ($this->working_hours) {
            foreach ($this->working_hours as $workingTime) {
                if (
                    in_array($dayOfWeek, $workingTime->days_codes) &&
                    ($shift === null || $workingTime['shift'] == $shift || $shift === 1000)
                ) {
                    return $workingTime;
                }
            }
        }
        return null;
    }

    public static function boot()
    {
        parent::boot();

        static::saved(function (LocationWorker $worker) {
            if ($worker->user_id) {
                $user = User::find($worker->user_id);
                if ($user) {
                    $workerGroup = UserGroup::where('code', 'worker')->first();
                    if ($workerGroup && !$user->groups->contains($workerGroup->id)) {
                        $user->groups()->add($workerGroup);
                    }
                }
            }
        });

        static::deleted(function (LocationWorker $worker) {
            if ($worker->user_id) {
                $user = User::find($worker->user_id);
                if ($user) {
                    $otherWorkers = LocationWorker::where('user_id', $worker->user_id)
                        ->where('id', '!=', $worker->id)
                        ->count();
                    if ($otherWorkers === 0) {
                        $workerGroup = UserGroup::where('code', 'worker')->first();
                        if ($workerGroup && $user->groups->contains($workerGroup->id)) {
                            $user->groups()->remove($workerGroup);
                        }
                    }
                }
            }
        });
    }
}
