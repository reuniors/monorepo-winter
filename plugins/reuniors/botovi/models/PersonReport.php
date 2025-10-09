<?php namespace Reuniors\Botovi\Models;

use Model;
use Winter\Storm\Database\Traits\Validation;

/**
 * PersonReport Model
 */
class PersonReport extends Model
{
    use Validation;

    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_botovi_person_reports';

    /**
     * @var array Validation rules
     */
    public $rules = [
        'person_id' => 'required|integer|exists:reuniors_botovi_people,id',
        'reported_by' => 'required|integer|exists:users,id',
        'report_type' => 'required|in:inappropriate,false_info,duplicate,spam,harassment,privacy_violation,other',
        'reason' => 'required|string',
        'status' => 'in:pending,approved,rejected',
    ];

    protected $fillable = [
        'person_id',
        'reported_by',
        'report_type',
        'reason',
        'description',
        'status',
        'resolved_by',
        'resolved_at',
        'admin_notes',
    ];

    protected $casts = [
        'resolved_at' => 'datetime',
    ];

    public $belongsTo = [
        'person' => ['Reuniors\Botovi\Models\Person'],
        'reporter' => ['Winter\User\Models\User', 'key' => 'reported_by'],
        'resolver' => ['Winter\User\Models\User', 'key' => 'resolved_by'],
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

    public function scopeByType($query, $type)
    {
        return $query->where('report_type', $type);
    }

    public function scopeRecent($query)
    {
        return $query->orderBy('created_at', 'desc');
    }

    // Methods
    public function approve($userId, $adminNotes = null)
    {
        $this->status = 'approved';
        $this->resolved_by = $userId;
        $this->resolved_at = now();
        $this->admin_notes = $adminNotes;
        $this->save();
    }

    public function reject($userId, $adminNotes = null)
    {
        $this->status = 'rejected';
        $this->resolved_by = $userId;
        $this->resolved_at = now();
        $this->admin_notes = $adminNotes;
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
