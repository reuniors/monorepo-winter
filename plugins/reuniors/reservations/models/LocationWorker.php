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
        'is_synced_category',
        'level',
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
        'serviceCategories' => [
            'Reuniors\Reservations\Models\ServiceCategory',
            'table' => 'reuniors_reservations_service_category_location_worker',
            'key' => 'location_worker_id',
            'otherKey' => 'service_category_id',
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

        // Always load serviceCategories relation for frontend
        $query->with('serviceCategories:id,title,slug,active');

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

    /**
     * Validate that all selected services belong to this worker
     * 
     * @param \Illuminate\Support\Collection $servicesCollection Collection of services keyed by ID
     * @param array $servicesRequest Array of service requests from the input
     * @throws \Illuminate\Http\Exceptions\HttpResponseException If validation fails
     */
    public function validateServices(\Illuminate\Support\Collection $servicesCollection, array $servicesRequest)
    {
        // If worker is synced, they can perform any service
        if ($this->is_synced_service) {
            return;
        }

        // Ensure worker services are loaded
        if (!$this->relationLoaded('services')) {
            $this->load('services');
        }

        // Get worker service IDs from pivot table
        $workerServiceIds = $this->services->pluck('id')->toArray();
        $invalidServiceTitles = [];

        foreach ($servicesRequest as $serviceRequest) {
            $serviceId = $serviceRequest['id'];
            $service = $servicesCollection->get($serviceId);

            if (!$service) {
                // This case should ideally be caught earlier by $servicesCollection, but as a safeguard
                throw new \Exception("Service with ID {$serviceId} not found.");
            }

            // Check if the worker explicitly offers this service
            if (!in_array($serviceId, $workerServiceIds)) {
                $invalidServiceTitles[] = $service->title;
            }
        }

        if (!empty($invalidServiceTitles)) {
            throw new \Illuminate\Http\Exceptions\HttpResponseException(
                \Illuminate\Support\Facades\Response::json([
                    'message' => 'Izabrani radnik ne nudi sledeće usluge: ' . implode(', ', $invalidServiceTitles)
                ], \Illuminate\Http\Response::HTTP_CONFLICT)
            );
        }
    }

    /**
     * Calculate services duration and cost using worker-specific prices when available
     * 
     * @param array $servicesRequest Array of service requests from the input
     * @param \Illuminate\Support\Collection $servicesCollection Collection of services keyed by ID
     * @return array Array with 'services_duration' and 'services_cost'
     */
    public function calculateServicesData(array $servicesRequest, \Illuminate\Support\Collection $servicesCollection)
    {
        $servicesDuration = 0;
        $servicesCost = 0;
        
        foreach ($servicesRequest as $serviceRequest) {
            $service = $servicesCollection[$serviceRequest['id']] ?? null;
            if (!$service) {
                throw new \Exception('Service not found');
            }
            
            // Get worker-specific price and duration from pivot table
            $workerService = $this->services->firstWhere('id', $service->id);
            
            // Use pivot price if available, otherwise fallback to service price
            $price = $workerService && $workerService->pivot->price !== null
                ? $workerService->pivot->price
                : $service->price;
            
            // Use pivot duration if available, otherwise fallback to service duration
            $duration = $workerService && $workerService->pivot->duration !== null
                ? $workerService->pivot->duration
                : $service->duration;
            
            $quantity = $serviceRequest['quantity'] ?? 1;
            
            $servicesDuration += $duration * $quantity;
            $servicesCost += $price * $quantity;
        }

        return [
            'services_duration' => $servicesDuration,
            'services_cost' => $servicesCost,
        ];
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
            
            // Invalidate worker next slots cache when worker is saved (e.g., active status changed)
            $locations = $worker->locations;
            foreach ($locations as $location) {
                \Reuniors\Reservations\Http\Actions\V1\Location\Workers\GetWorkerNextSlotsAction::invalidateCache([
                    'locationSlug' => $location->slug
                ]);
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
