<?php namespace Reuniors\Botovi\Models;

use Model;
use Winter\Storm\Database\Traits\Validation;

/**
 * ChangeRequest Model
 */
class ChangeRequest extends Model
{
    use Validation;

    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_botovi_change_requests';

    /**
     * @var array Validation rules
     */
    public $rules = [
        'entity_type' => 'required|string|max:50',
        'entity_id' => 'nullable|string|max:100',
        'action_class' => 'required|string|max:255',
        'data' => 'required|string',
        'action_data' => 'required|string',
        'change_type' => 'required|in:create,update,delete',
        'scheduled_date' => 'required|date|after:today',
        'status' => 'required|in:pending,approved,rejected,executed,failed',
        'created_by' => 'required|integer|exists:users,id',
    ];

    protected $fillable = [
        'entity_type',
        'entity_id',
        'action_class',
        'data',
        'action_data',
        'change_type',
        'scheduled_date',
        'status',
        'created_by',
    ];

    protected $casts = [
        'scheduled_date' => 'date',
    ];

    public $belongsTo = [
        'creator' => ['Winter\User\Models\User', 'key' => 'created_by'],
    ];

    // Scopes
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    public function scopeRejected($query)
    {
        return $query->where('status', 'rejected');
    }

    public function scopeExecuted($query)
    {
        return $query->where('status', 'executed');
    }

    public function scopeFailed($query)
    {
        return $query->where('status', 'failed');
    }

    public function scopeScheduledForDate($query, $date)
    {
        return $query->where('scheduled_date', $date);
    }

    public function scopeReadyForExecution($query)
    {
        return $query->where('status', 'approved')
                    ->where('scheduled_date', '<=', now()->toDateString());
    }

    public function scopeByEntityType($query, $entityType)
    {
        return $query->where('entity_type', $entityType);
    }

    public function scopeByChangeType($query, $changeType)
    {
        return $query->where('change_type', $changeType);
    }

    public function scopeRecent($query)
    {
        return $query->orderBy('created_at', 'desc');
    }

    // Methods
    public function canExecute()
    {
        return $this->status === 'approved' &&
               $this->scheduled_date <= now()->toDateString();
    }

    public function markAsExecuted()
    {
        $this->status = 'executed';
        $this->save();
    }

    public function markAsFailed($error)
    {
        $this->status = 'failed';
        $this->save();
    }

    public function approve()
    {
        $this->status = 'approved';
        $this->save();
    }

    public function reject()
    {
        $this->status = 'rejected';
        $this->save();
    }

    // Boot method
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) \Str::uuid();
            }
        });
    }
}
