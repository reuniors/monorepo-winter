<?php
namespace Reuniors\Knk\Models;

use October\Rain\Database\Traits\Validation;
use Reuniors\Knk\Models\Profile;
use Winter\User\Models\User;
use Auth;

/**
 * Model
 */
class LocationRatingHistory extends MariaDbBase
{
    use Validation;

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_knk_location_rating_history';

    /**
     * @var array Validation rules
     */
    public $rules = [];

    protected $fillable = [
        'location_rating_id',
        'location_id',
        'user_id',
        'ip_address',
        'user_agent',
        'grade',
    ];

    public function scopeByUser($query)
    {
        if (Auth::check()) {
            $user = Auth::getUser();
            $query->where('user_id', $user->id);
        }
    }

    public function getRatingRoundedFiveAttribute()
    {
        return isset($this->avg_grade)
            ? round($this->avg_grade * 10 / 5) * 5
            : null;
    }

    public function scopeGroupByUser($query)
    {
        $query->groupBy('user_id');
    }

    public $belongsTo = [
        'user' => [User::class],
        'location' => [Location::class],
        'location_rating' => [LocationRating::class],
        'comment' => ['Reuniors\Comments\Models\Comments', 'key' => 'user_id', 'otherKey' => 'user_id'],
        'profile' => [Profile::class, 'key' => 'user_id', 'otherKey' => 'user_id'],
    ];

    public $old_grade = 0;

    public function updateRatingData($action = 'created')
    {
        $locationRating = $this->location_rating;
        $location = $this->location;

        switch ($action) {
            case 'created':
                $locationRating->grade =
                    ($locationRating->grade * $locationRating->counter + $this->grade) / ($locationRating->counter + 1);
                $locationRating->counter += 1;
                $locationRating->save();

                $location->rating_average_grade =
                    ($location->rating_average_grade * $location->rating_count + $this->grade) / ($location->rating_count + 1);
                $location->rating_count += 1;
                $location->save();
                break;
            case 'deleted':
                $locationRating->grade =
                    ($locationRating->grade * $locationRating->counter - $this->grade) / ($locationRating->counter - 1);
                $locationRating->counter -= 1;
                $locationRating->save();

                $location->rating_average_grade =
                    ($location->rating_average_grade * $location->rating_count - $this->grade) / ($location->rating_count - 1);
                $location->rating_count -= 1;
                $location->save();
                break;
            case 'updated':
                $originalGrade = $this->old_grade;
                $locationRating->grade =
                    ($locationRating->grade * $locationRating->counter - $originalGrade + $this->grade) / $locationRating->counter;
                $locationRating->save();

                $location->rating_average_grade =
                    ($location->rating_average_grade * $location->rating_count - $originalGrade + $this->grade) / $location->rating_count;
                $location->save();
                break;
        }
    }

    protected static function boot()
    {
        parent::boot();

        static::created(function ($locationRatingHistory) {
            $locationRatingHistory->updateRatingData('created');
            // Update profile reviews count
            $profile = Profile::where('user_id', $locationRatingHistory->user_id)->first();
            if ($profile) {
                $profile->increment('reviews_count');
            }
        });

        static::deleted(function ($locationRatingHistory) {
            $locationRatingHistory->updateRatingData('deleted');
            // Update profile reviews count
            $profile = Profile::where('user_id', $locationRatingHistory->user_id)->first();
            if ($profile) {
                $profile->reviews_count = max(0, $profile->reviews_count - 1);
                $profile->save();
            }
        });

        static::updating(function ($locationRatingHistory) {
            $locationRatingHistory->old_grade = $locationRatingHistory->getOriginal('grade');
        });

        static::updated(function ($locationRatingHistory) {
            $locationRatingHistory->updateRatingData('updated');
        });
    }
}
