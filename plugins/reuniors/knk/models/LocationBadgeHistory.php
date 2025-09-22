<?php namespace Reuniors\Knk\Models;

use Model;
use October\Rain\Database\Traits\Validation;
use Reuniors\Knk\Http\ActionsFe\V1\Tag\FeGetOneTagGroupAction;

/**
 * Model
 */
class LocationBadgeHistory extends Model
{
    use Validation;


    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_knk_location_badges_history';

    /**
     * @var array Validation rules
     */
    public $rules = [];

    protected $fillable = [
        'location_id',
        'tag_id',
        'tag_group_id',
        'selected_count',
    ];

    public $belongsTo = [
        'location' => [
            'Reuniors\Knk\Models\Location',
            'order' => 'name'
        ],
        'tag' => [
            'Reuniors\Base\Models\Tag',
            'order' => 'name'
        ],
        'tag_group' => [
            'Reuniors\Base\Models\TagGroup',
            'order' => 'name'
        ],
    ];

    public $hasOne = [
        'user_badge_history' => [
            'Reuniors\Knk\Models\UserBadgeHistory',
            'key' => 'location_badge_history_id'
        ]
    ];

    public $hasMany = [
        'users_badges_history' => [
            'Reuniors\Knk\Models\UserBadgeHistory',
            'key' => 'location_badge_history_id'
        ]
    ];

    protected static function boot()
    {
        parent::boot();

        static::created(function ($model) {
            if ($model->tag_group_id && $tagGroup = FeGetOneTagGroupAction::run([
                'id' => $model->tag_group_id,
                'name' => 'cenaPoOsobi'
            ])) {
                $location = $model->location->first();
                $tag = $model->tag->first();
                $tagValue = $tag->value ?? 0;

                if ($location && $tagValue) {
                    NeedUpdate::createForLocation($location->id);
                }
            }
        });
    }
}
