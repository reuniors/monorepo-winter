<?php namespace Reuniors\Botovi\Models;

use Model;
use Winter\Storm\Database\Traits\SoftDelete;
use Winter\Storm\Database\Traits\Validation;

/**
 * Event Model
 */
class Event extends Model
{
    use Validation;
    use SoftDelete;

    protected $dates = ['deleted_at'];

    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_botovi_events';

    /**
     * @var array Validation rules
     */
    public $rules = [
        'person_id' => 'required|integer|exists:reuniors_botovi_people,id',
        'created_by' => 'required|integer|exists:users,id',
        'title' => 'required|string|max:255',
        'event_date' => 'required|date',
        'event_type' => 'required|in:meeting,interview,public_appearance,social_event,work_event,other',
        'status' => 'in:draft,published,archived',
    ];

    protected $fillable = [
        'person_id',
        'created_by',
        'title',
        'description',
        'event_date',
        'event_type',
        'location',
        'status',
        'likes_count',
    ];

    protected $casts = [
        'event_date' => 'datetime',
    ];

    public $belongsTo = [
        'person' => ['Reuniors\Botovi\Models\Person'],
        'creator' => ['Winter\User\Models\User', 'key' => 'created_by'],
    ];

    public $hasMany = [
        'likes' => ['Reuniors\Botovi\Models\EventLike'],
    ];

    // Scopes
    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    public function scopeByType($query, $type)
    {
        return $query->where('event_type', $type);
    }

    public function scopeUpcoming($query)
    {
        return $query->where('event_date', '>=', now());
    }

    public function scopePast($query)
    {
        return $query->where('event_date', '<', now());
    }

    public function scopeOrderByDate($query)
    {
        return $query->orderBy('event_date', 'desc');
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
