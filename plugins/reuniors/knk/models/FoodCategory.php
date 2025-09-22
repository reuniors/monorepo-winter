<?php namespace Reuniors\Knk\Models;

use October\Rain\Database\Traits\Sortable;
use Reuniors\Knk\ModelExtenders\ModelActionDataExtender;
use Reuniors\Knk\Models\Action\ActionData;

/**
 * Model
 */
class FoodCategory extends MariaDbBase
{
    use \October\Rain\Database\Traits\Validation;
    use \October\Rain\Database\Traits\SoftDelete;
    use Sortable;
    use ModelActionDataExtender;

    const SORT_ORDER = 'sort_order';

    protected $dates = ['deleted_at'];

    protected $jsonable = ['metadata', 'metadata_t'];

    public $implement = ['RainLab.Translate.Behaviors.TranslatableModel'];
    public $translatable = [
        'description',
        'title',
        'metadata_t',
        ['slug', 'index' => true]
    ];

    public $fillable = [
        'name',
        'title',
        'slug',
        'description',
        'active',
        'parent_id',
        'sort_order',
    ];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_knk_food_categories';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];

    public $hasMany = [
        'foods' => ['Reuniors\Knk\Models\Food', 'order' => 'sort_order', 'delete' => true]
    ];

    public $belongsToMany = [
        'restaurant_menus' => [
            'Reuniors\Knk\Models\RestaurantMenu',
            'table' => 'reuniors_knk_restaurant_menu_food_categories',
            'order' => 'name',
        ],
        'locations' => [
            'Reuniors\Knk\Models\Location',
            'table' => 'reuniors_knk_locations_food_categories',
            'order' => 'sort_order',
        ],
    ];

    public $belongsTo = [
        'parent' => [
            self::class,
            'order' => 'name'
        ],
        'tag' => ['Reuniors\Base\Models\Tag', 'order' => 'name'],
    ];

    public $restaurant_menu_id_inject;

    public function scopeFilterByRestaurantMenu($query, $foodCategoryModel)
    {
        $restaurantMenuId = $foodCategoryModel->restaurant_menu_id_inject;
        if (!empty($restaurantMenuId)) {
            $query->whereHas('restaurant_menus', function ($restaurantMenuQuery) use ($restaurantMenuId) {
                $restaurantMenuQuery->where('id', $restaurantMenuId);
            });
        }
    }

    public function setActionData(array $data, $actionType = null)
    {
        $this->actionData = (new ActionData())
            ->addToDataMapper('title')
            ->addToDataMapper('name')
            ->addToDataMapper('slug')
            ->addToDataMapper('active')
            ->addToDataMapper('description')
            ->setData($data);
    }

    public function setPivotActionData(array $pivotData, $attachToRelationName, $attachToId)
    {
        // TODO: Implement setPivotActionData() method.
    }
}
