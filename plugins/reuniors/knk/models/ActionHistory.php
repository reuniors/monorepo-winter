<?php namespace Reuniors\Knk\Models;

use Model;

/**
 * Model
 */
class ActionHistory extends Model
{
    use \October\Rain\Database\Traits\Validation;

    use \October\Rain\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at'];

    public $fillable = [
        'attachment_type',
        'attachment_id',
        'action_type',
        'data',
        'status',
        'failure_reason',
        'location_id',
        'entity_type',
        'old_data',
        'created_by'
    ];

    public $jsonable = ['data', 'old_data'];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_knk_actions_history';

    /**
     * @var array Validation rules
     */
    public $rules = [
        'attachment_type' => 'required',
        'attachment_id' => 'required',
        'action_type' => 'required',
        'entity_type' => 'required',
        'location_id' => 'required',
    ];
}
