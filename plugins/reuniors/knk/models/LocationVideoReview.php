<?php namespace Reuniors\Knk\Models;

use Illuminate\Support\Facades\Storage;
use Model;
use reuniors\knk\Http\Actions\V1\File\GetFileContentAction;
use System\Classes\ImageResizer;
use Winter\Storm\Database\Traits\SoftDelete;
use Winter\Storm\Database\Traits\Validation;
use Illuminate\Support\Facades\File;
use System\Models\File as FileModel;
use Event;

/**
 * Model
 */
    class LocationVideoReview extends Model
{
    use Validation;

    use SoftDelete;

    protected $dates = ['deleted_at'];


    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_knk_location_video_reviews';

    /**
     * @var array Validation rules
     */
    public $rules = [];

    protected $fillable = [
        'source',
        'thumbnail_url',
        'thumbnail_width',
        'thumbnail_height',
        'source_eid',
        'source_url',
        'source_body',
        'profile_id',
        'location_id'
    ];

    protected $hidden = [
        'profile_id',
        'location_id'
    ];

    public $belongsTo = [
        'profile' => LocationVideoReviewProfile::class,
        'location' => Location::class,
    ];

    public $hasOne = [
        'image' => [
            LocationVideoReviewImage::class,
            'key' => 'video_review_id',
        ],
    ];

    public static function boot()
    {
        parent::boot();

        self::deleting(function($model) {
            $model->image?->delete();
        });

        self::created(function($model) {
            $url = $model->thumbnail_url;
            $image = new LocationVideoReviewImage();

            $content = GetFileContentAction::run([
                'url' => $url,
                'width' => 150,
                'height' => 150,
            ]);

            $image->thumbnail_base64 = base64_encode($content);
            $image->video_review_id = $model->id;
            $image->save();
        });
    }
}
