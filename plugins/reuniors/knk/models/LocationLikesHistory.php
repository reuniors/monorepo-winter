<?php
namespace Reuniors\Knk\Models;

use Winter\Storm\Database\Traits\Validation;
use Winter\Storm\Support\Str;
use Model;

/**
 * Model
 */
class LocationLikesHistory extends Model
{
    use Validation;

    public $incrementing = false;

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_knk_location_likes_history';

    /**
     * @var array Validation rules
     */
    public $rules = [];

    protected $fillable = [
        'user_id',
        'location_id',
        'city_id',
    ];

    public $belongsTo = [
        'location' => Location::class,
        'city' => RegionCity::class,
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($like) {
            if ($like->id == null) {
                $like->id = Str::uuid();
            }
        });

        static::created(function ($like) {
            $like->location->increment('likes_count');
            // Update profile likes count
            $profile = Profile::where('user_id', $like->user_id)->first();
            if ($profile) {
                $profile->increment('likes_count');
            }
        });

        static::deleted(function ($like) {
            $like->location->decrement('likes_count');
            // Update profile likes count
            $profile = Profile::where('user_id', $like->user_id)->first();
            if ($profile) {
                $profile->likes_count = max(0, $profile->likes_count - 1);
                $profile->save();
            }
        });
    }
}
