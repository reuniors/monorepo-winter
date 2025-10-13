<?php namespace Reuniors\Botovi\Models;

use Model;
use Winter\Storm\Database\Traits\Validation;

/**
 * PersonActivityLog Model
 */
class PersonActivityLog extends Model
{
    use Validation;

    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_botovi_person_activity_log';

    /**
     * @var array Validation rules
     */
    public $rules = [
        'person_id' => 'required|integer|exists:reuniors_botovi_people,id',
        'user_id' => 'nullable|integer|exists:users,id',
        'action' => 'required|string|max:100',
    ];

    protected $fillable = [
        'person_id',
        'user_id',
        'action',
        'description',
        'metadata',
        'ip_address',
        'user_agent',
    ];

    public $belongsTo = [
        'person' => ['Reuniors\Botovi\Models\Person'],
        'user' => ['Winter\User\Models\User'],
    ];

    // Scopes
    public function scopeByAction($query, $action)
    {
        return $query->where('action', $action);
    }

    public function scopeByUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    public function scopeByPerson($query, $personId)
    {
        return $query->where('person_id', $personId);
    }

    public function scopeRecent($query)
    {
        return $query->orderBy('created_at', 'desc');
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

        static::created(function ($activityLog) {
            // Update person last activity
            $person = $activityLog->person;
            $person->last_activity_at = now();
            $person->increment('update_count');
            $person->save();
        });
    }
}
