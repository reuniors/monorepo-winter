<?php namespace Reuniors\Botovi\Models;

use Model;
use Winter\Storm\Database\Traits\Validation;

/**
 * PersonView Model
 */
class PersonView extends Model
{
    use Validation;

    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_botovi_person_views';

    /**
     * @var array Validation rules
     */
    public $rules = [
        'person_id' => 'required|integer|exists:reuniors_botovi_people,id',
        'user_id' => 'nullable|integer|exists:users,id',
        'ip_address' => 'nullable|ip',
    ];

    protected $fillable = [
        'person_id',
        'user_id',
        'ip_address',
        'user_agent',
    ];

    public $belongsTo = [
        'person' => ['Reuniors\Botovi\Models\Person'],
        'user' => ['Winter\User\Models\User'],
    ];

    // Scopes
    public function scopeByUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    public function scopeByPerson($query, $personId)
    {
        return $query->where('person_id', $personId);
    }

    public function scopeByIp($query, $ipAddress)
    {
        return $query->where('ip_address', $ipAddress);
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

        static::created(function ($view) {
            // Update person view count
            $person = $view->person;
            $person->increment('view_count');
            $person->last_activity_at = now();
            $person->save();
        });
    }
}
