<?php namespace Reuniors\Botovi\Models;

use Model;
use Winter\Storm\Database\Traits\SoftDelete;
use Winter\Storm\Database\Traits\Validation;

/**
 * PersonComment Model
 */
class PersonComment extends Model
{
    use Validation;
    use SoftDelete;

    protected $dates = ['deleted_at'];

    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_botovi_person_comments';

    /**
     * @var array Validation rules
     */
    public $rules = [
        'person_id' => 'required|integer|exists:reuniors_botovi_people,id',
        'user_id' => 'nullable|integer|exists:users,id',
        'content' => 'required|string|max:1000',
        'status' => 'in:pending,approved,rejected',
    ];

    protected $fillable = [
        'person_id',
        'user_id',
        'content',
        'is_anonymous',
        'status',
        'rejection_reason',
        'admin_notes',
    ];

    protected $casts = [
        'is_anonymous' => 'boolean',
    ];

    public $belongsTo = [
        'person' => ['Reuniors\Botovi\Models\Person'],
        'user' => ['Winter\User\Models\User'],
    ];

    // Scopes
    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeRejected($query)
    {
        return $query->where('status', 'rejected');
    }

    public function scopeAnonymous($query)
    {
        return $query->where('is_anonymous', true);
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

    // Methods
    public function approve($adminNotes = null)
    {
        $this->status = 'approved';
        $this->admin_notes = $adminNotes;
        $this->save();
    }

    public function reject($rejectionReason, $adminNotes = null)
    {
        $this->status = 'rejected';
        $this->rejection_reason = $rejectionReason;
        $this->admin_notes = $adminNotes;
        $this->save();
    }

    // Accessors
    public function getAuthorNameAttribute()
    {
        if ($this->is_anonymous) {
            return 'Anonimni korisnik';
        }
        return $this->user ? $this->user->name : 'Nepoznat korisnik';
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

        static::created(function ($comment) {
            // Update person comment count (if approved)
            if ($comment->status === 'approved') {
                $person = $comment->person;
                $person->increment('comment_count');
                $person->last_activity_at = now();
                $person->save();
            }
        });

        static::updated(function ($comment) {
            // Handle status changes
            if ($comment->isDirty('status')) {
                $person = $comment->person;
                if ($comment->status === 'approved' && $comment->getOriginal('status') !== 'approved') {
                    $person->increment('comment_count');
                } elseif ($comment->getOriginal('status') === 'approved' && $comment->status !== 'approved') {
                    $person->decrement('comment_count');
                }
                $person->save();
            }
        });

        static::deleted(function ($comment) {
            // Decrease person comment count
            if ($comment->status === 'approved') {
                $person = $comment->person;
                $person->decrement('comment_count');
                $person->save();
            }
        });
    }
}
