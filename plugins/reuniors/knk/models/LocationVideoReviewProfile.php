<?php
namespace Reuniors\Knk\Models;

use Model;
use Winter\Storm\Database\Traits\SoftDelete;
use Winter\Storm\Database\Traits\Validation;

/**
 * Model
 */
class LocationVideoReviewProfile extends Model
{
    use Validation;

    use SoftDelete;

    protected $dates = ['deleted_at'];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_knk_location_video_review_profiles';

    /**
     * @var array Validation rules
     */
    public $rules = [];

    protected $fillable = [
        'source',
        'username',
        'author_url',
        'author_name',
        'author_photo',
        'profile_id'
    ];

    public $hasMany = [
        'location_video_reviews' => [
            LocationVideoReview::class,
            'key' => 'profile_id'
        ],
    ];

    public $belongsTo = [
        'profile' => [
            Profile::class,
            'key' => 'profile_id'
        ]
    ];

    public $attachOne = [
        'video_author_photo' => ['System\Models\File', 'delete' => true],
    ];
}
