<?php namespace Reuniors\Reservations\Models;

use Model;

/**
 * ReservationCalendarEvent Model
 * Pivot table connecting calendar events to reservations
 */
class ReservationCalendarEvent extends Model
{
    use \Winter\Storm\Database\Traits\Validation;

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_reservations_calendar_events';

    /**
     * @var array Validation rules
     */
    public $rules = [
        'calendar_event_id' => 'required|exists:reuniors_calendar_events,id',
    ];

    protected $fillable = [
        'calendar_event_id',
        'client_reservation_id',
    ];

    public $belongsTo = [
        'calendarEvent' => [
            'Reuniors\Calendar\Models\CalendarEvent',
            'key' => 'calendar_event_id',
        ],
        'clientReservation' => [
            'Reuniors\Reservations\Models\ClientReservation',
            'key' => 'client_reservation_id',
        ],
    ];
}

