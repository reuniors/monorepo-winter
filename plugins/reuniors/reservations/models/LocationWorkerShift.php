<?php namespace Reuniors\Reservations\Models;

use Model;

/**
 * Model
 */
class LocationWorkerShift extends Model
{
    use \Winter\Storm\Database\Traits\Validation;

    /*
     * Disable timestamps by default.
     * Remove this line if timestamps are defined in the database table.
     */
    public $timestamps = false;


    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_reservations_location_workers_shifts';

    /**
     * @var array Validation rules
     */
    public $rules = [];

    protected $fillable = [
        'location_worker_id',
        'location_id',
        'shift',
        'status',
        'time_from_utc',
        'time_to_utc',
        'date_utc',
        'pauses_utc'
    ];

    protected $dates = [
        'date_utc'
    ];

    protected $casts = [
        'pauses_utc' => 'array'
    ];

    public $belongsTo = [
        'location_worker' => 'Reuniors\Reservations\Models\LocationWorker',
        'location' => 'Reuniors\Reservations\Models\Location'
    ];

    public function scopeWorkersShiftsByDay($query, array $options = [])
    {
        /**
         * @var string $locationSlug
         * @var string $workerId
         * @var string $startDate
         * @var string $endDate
         */
        extract([
            'locationSlug' => null,
            'workerId' => null,
            'startDate' => null,
            'endDate' => null,
            ...$options
        ]);

        if ($locationSlug) {
            $query->whereHas('location', function ($query) use ($locationSlug) {
                $query->where('slug', $locationSlug);
            });
        }
        if ($workerId) {
            $query->where('location_worker_id', $workerId);
        }
        if ($startDate) {
            $query->whereDate('date_utc', '>=', $startDate);
        }
        if ($endDate) {
            $query->whereDate('date_utc', '<=', $endDate);
        }

        return $query;
    }

    public function scopeIsWorkingDay($query, $dateOnly, $locationWorkerId = null)
    {
        $query
            ->where('date_utc', $dateOnly)
            ->whereNotNull('shift');

        if ($locationWorkerId) {
            $query->where('location_worker_id', $locationWorkerId);
        }

        return $query;
    }
}
