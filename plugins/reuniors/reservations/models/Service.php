<?php
namespace Reuniors\Reservations\Models;

use Reuniors\Reservations\Classes\BaseModelWithSort;

/**
 * Model
 */
class Service extends BaseModelWithSort
{
    use \Winter\Storm\Database\Traits\Validation;
    use \Winter\Storm\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at'];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_reservations_services';

    /**
     * @var array Validation rules
     */
    public $rules = [];

    protected $fillable = [
        'group_id',
        'title',
        'name',
        'slug',
        'description',
        'active',
        'duration',
        'price',
        'currency',
        'sort_order',
        'min_price',
        'max_price',
        'min_duration',
        'max_duration',
    ];

    public $implement = ['RainLab.Translate.Behaviors.TranslatableModel'];

    public $translatable = [
        'title',
        'description',
    ];

    public $belongsTo = [
        'service_group' => ['Reuniors\Reservations\Models\ServiceGroup', 'key' => 'group_id'],
    ];

    public $belongsToMany = [
        'location_workers' => [
            'Reuniors\Reservations\Models\LocationWorker',
            'table' => 'reuniors_reservations_location_workers_services',
            'key' => 'service_id',
            'otherKey' => 'location_worker_id',
            'pivot' => ['price', 'duration', 'sort_order', 'active'],
        ],
    ];

    public $hasMany = [
        'worker_services' => 'Reuniors\Reservations\Models\LocationWorkerService',
    ];

    /**
     * Apply conditions for sort order queries
     * Services are sorted within their group, so we need to filter by group_id
     */
    protected function applySortOrderConditions($query)
    {
        if ($this->group_id) {
            $query->where('group_id', $this->group_id);
        }
        return $query;
    }

    public function getCurrencyOptions()
    {
        return [
            0 => 'RSD',
            1 => 'EUR',
        ];
    }

    /**
     * Get workers for specific location
     */
    public function workersForLocation($locationId)
    {
        return $this->location_workers()
            ->wherePivot('location_id', $locationId)
            ->wherePivot('active', true);
    }

    /**
     * Get price range across all workers for this service
     */
    public function getPriceRangeAttribute()
    {
        $prices = $this->worker_services()
            ->where('active', true)
            ->whereNotNull('price')
            ->pluck('price')
            ->toArray();

        if (empty($prices)) {
            return ['min' => $this->price, 'max' => $this->price];
        }

        return [
            'min' => min($prices),
            'max' => max($prices)
        ];
    }

    /**
     * Update price and duration ranges based on worker services
     */
    public function updateRanges()
    {
        $workerServices = $this->worker_services()
            ->where('active', true)
            ->get();

        if ($workerServices->isEmpty()) {
            // No worker services, use default values
            $this->update([
                'min_price' => $this->price,
                'max_price' => $this->price,
                'min_duration' => $this->duration,
                'max_duration' => $this->duration,
            ]);
            return;
        }

        $prices = [];
        $durations = [];

        foreach ($workerServices as $workerService) {
            // Use worker-specific price/duration or fall back to service default
            $prices[] = $workerService->price ?? $this->price;
            $durations[] = $workerService->duration ?? $this->duration;
        }

        // Always include the default service price/duration in the range
        $prices[] = $this->price;
        $durations[] = $this->duration;

        $this->update([
            'min_price' => min($prices),
            'max_price' => max($prices),
            'min_duration' => min($durations),
            'max_duration' => max($durations),
        ]);
    }
}
