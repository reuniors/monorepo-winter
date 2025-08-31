<?php namespace Reuniors\Knk\Models;

use Model;
use Winter\Storm\Database\Traits\Validation;

/**
 * Model
 */
class StoryHistory extends Model
{
    use Validation;

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_knk_story_history';

    /**
     * @var array Validation rules
     */
    public $rules = [];

    protected $fillable = [
        'id',
        'location_id',
        'user_id',
        'activation_at',
        'deactivation_at',
        'title',
        'description',
        'url',
        'url_title',
        'attachment_type',
        'attachment_id',
    ];
}
