<?php
namespace Reuniors\Knk\Models;

use System\Models\File;
use Winter\User\Models\User;
use Model;

class Profile extends Model
{
    protected $table = 'reuniors_knk_profiles';

    protected $fillable = [
        'user_id',
        'reviews_count',
        'likes_count',
        'followers_count',
        'bio',
        'instagram_username',
        'tiktok_username',
        'youtube_channel',
        'is_food_critic',
        'is_verified'
    ];

    protected $casts = [
        'is_food_critic' => 'boolean',
        'is_verified' => 'boolean',
        'reviews_count' => 'integer',
        'likes_count' => 'integer',
        'followers_count' => 'integer'
    ];

    public $belongsTo = [
        'user' => [User::class]
    ];

    public $belongsToMany = [
        'food_categories' => [
            FoodCategory::class,
            'table' => 'reuniors_knk_profiles_food_categories',
            'key' => 'profile_id',
            'otherKey' => 'food_category_id'
        ],
        'dietary_tags' => [
            Tag::class,
            'table' => 'reuniors_knk_profiles_dietary_tags',
            'key' => 'profile_id',
            'otherKey' => 'tag_id'
        ],
        'following' => [
            Profile::class,
            'table' => 'reuniors_knk_profiles_followers',
            'key' => 'follower_user_id',
            'otherKey' => 'user_id',
            'pivot' => ['created_at']
        ]
    ];

    public $attachOne = [
        'avatar' => ['System\Models\File']
    ];

    public $hasMany = [
        'location_likes_history' => [
            'Reuniors\Knk\Models\LocationLikesHistory',
            'key' => 'user_id',
            'otherKey' => 'user_id'
        ],
        'followers' => [
            ProfileFollower::class,
            'key' => 'profile_id'
        ]
    ];

    public $hasManyThrough = [
        'location_rating_history' => [
            'Reuniors\Knk\Models\LocationRatingHistory',
            'through' => User::class,
            'key' => 'id',
            'otherKey' => 'user_id'
        ],
        'favorite_locations' => [
            'Reuniors\Knk\Models\LocationLikesHistory',
            'through' => User::class,
            'key' => 'id',
            'otherKey' => 'user_id'
        ], 'secondKey' => 'user_id'
    ];

    public function getAvatarUrlAttribute()
    {
        return $this->avatar ? $this->avatar->getPublicPath() : null;
    }

    public function getFirstNameAttribute()
    {
        return $this->user ? $this->user->first_name : null;
    }

    public function getLastNameAttribute()
    {
        return $this->user ? $this->user->last_name : null;
    }

    public function getNicknameAttribute()
    {
        return $this->user ? $this->user->nickname : null;
    }

    public function getFollowersCountAttribute()
    {
        return $this->followers()->count();
    }

    public function getFollowingCountAttribute()
    {
        return $this->following()->count();
    }

    public function isFollowedBy($userId)
    {
        return $this->followers()->where('follower_user_id', $userId)->exists();
    }

    public function isFollowing($profileId)
    {
        return $this->following()->where('profile_id', $profileId)->exists();
    }
}
