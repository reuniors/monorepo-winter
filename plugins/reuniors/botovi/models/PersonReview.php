<?php namespace Reuniors\Botovi\Models;

use Model;
use Winter\Storm\Database\Traits\SoftDelete;
use Winter\Storm\Database\Traits\Validation;

/**
 * PersonReview Model
 */
class PersonReview extends Model
{
    use Validation;
    use SoftDelete;

    protected $dates = ['deleted_at'];

    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_botovi_person_reviews';

    /**
     * @var array Validation rules
     */
    public $rules = [
        'person_id' => 'required|integer|exists:reuniors_botovi_people,id',
        'user_id' => 'required|integer|exists:users,id',
        'rating' => 'required|integer|min:1|max:10',
        'comment' => 'nullable|string|max:1000',
        'status' => 'in:pending,approved,rejected',
    ];

    protected $fillable = [
        'person_id',
        'user_id',
        'rating',
        'comment',
        'status',
        'admin_notes',
    ];

    protected $casts = [
        'rating' => 'integer',
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

    public function scopeByUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    public function scopeByPerson($query, $personId)
    {
        return $query->where('person_id', $personId);
    }

    public function scopeByRating($query, $rating)
    {
        return $query->where('rating', $rating);
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

    public function reject($adminNotes = null)
    {
        $this->status = 'rejected';
        $this->admin_notes = $adminNotes;
        $this->save();
    }

    // Accessors
    public function getStarRatingAttribute()
    {
        return str_repeat('★', $this->rating) . str_repeat('☆', 10 - $this->rating);
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

        static::created(function ($review) {
            // Update person review count and average rating
            if ($review->status === 'approved') {
                $person = $review->person;
                $person->increment('reviews_count');
                $this->updatePersonRating($person);
            }
        });

        static::updated(function ($review) {
            // Handle status changes
            if ($review->isDirty('status')) {
                $person = $review->person;
                if ($review->status === 'approved' && $review->getOriginal('status') !== 'approved') {
                    $person->increment('reviews_count');
                } elseif ($review->getOriginal('status') === 'approved' && $review->status !== 'approved') {
                    $person->decrement('reviews_count');
                }
                $this->updatePersonRating($person);
            }
        });

        static::deleted(function ($review) {
            // Decrease person review count
            if ($review->status === 'approved') {
                $person = $review->person;
                $person->decrement('reviews_count');
                $this->updatePersonRating($person);
            }
        });
    }

    private function updatePersonRating($person)
    {
        $approvedReviews = $person->reviews()->approved()->get();
        if ($approvedReviews->count() > 0) {
            $averageRating = $approvedReviews->avg('rating');
            $person->rating_average = round($averageRating, 2);
        } else {
            $person->rating_average = 0.00;
        }
        $person->save();
    }
}
