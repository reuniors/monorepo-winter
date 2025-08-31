<?php namespace Reuniors\Knk\Models;

use Model;
use Reuniors\Knk\ModelExtenders\ModelActionDataExtender;
use Reuniors\Knk\Models\Action\ActionData;

/**
 * Model
 */
class FoodAddonGroup extends MariaDbBase
{
    use \October\Rain\Database\Traits\Validation;
    use \October\Rain\Database\Traits\SoftDelete;
    use \October\Rain\Database\Traits\Sortable;
    use ModelActionDataExtender;

    const SORT_ORDER = 'sort_order';

    protected $dates = ['deleted_at'];

    const GROUP_TYPES = [
        'size' => 'Size',
        'other' => 'Other',
    ];

    const COMBINE_TYPES = [
        'combined' => 'Combined',
        'exclusively' => 'Exclusively'
    ];

    const INPUT_TYPES = [
        'checkbox' => 'Checkbox',
        'radio' => 'Radio',
        'select' => 'Select',
    ];

    public $fillable = [
        'name',
        'title',
        'combine_type',
        'priority',
        'max_addons',
        'sort_order',
        'identifier',
        'type',
        'input_type',
        'min_required',
        'other_addons',
        'is_required',
        'depends_on_addons',
    ];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_knk_food_addon_groups';

    /**
     * @var array Validation rules
     */
    public $rules = [];

    public $appends = ['main_food_category_id'];

    public $hidden = ['foods'];

    public $jsonable = ['depends_on_addons'];

    public function getCombineTypeOptions()
    {
        return self::COMBINE_TYPES;
    }

    public function getTypeOptions()
    {
        return self::GROUP_TYPES;
    }

    public function getInputTypeOptions()
    {
        return self::INPUT_TYPES;
    }

    public $hasMany = [
        'food_addons' => [
            'Reuniors\Knk\Models\FoodAddon',
            'order' => 'sort_order',
            'delete' => true,
        ],
    ];

    public $belongsToMany = [
        'foods' => [
            'Reuniors\Knk\Models\Food',
            'table' => 'reuniors_knk_foods_food_addon_groups',
            'pivot' => ['active'],
            'order' => 'sort_order',
        ],
    ];

    protected function getFilteredQueryByRestaurantMenuIds($query, array $restaurantMenuIds)
    {
        if (!empty($restaurantMenuIds)) {
            return $query->whereHas(
                'foods',
                function ($foodQuery) use ($restaurantMenuIds) {
                    $foodQuery->whereHas(
                        'food_category',
                        function ($foodCategoryQuery) use ($restaurantMenuIds) {
                            $foodCategoryQuery->whereHas(
                                'restaurant_menus',
                                function ($restaurantMenu) use ($restaurantMenuIds) {
                                    $restaurantMenu->whereIn('id', $restaurantMenuIds);
                                }
                            );
                        }
                    );
                }
            );
        }
    }

    public function scopeFilterByFoodMenu($query, $foodModel)
    {
        $foodCategoryModel = $foodModel->food_category;
        if (!empty($foodCategoryModel)) {
            $restaurantMenuIds = $foodCategoryModel
                ->restaurant_menus
                ->pluck('id');
            if (!empty($restaurantMenuIds)) {
                $this->getFilteredQueryByRestaurantMenuIds($query, $restaurantMenuIds->toArray());
            }
        }
    }

    public function scopeFilterByRestaurantMenuId($query, $restaurantMenuId)
    {
        $this->getFilteredQueryByRestaurantMenuIds($query, [$restaurantMenuId]);
    }

    public function getMainFoodCategoryIdAttribute()
    {
        if ($this->relationLoaded('foods') && $food = $this->foods->first()) {
            if ($food && $food->food_category) {
                return $food->food_category->id;
            }
        }
        return null;
    }

    public function setActionData(array $data, $actionType = null)
    {
        $this->actionData = (new ActionData())
            ->addToDataMapper('title')
            ->addToDataMapper('name')
            ->addToDataMapper('active')
            ->addToDataMapper('combine_type')
            ->addToDataMapper('max_addons')
            ->addToDataMapper('input_type')
            ->addToDataMapper('type')
            ->addToDataMapper('min_required')
            ->addToDataMapper('is_required')
            ->addToPivotDataMapper('active', 'foods')
            ->setData($data);
    }

    public function setPivotActionData(array $pivotData, $attachToRelationName, $attachToId)
    {
        $this->actionData = (new ActionData())
            ->addToPivotDataMapper('active', 'foods')
            ->setPivotData($pivotData, $attachToRelationName, $attachToId);
    }
}
