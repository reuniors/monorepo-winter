<?php namespace Reuniors\Botovi\Models;

use Model;
use Winter\Storm\Database\Traits\Validation;

/**
 * EventLike Model
 */
class EventLike extends Model
{
    use Validation;

    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_botovi_event_likes';

    /**
     * @var array Validation rules
     */
    public $rules = [
        'event_id' => 'required|string|exists:reuniors_botovi_events,id',
        'user_id' => 'required|integer|exists:users,id',
    ];

    protected $fillable = [
        'event_id',
        'user_id',
    ];

    public $belongsTo = [
        'event' => ['Reuniors\Botovi\Models\Event'],
        'user' => ['Winter\User\Models\User'],
    ];

    // Scopes
    public function scopeByUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    public function scopeByEvent($query, $eventId)
    {
        return $query->where('event_id', $eventId);
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

        static::created(function ($eventLike) {
            // Update event like count
            $event = $eventLike->event;
            $event->increment('likes_count');
            $event->save();
        });

        static::deleted(function ($eventLike) {
            // Decrease event like count
            $event = $eventLike->event;
            $event->decrement('likes_count');
            $event->save();
        });
    }
}
