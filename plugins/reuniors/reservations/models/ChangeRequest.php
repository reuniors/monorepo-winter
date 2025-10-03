<?php
namespace Reuniors\Reservations\Models;

use Model;
use Winter\Storm\Database\Traits\Validation;

class ChangeRequest extends Model
{
    use Validation;

    public $rules = [
        'entity_type' => 'required|string|max:50',
        'entity_id' => 'nullable|string|max:100',
        'action_class' => 'required|string|max:255',
        'data' => 'required|json',
        'action_data' => 'required|json',
        'change_type' => 'required|in:create,update,delete',
        'scheduled_date_utc' => 'required|date|after:today',
        'status' => 'required|in:pending,approved,rejected,executed,failed',
        'created_by' => 'required|integer|exists:users,id',
    ];

    protected $table = 'reuniors_reservations_change_requests';

    protected $fillable = [
        'id',
        'entity_type',
        'entity_id',
        'action_class',
        'data',
        'action_data',
        'change_type',
        'scheduled_date_utc',
        'status',
        'created_by'
    ];

    protected $casts = [
        'data' => 'json',
        'action_data' => 'json',
        'scheduled_date_utc' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    public $belongsTo = [
        'creator' => ['RainLab\User\Models\User', 'key' => 'created_by']
    ];

    // Scopes
    public function scopePending($query) { return $query->where('status', 'pending'); }
    public function scopeApproved($query) { return $query->where('status', 'approved'); }
    public function scopeScheduledForDate($query, $date) { return $query->where('scheduled_date_utc', $date); }
    public function scopeReadyForExecution($query) {
        return $query->where('status', 'approved')
                    ->where('scheduled_date_utc', '<=', now()->toDateString());
    }
    public function scopeFailed($query) { return $query->where('status', 'failed'); }
    public function scopeExecuted($query) { return $query->where('status', 'executed'); }

    // Methods
    public function canExecute() {
        return $this->status === 'approved' &&
               $this->scheduled_date_utc <= now()->toDateString();
    }

    public function markAsExecuted() {
        $this->status = 'executed';
        $this->save();
    }

    public function markAsFailed($error) {
        $this->status = 'failed';
        $this->save();
    }

    /**
     * Boot the model and set UUID
     */
    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) \Str::uuid();
            }
        });
    }
} 