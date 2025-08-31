<?php namespace Reuniors\Knk\Models;

use Model;
use Winter\Storm\Database\Traits\Validation;
use Winter\User\Models\User;
use Winter\Storm\Support\Str;

/**
 * Model
 */
class Story extends Model
{
    use Validation;

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_knk_stories';

    /**
     * @var array Validation rules
     */
    public $rules = [];

    protected $fillable = [
        'activation_at',
        'deactivation_at',
        'title',
        'description',
        'url',
        'url_title',
        'attachment_type',
        'attachment_id',
    ];

    protected $hidden = [
        'attachment_type',
        'attachment_id',
    ];

    public $belongsTo = [
        'location' => [Location::class, 'key' => 'location_id'],
        'user' => [User::class, 'key' => 'user_id'],
        'videoReview' => [
            LocationVideoReview::class,
            'key' => 'attachment_id',
            'conditions' => 'attachment_type = "video_review"'
        ]
    ];

    public $attachOne = [
        'image' => 'System\Models\File',
    ];

    protected $dates = [
        'activation_at',
        'deactivation_at',
    ];

    public static function boot()
    {
        parent::boot();

        self::creating(function ($model) {
            $model->id = Str::uuid();
        });

        self::deleting(function ($model) {
            $model->image->delete();

            $storyHistory = new StoryHistory();
            $storyHistory->fill($model->attributes);
            $storyHistory->save();
        });
    }
}
