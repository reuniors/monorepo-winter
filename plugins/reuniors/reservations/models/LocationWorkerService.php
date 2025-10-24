<?php namespace Reuniors\Reservations\Models;

use Model;

class LocationWorkerService extends Model
{
    protected $table = 'reuniors_reservations_location_workers_services';

    protected $fillable = [
        'location_worker_id',
        'service_id',
        'location_id',
        'price',
        'duration',
        'sort_order',
        'active',
    ];

    public $belongsTo = [
        'location_worker' => 'Reuniors\Reservations\Models\LocationWorker',
        'service' => 'Reuniors\Reservations\Models\Service',
        'location' => 'Reuniors\Reservations\Models\Location',
    ];

    /**
     * Scope to filter by location
     */
    public function scopeForLocation($query, $locationId)
    {
        return $query->where('location_id', $locationId);
    }

    /**
     * Scope to filter by worker
     */
    public function scopeForWorker($query, $workerId)
    {
        return $query->where('location_worker_id', $workerId);
    }

    /**
     * Scope to filter by service
     */
    public function scopeForService($query, $serviceId)
    {
        return $query->where('service_id', $serviceId);
    }

    /**
     * Get effective price (worker-specific or service default)
     */
    public function getEffectivePriceAttribute()
    {
        return $this->price ?? $this->service->price;
    }

    /**
     * Get effective duration (worker-specific or service default)
     */
    public function getEffectiveDurationAttribute()
    {
        return $this->duration ?? $this->service->duration;
    }

    /**
     * Boot method to update service ranges when worker service changes
     */
    public static function boot()
    {
        parent::boot();

        // Update service ranges when worker service is created, updated, or deleted
        static::saved(function ($model) {
            $model->service->updateRanges();
        });

        static::deleted(function ($model) {
            $model->service->updateRanges();
        });
    }
}
