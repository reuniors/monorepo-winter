<?php namespace Reuniors\Knk\Models;

use Model;
use Winter\Storm\Database\Traits\Validation;

/**
 * Model
 */
class LocationVideoReviewImage extends Model
{
    use Validation;
    protected $primaryKey = 'video_review_id';

    /*
     * Disable timestamps by default.
     * Remove this line if timestamps are defined in the database table.
     */
    public $timestamps = false;


    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_knk_location_video_review_images';

    /**
     * @var array Validation rules
     */
    public $rules = [];

    protected $fillable = [
        'video_review_id',
        'thumbnail_base64',
    ];
}
