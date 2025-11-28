<?php namespace Reuniors\Calendar\Models;

use Carbon\Carbon;
use Model;
use Winter\User\Models\User;

/**
 * CalendarOverlapRequest Model
 * Generic overlap request for any entity type
 */
class CalendarOverlapRequest extends Model
{
    use \Winter\Storm\Database\Traits\Validation;

    protected $dates = ['requested_start_time_utc', 'responded_at'];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_calendar_overlap_requests';

    /**
     * @var array Validation rules
     */
    public $rules = [
        'calendar_event_id' => 'required|exists:reuniors_calendar_events,id',
        'requested_start_time_utc' => 'required|date',
        'requested_duration_minutes' => 'required|integer|min:1',
        'status' => 'required|in:pending,approved,rejected',
    ];

    protected $fillable = [
        'calendar_event_id',
        'entity_type',
        'entity_id',
        'requested_start_time_utc',
        'requested_duration_minutes',
        'status',
        'user_response',
        'responded_by',
        'responded_at',
    ];

    public $belongsTo = [
        'calendarEvent' => [
            'Reuniors\Calendar\Models\CalendarEvent',
            'key' => 'calendar_event_id',
        ],
        'respondedByUser' => [
            User::class,
            'key' => 'responded_by',
        ],
    ];

    /**
     * Polymorphic relation to entity (e.g., ClientReservation)
     */
    public function entity()
    {
        return $this->morphTo();
    }

    /**
     * Approve the overlap request
     */
    public function approve($userResponse = null, $userId = null)
    {
        $this->status = 'approved';
        $this->user_response = $userResponse;
        $this->responded_by = $userId;
        $this->responded_at = Carbon::now();
        $this->save();
    }

    /**
     * Reject the overlap request
     */
    public function reject($userResponse = null, $userId = null)
    {
        $this->status = 'rejected';
        $this->user_response = $userResponse;
        $this->responded_by = $userId;
        $this->responded_at = Carbon::now();
        $this->save();
    }

    /**
     * Check if request is pending
     */
    public function isPending()
    {
        return $this->status === 'pending';
    }

    /**
     * Scope for pending requests
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }
}

