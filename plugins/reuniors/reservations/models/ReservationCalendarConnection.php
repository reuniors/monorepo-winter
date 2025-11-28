<?php namespace Reuniors\Reservations\Models;

use Model;

/**
 * ReservationCalendarConnection Model
 * Pivot table connecting calendar connections to reservations locations/workers
 */
class ReservationCalendarConnection extends Model
{
    use \Winter\Storm\Database\Traits\Validation;
    use \Winter\Storm\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at'];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_reservations_calendar_connections';

    /**
     * @var array Validation rules
     */
    public $rules = [
        'calendar_connection_id' => 'required|exists:reuniors_calendar_connections,id',
    ];

    protected $fillable = [
        'calendar_connection_id',
        'location_id',
        'location_worker_id',
    ];

    public $belongsTo = [
        'calendarConnection' => [
            'Reuniors\Calendar\Models\CalendarConnection',
            'key' => 'calendar_connection_id',
        ],
        'location' => [
            'Reuniors\Reservations\Models\Location',
            'key' => 'location_id',
        ],
        'locationWorker' => [
            'Reuniors\Reservations\Models\LocationWorker',
            'key' => 'location_worker_id',
        ],
    ];
}

