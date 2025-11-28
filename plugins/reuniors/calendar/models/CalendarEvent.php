<?php namespace Reuniors\Calendar\Models;

use Carbon\Carbon;
use Model;

/**
 * CalendarEvent Model
 * Generic calendar event for any provider
 */
class CalendarEvent extends Model
{
    use \Winter\Storm\Database\Traits\Validation;
    use \Winter\Storm\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at', 'start_time_utc', 'end_time_utc', 'last_synced_at'];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_calendar_events';

    /**
     * @var array Validation rules
     */
    public $rules = [
        'calendar_connection_id' => 'required|exists:reuniors_calendar_connections,id',
        'provider_event_id' => 'required|string',
        'provider_calendar_id' => 'required|string',
        'start_time_utc' => 'required|date',
        'end_time_utc' => 'required|date|after:start_time_utc',
    ];

    protected $fillable = [
        'calendar_connection_id',
        'provider_event_id',
        'provider_calendar_id',
        'event_type',
        'is_external',
        'allows_overlap',
        'start_time_utc',
        'end_time_utc',
        'summary',
        'description',
        'status',
        'last_synced_at',
        'metadata',
    ];

    protected $casts = [
        'is_external' => 'boolean',
        'allows_overlap' => 'boolean',
        'metadata' => 'array',
    ];

    public $belongsTo = [
        'calendarConnection' => [
            'Reuniors\Calendar\Models\CalendarConnection',
            'key' => 'calendar_connection_id',
        ],
    ];

    public $hasMany = [
        'overlapRequests' => [
            'Reuniors\Calendar\Models\CalendarOverlapRequest',
            'key' => 'calendar_event_id',
        ],
    ];

    /**
     * Polymorphic relation to entity-specific events (e.g., ReservationCalendarEvent)
     */
    public function reservationsEvents()
    {
        return $this->hasMany('Reuniors\Reservations\Models\ReservationCalendarEvent', 'calendar_event_id');
    }

    /**
     * Check if event overlaps with given time range
     */
    public function overlapsWith($startTime, $endTime)
    {
        $eventStart = Carbon::parse($this->start_time_utc);
        $eventEnd = Carbon::parse($this->end_time_utc);
        $checkStart = Carbon::parse($startTime);
        $checkEnd = Carbon::parse($endTime);

        return $eventStart->lt($checkEnd) && $eventEnd->gt($checkStart);
    }

    /**
     * Scope for active events (not cancelled)
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'confirmed');
    }

    /**
     * Scope for external events
     */
    public function scopeExternal($query)
    {
        return $query->where('is_external', true);
    }

    /**
     * Scope for events that block slots
     */
    public function scopeBlockingSlots($query)
    {
        return $query->where('allows_overlap', false);
    }

    /**
     * Scope for events in time range
     */
    public function scopeInTimeRange($query, $startTime, $endTime)
    {
        return $query->where(function($q) use ($startTime, $endTime) {
            $q->whereBetween('start_time_utc', [$startTime, $endTime])
              ->orWhereBetween('end_time_utc', [$startTime, $endTime])
              ->orWhere(function($q2) use ($startTime, $endTime) {
                  $q2->where('start_time_utc', '<=', $startTime)
                     ->where('end_time_utc', '>=', $endTime);
              });
        });
    }
}

