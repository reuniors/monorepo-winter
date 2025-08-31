<?php
namespace Reuniors\Knk\Models;

use Winter\Storm\Support\Str;
use Model;

class ProfileFollower extends Model
{
    protected $table = 'reuniors_knk_profiles_followers';

    protected $fillable = [
        'follower_user_id',
        'profile_id'
    ];

    public $belongsTo = [
        // 'follower' => ['Winter\User\Models\User', 'key' => 'follower_user_id'],
        // 'profile' => ['Reuniors\Knk\Models\Profile']
        'follower' => [Profile::class, 'key' => 'follower_user_id', 'otherKey' => 'user_id'],
        'profile' => [Profile::class]
    ];

    protected static function boot()
    {
        parent::boot();

        static::created(function ($follower) {
            $follower->profile->increment('followers_count');
        });

        static::deleted(function ($follower) {
            $follower->profile->decrement('followers_count');
        });
    }
}
