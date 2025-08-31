<?php namespace Reuniors\Knk\Http\Controllers\Api\V1;

use Backend\Classes\Controller;
use http\Exception\InvalidArgumentException;
use Illuminate\Http\Request;
use Reuniors\Knk\Models\FoodAddon;
use Reuniors\Knk\Models\FoodAddonGroup;
use Reuniors\Knk\Models\FoodCategory;
use Reuniors\Knk\Models\RestaurantMenu;
use stringEncode\Exception;

class FoodAddonGroupsApiController extends Controller
{
    public $implement = [
        'Reuniors.Knk.Classes.Behaviors.RestControllerExtended'
    ];

    public $restConfig = 'config_rest.yaml';

    public function store($restaurantMenuId, $foodCategoryId, $foodId, Request $request)
    {
        $requestData = $request->all();
        unset($requestData['sort_order']);
        return RestaurantMenu::findOrFail($restaurantMenuId)
            ->food_categories()
            ->findOrFail($foodCategoryId)
            ->foods()
            ->findOrFail($foodId)
            ->food_addon_groups()
            ->create($requestData);
    }

    public function addExisting($restaurantMenuId, $foodCategoryId, $foodId, Request $request) {
        $pivotData = $request->has('pivotData') ? $request->get('pivotData') : [];
        $pivotData['active'] = false;
        $addonGroupId = $request->get('foodAddonGroupId');
        $addonGroup = FoodAddonGroup::findOrFail($addonGroupId);
        $parentRestaurantMenu = $addonGroup
            ->load(['food_addons', 'food_addons.food_addon_group'])
            ->foods()
            ->firstOrFail()
            ->food_category()
            ->firstOrFail()
            ->restaurant_menus()
            ->firstOrFail();
        if ($parentRestaurantMenu->id !== (int)$restaurantMenuId) {
            throw new InvalidArgumentException($restaurantMenuId . ' not valid restaurant menu id');
        }
        RestaurantMenu::findOrFail($restaurantMenuId)
            ->food_categories()
            ->findOrFail($foodCategoryId)
            ->foods()
            ->findOrFail($foodId)
            ->food_addon_groups()
            ->syncWithoutDetaching([
                $addonGroupId => $pivotData,
            ]);
        return response()->json($addonGroup);
    }

    public function multiSort($restaurantMenuId, $foodCategoryId, $foodId, Request $request)
    {
        $restaurantMenu = RestaurantMenu::findOrFail($restaurantMenuId);
        $food = $restaurantMenu
            ->food_categories()
            ->findOrFail($foodCategoryId)
            ->foods()
            ->findOrFail($foodId);
        $ids = $request->get('data');
        FoodAddonGroup::reorderData($food->food_addon_groups(), $ids);
        return response()->json(
            RestaurantMenu
                ::foodMenu([
                    'id' => $restaurantMenuId,
                    'allAddonGroups' => true,
                ])
                ->first()
                ->withFixedMenuPrices()
        );
    }

    public function indexByRestaurantMenu($restaurantMenuId, Request $request)
    {
        $foodAddonsGroup = FoodAddonGroup
            ::query()
            ->filterByRestaurantMenuId($restaurantMenuId)
            ->with([
                'food_addons',
                'food_addons.food_addon_group',
                'foods' => function ($query) {
                    $query->groupBy('reuniors_knk_foods_food_addon_groups.food_addon_group_id');
                },
                'foods.food_category',
            ])
            ->get();
        return response()->json(
            $foodAddonsGroup
        );
    }
}
