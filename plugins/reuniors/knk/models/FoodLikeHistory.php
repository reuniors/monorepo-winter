<?php namespace Reuniors\Knk\Models;

use Model;
use Auth;
use October\Rain\Database\Traits\Validation;

/**
 * Model
 */
class FoodLikeHistory extends Model
{
    use Validation;

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_knk_food_likes_history';

    /**
     * @var array Validation rules
     */
    public $rules = [];

    public $belongsTo = [
        'food' => Food::class,
    ];

    protected $fillable = ['user_id', 'food_id'];

    public function scopeIsUser($query)
    {
        $user = Auth::check() ? Auth::getUser() : null;
        if ($user) {
            $query->where('user_id', $user->id);
        } else {
            $query->where('user_id', -1);
        }
    }

    public static function boot()
    {
        parent::boot();

        static::created(function ($like) {
            $like->food->increment('like_count');
        });

        static::deleted(function ($like) {
            $like->food->decrement('like_count');
        });
    }
}
