<?php namespace Reuniors\Knk\Models;

use Illuminate\Support\Collection;
use Model;

/**
 * Model
 * @method Collection|FoodCategory[] food_categories
 */
class RestaurantMenu extends Model
{
    use \October\Rain\Database\Traits\Validation;
    use \October\Rain\Database\Traits\SoftDelete;
    use \October\Rain\Database\Traits\Sortable;

    const SORT_ORDER = 'sort_order';

    protected $dates = ['deleted_at'];

    public $implement = ['RainLab.Translate.Behaviors.TranslatableModel'];
    public $translatable = [
        'title',
        ['slug', 'index' => true]
    ];

    protected $fillable = [
        'name',
        'title',
        'slug',
        'sort_order',
        'identifier',
        'outsource',
        'outsource_code',
        'relations_updated_at',
        'active',
    ];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_knk_restaurant_menu';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];

    public $belongsToMany = [
        'food_categories' => [
            'Reuniors\Knk\Models\FoodCategory',
            'table' => 'reuniors_knk_restaurant_menu_food_categories',
            'order' => 'sort_order',
            'delete' => true
        ],
        'locations' => [
            'Reuniors\Knk\Models\Location',
            'table' => 'reuniors_knk_locations_restaurant_menu',
            'order' => 'priority',
        ]
    ];

    public $hasMany = [
        'change_actions' => [
            'Reuniors\Knk\Models\Action',
            'key' => 'restaurant_menu_id',
        ]
    ];

    public function scopeFoodMenu($query, $options)
    {
        /**
         * Default options
         * @var $locationSlug
         * @var $id
         * @var $allAddonGroups
         */
        extract(array_merge([
            'locationSlug'          => null,
            'id' => null,
            'allAddonGroups' => null,
        ], $options));

        if ($locationSlug !== null) {
            $query->whereHas('locations', function ($locationQuery) use ($locationSlug) {
                $locationQuery->where('slug', $locationSlug);
            });
        }
        if ($id !== null) {
            $query->where('id', $id);
        }

        return $query->with([
            'food_categories',
            'food_categories.foods',
            'food_categories.foods.food_size_prices',
            'food_categories.foods.food_image',
            'food_categories.foods.food_addon_groups' => function ($query) use ($allAddonGroups) {
                if (!$allAddonGroups) {
                    $query->where('type', 'size');
                }
            },
            'food_categories.foods.food_addon_groups.food_addons',
            'food_categories.foods.food_addon_groups.food_addons.food_addon_group',
        ]);
    }

    public function scopeGetFiltered($query, $options)
    {
        /**
         * Default options
         * @var $locationSlug
         */
        extract(array_merge([
            'locationSlug'          => null,
        ], $options));

        if ($locationSlug !== null) {
            $query->whereHas('locations', function ($locationQuery) use ($locationSlug) {
                $locationQuery->where('slug', $locationSlug);
            });
        }

        return $query;
    }

    public static function deleteMenuAndRelations($menuSlug)
    {
        $restaurantMenu = self::where('slug', $menuSlug)
            ->with([
                'food_categories',
                'food_categories.foods',
                'food_categories.foods.food_addon_groups',
                'food_categories.foods.food_size_prices',
            ])
            ->first();
        if ($restaurantMenu) {
            $restaurantMenu->runDeleteMenuAndRelations();
        }
    }

    public function runDeleteMenuAndRelations()
    {
        $this->load([
            'food_categories',
            'food_categories.foods',
            'food_categories.foods.food_image',
            'food_categories.foods.food_addon_groups',
            'food_categories.foods.food_size_prices',
        ]);
        if ($this->food_categories) {
            foreach ($this->food_categories as $foodCategory) {
                if ($foodCategory->foods) {
                    foreach ($foodCategory->foods as $food) {
                        if ($food->food_addon_groups) {
                            foreach ($food->food_addon_groups as $foodAddon) {
                                $foodAddon->delete();
                            }
                        }
                        if ($food->food_size_prices) {
                            foreach ($food->food_size_prices as $foodPrice) {
                                $foodPrice->delete();
                            }
                        }
                        if ($food->food_image) {
                            $food->food_image->delete();
                        }
                        $food->delete();
                    }
                }
                $foodCategory->delete();
            }
        }
        $this->delete();
    }

    /**
     * @param self $restaurantMenu
     */
    public static function fixMenuPrices(?self $restaurantMenu)
    {
        if (!$restaurantMenu) {
            return $restaurantMenu;
        }
        $restaurantMenu->food_categories->each(function ($foodCategory) {
            /** @var FoodCategory $foodCategory */
            $foodCategory->foods->each(function ($food) {
                Food::populateAddonPrices($food);
            });
        });
        return $restaurantMenu;
    }

    public function withFixedMenuPrices()
    {
        return self::fixMenuPrices($this);
    }
}
