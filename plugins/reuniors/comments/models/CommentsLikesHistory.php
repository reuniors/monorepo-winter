<?php namespace Reuniors\Comments\Models;

use Model;
use Winter\Storm\Database\Traits\Validation;
use Winter\Storm\Support\Str;
use Winter\User\Models\User;

/**
 * Model
 */
class CommentsLikesHistory extends Model
{
    use Validation;


    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_comments_likes_history';

    /**
     * @var array Validation rules
     */
    public $rules = [];

    protected $fillable = ['comments_post_id', 'user_id'];

    public $belongsTo = [
        'comment' => [
            Comments::class,
            'key' => 'comments_post_id',
        ],
        'user' => User::class
    ];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($like) {
            if ($like->id == null) {
                $like->id = Str::uuid();
            }
        });

        static::created(function ($like) {
            $like->comment->increment('likes_count');
        });

        static::deleted(function ($like) {
            $like->comment->decrement('likes_count');
        });
    }
}
