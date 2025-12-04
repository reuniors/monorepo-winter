<?php namespace Reuniors\Reservations\Models;

use Illuminate\Support\Facades\Log;
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

    protected static function booted()
    {
        static::saved(function ($shift) {
            self::invalidateGapsCache($shift);
        });

        static::updated(function ($shift) {
            self::invalidateGapsCache($shift);
        });

        static::deleted(function ($shift) {
            self::invalidateGapsCache($shift);
        });
    }

    private static function invalidateGapsCache($shift)
    {
        // Try to get location from relationship first
        $location = $shift->location;
        
        // If relationship not loaded, try to get it by location_id
        if (!$location && $shift->location_id) {
            $location = \Reuniors\Reservations\Models\Location::find($shift->location_id);
        }
        
        if ($location) {
            \Reuniors\Reservations\Http\Actions\V1\Location\Slots\LocationTimeGapsGetAction::invalidateCache($location->slug);
            
            Log::info('LocationWorkerShift: Invalidated gaps cache', [
                'shiftId' => $shift->id,
                'locationSlug' => $location->slug,
                'locationId' => $shift->location_id,
                'dateUtc' => $shift->date_utc,
            ]);
        } else {
            Log::warning('LocationWorkerShift: Could not invalidate gaps cache - location not found', [
                'shiftId' => $shift->id,
                'locationId' => $shift->location_id ?? 'null',
            ]);
        }
    }


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

        // Sort by date_utc to ensure chronological order
        $query->orderBy('date_utc', 'asc');

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
