<?php namespace Reuniors\Knk\Models;

use Model;

/**
 * Model
 */
class Action extends Model
{
    use \October\Rain\Database\Traits\Validation;

    use \October\Rain\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at'];

    protected $attachmentTypeMapper = [
      'foodAddon' => 'Reuniors\Knk\Models\FoodAddon'
    ];

    const STATUS_CREATED = 'created';
    const STATUS_SUCCESS = 'success';
    const STATUS_FAIL = 'fail';

    public static $availableStatuses = [
        self::STATUS_CREATED,
        self::STATUS_SUCCESS,
        self::STATUS_FAIL,
    ];

    public $belongsTo = [
        'location' => [
            'Reuniors\Knk\Models\Location',
            'order' => 'name'
        ],
    ];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_knk_actions';

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
        'attach_to_id',
        'attach_to_type',
        'attach_to_relation_name',
        'created_by',
        'restaurant_menu_id'
    ];

    public $hidden = [
        'attachment_type'
    ];

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

    public $jsonable = ['data', 'old_data'];

    public function performActionDataToModel()
    {
        $modelData = $this->attachment_type::setActionDataWrapper(
            $this->data,
            $this->attachment_id,
            $this->action_type,
            $this->attach_to_relation_name,
            $this->attach_to_id
        );
        $this->old_data = $modelData->attributesToArray();
        $modelData->saveActionData();
        $this->status = Action::STATUS_SUCCESS;
        $this->failure_reason = null;
        $this->forceSave();
        $this->moveToActionHistory();
    }

    public function moveToActionHistory()
    {
        $attributes = $this->makeVisible('attachment_type')->attributesToArray();
        unset($attributes['id']);
        unset($attributes['updated_at']);
        unset($attributes['created_at']);
        unset($attributes['deleted_at']);
        ActionHistory::create($attributes);
        $this->delete();
    }

    public static $entityTypeModel = [
        'food_category' => FoodCategory::class,
        'food' => Food::class,
        'food_addon_group' => FoodAddonGroup::class,
        'food_addon' => FoodAddon::class,
    ];

    public static $entityTypeAttachTo = [
        'food_addon_group' => [
            'type' => Food::class,
            'relation_name' => 'food_addon_groups',
        ],
    ];
}
