<?php

namespace Reuniors\Comments\Models;

use October\Rain\Database\Traits\Validation;
use Reuniors\Knk\Models\LocationBadgeHistory;
use Reuniors\Knk\Models\LocationRatingHistory;
use Winter\Storm\Support\Str;
use Model;

/**
 * Model
 */
class Comments extends Model
{
    use Validation;

    const STATUS = ['1' => 'Approved', '2' => 'Pending', '3' => 'Spam'];

    const STATUS_APPROVED = 1;

    const STATUS_PENDING = 2;

    /*
     * Validation
     */

    /**
     * @var array
     */
    public $rules = [
        'author' => 'alpha|min:2|max:25',
        'email' => 'email',
        'content' => 'required|min:2|max:500'
    ];

    /*
     * Disable timestamps by default.
     * Remove this line if timestamps are defined in the database table.
     */
    //    public $timestamps = false;

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_comments_posts';

    public static $attachmentFields = ['location' => 'location'];

    /**
     * @var array
     */
    public $belongsTo = [
        'user' => [
            'RainLab\User\Models\User'
        ],
        'location' => [
            'Reuniors\Knk\Models\Location',
            'key' => 'attachment_id',
            'condition' => 'attachment_field = "location"'
        ],
        'profile' => [
            'Reuniors\Knk\Models\Profile',
            'key' => 'user_id',
            'otherKey' => 'user_id'
        ],
    ];

    public $hasOne = [
        'location_rating' => [
            'Reuniors\Knk\Models\LocationRatingHistory',
            'key' => 'user_id',
            'otherKey' => 'user_id',
            'scope' => 'groupByUser',
        ],
        'location_rating_history' => [
            LocationRatingHistory::class,
            'key' => 'user_id',
            'otherKey' => 'user_id',
            'scope' => 'groupByUser',
        ],
        'user_badge_history' => [
            LocationBadgeHistory::class,
            'key' => 'user_id',
            'otherKey' => 'user_id',
            'scope' => 'groupByUser',
        ],
    ];

    public $hasMany = [
        'likes_history' => [
            CommentsLikesHistory::class,
            'key' => 'comments_post_id',
            'otherKey' => 'id',
            'delete' => true,
        ],
    ];

    /**
     * @param null $keyValue
     * @return array
     */
    public function getStatusOptions($keyValue = null)
    {
        return self::STATUS;
    }

    /**
     * @return mixed
     */
    public function getStatusAdminAttribute()
    {
        return self::STATUS[$this->status];
    }

    /**
     * @return string
     */
    public function getAvatarAttribute()
    {
        return "<img class='img-fluid' src='https://eu.ui-avatars.com/api/?background=" . substr(md5($this->user->id), 0, 6) . '&color=fff&name=' . $this->getNameAttribute() . "'/>";
    }

    /**
     * @return mixed
     */
    public function getNameAttribute()
    {
        if ($this->author != '') {
            return $this->author;
        } elseif ($this->user) {
            return $this->user->name;
        }
        return 'Anonymous';
    }

    protected static function boot()
    {
        parent::boot();

        static::created(function ($like) {
            $like->location->increment('comments_count');
        });

        static::deleted(function ($like) {
            $like->location->decrement('comments_count');
        });
    }
}
