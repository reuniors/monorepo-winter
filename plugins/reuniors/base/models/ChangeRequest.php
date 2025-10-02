<?php namespace Reuniors\Base\Models;

use Model;

/**
 * ChangeRequest Model
 */
class ChangeRequest extends Model
{
    use \October\Rain\Database\Traits\Validation;

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_base_change_requests';

    /**
     * @var array Fillable fields
     */
    public $fillable = [
        'entity_type',
        'entity_id',
        'field_name',
        'old_value',
        'new_value',
        'status',
        'created_by',
        'approved_by',
        'rejected_by',
        'rejection_reason',
        'scheduled_date',
        'scheduled_date_utc',
    ];

    /**
     * @var array Validation rules
     */
    public $rules = [
        'entity_type' => 'required|string|max:255',
        'entity_id' => 'required|integer',
        'field_name' => 'required|string|max:255',
        'status' => 'required|in:pending,approved,rejected',
    ];

    /**
     * @var array Date fields
     */
    protected $dates = [
        'scheduled_date',
        'scheduled_date_utc',
    ];

    /**
     * @var array Relations
     */
    public $belongsTo = [
        'creator' => ['Winter\User\Models\User', 'key' => 'created_by'],
        'approver' => ['Winter\User\Models\User', 'key' => 'approved_by'],
        'rejector' => ['Winter\User\Models\User', 'key' => 'rejected_by'],
    ];

    /**
     * Scope for pending requests
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope for approved requests
     */
    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    /**
     * Scope for rejected requests
     */
    public function scopeRejected($query)
    {
        return $query->where('status', 'rejected');
    }

    /**
     * Scope for specific entity
     */
    public function scopeForEntity($query, $entityType, $entityId)
    {
        return $query->where('entity_type', $entityType)
                    ->where('entity_id', $entityId);
    }
}
