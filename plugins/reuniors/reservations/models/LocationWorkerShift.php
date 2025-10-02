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
        'date',
        'shift',
        'status',
        'time_from',
        'time_to',
        'pause_time_from',
        'pause_time_to',
        'pauses',
        'time_from_utc',
        'time_to_utc',
        'date_utc',
        'pauses_utc'
    ];

    protected $dates = [
        'date',
        'date_utc'
    ];

    protected $casts = [
        'pauses' => 'array',
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
            $query->whereDate('date', '>=', $startDate);
        }
        if ($endDate) {
            $query->whereDate('date', '<=', $endDate);
        }

        return $query;
    }

    public function scopeIsWorkingDay($query, $dateOnly, $locationWorkerId = null)
    {
        $query
            ->where('date', $dateOnly)
            ->whereNotNull('shift');

        if ($locationWorkerId) {
            $query->where('location_worker_id', $locationWorkerId);
        }

        return $query;
    }
}
