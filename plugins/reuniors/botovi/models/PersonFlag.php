<?php namespace Reuniors\Botovi\Models;

use Model;
use Winter\Storm\Database\Traits\Validation;

/**
 * PersonFlag Model
 */
class PersonFlag extends Model
{
    use Validation;

    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_botovi_person_flags';

    // Flag type constants
    const FLAG_INACCURATE_DATA = 'inaccurate_data';
    const FLAG_ACCURATE_DATA = 'accurate_data';
    const FLAG_NOT_BOT = 'not_bot';
    const FLAG_NOT_CACIJA = 'not_cacija';
    const FLAG_IS_BOT = 'is_bot';
    const FLAG_IS_CACIJA = 'is_cacija';
    const FLAG_WRONG_CATEGORY = 'wrong_category';
    const FLAG_DUPLICATE = 'duplicate';
    const FLAG_OUTDATED = 'outdated';
    const FLAG_MISLEADING = 'misleading';
    const FLAG_INAPPROPRIATE = 'inappropriate';
    const FLAG_KNOW_PERSON = 'know_person';
    const FLAG_DONT_KNOW_PERSON = 'dont_know_person';
    const FLAG_VERIFIED = 'verified';
    const FLAG_UNVERIFIED = 'unverified';
    const FLAG_SENSITIVE = 'sensitive';
    const FLAG_CONTROVERSIAL = 'controversial';
    const FLAG_POLITICAL = 'political';
    const FLAG_CRIMINAL = 'criminal';
    const FLAG_PUBLIC_FIGURE = 'public_figure';

    /**
     * @var array Validation rules
     */
    public $rules = [
        'person_id' => 'required|integer|exists:reuniors_botovi_people,id',
        'flagged_by' => 'required|integer|exists:users,id',
        'flag_type' => 'required|in:inaccurate_data,accurate_data,not_bot,not_cacija,is_bot,is_cacija,wrong_category,duplicate,outdated,misleading,inappropriate,know_person,dont_know_person,verified,unverified,sensitive,controversial,political,criminal,public_figure',
        'status' => 'in:pending,approved,rejected',
    ];

    protected $fillable = [
        'person_id',
        'flagged_by',
        'flag_type',
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
        'flagger' => ['Winter\User\Models\User', 'key' => 'flagged_by'],
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
        return $query->where('flag_type', $type);
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

    // Accessors
    public function getIsPositiveFlagAttribute()
    {
        return in_array($this->flag_type, [
            self::FLAG_ACCURATE_DATA,
            self::FLAG_VERIFIED,
            self::FLAG_KNOW_PERSON,
        ]);
    }

    public function getIsNegativeFlagAttribute()
    {
        return in_array($this->flag_type, [
            self::FLAG_INACCURATE_DATA,
            self::FLAG_NOT_BOT,
            self::FLAG_NOT_CACIJA,
            self::FLAG_DUPLICATE,
            self::FLAG_OUTDATED,
            self::FLAG_MISLEADING,
            self::FLAG_INAPPROPRIATE,
            self::FLAG_DONT_KNOW_PERSON,
            self::FLAG_UNVERIFIED,
        ]);
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
