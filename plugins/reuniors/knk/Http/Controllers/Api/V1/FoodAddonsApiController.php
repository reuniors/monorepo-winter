<?php namespace Reuniors\Knk\Http\Controllers\Api\V1;

use Backend\Classes\Controller;
use Illuminate\Http\Request;
use Reuniors\Knk\Models\FoodAddon;
use Reuniors\Knk\Models\FoodCategory;
use Reuniors\Knk\Models\RestaurantMenu;

class FoodAddonsApiController extends Controller
{
    public $implement = [
        'Reuniors.Knk.Classes.Behaviors.RestControllerExtended'
    ];

    public $restConfig = 'config_rest.yaml';

    public function store($restaurantMenuId, $foodCategoryId, $foodId, $addonGroupId, Request $request)
    {
        $requestData = $request->get('data');
        /** @var FoodAddon $foodAddon */
        $foodAddon = RestaurantMenu::findOrFail($restaurantMenuId)
            ->food_categories()
            ->findOrFail($foodCategoryId)
            ->foods()
            ->findOrFail($foodId)
            ->food_addon_groups()
            ->findOrFail($addonGroupId)
            ->food_addons()
            ->create($requestData);
        $foodAddon->load('food_addon_group');
        $foodAddon->updatePrice($foodId, $requestData['real_price']);
        $foodAddon->realPrice = $requestData['real_price'];
        return response()->json($foodAddon);
    }

    public function multiSort($restaurantMenuId, $foodCategoryId, $foodId, $addonGroupId, Request $request)
    {
        $restaurantMenu = RestaurantMenu::findOrFail($restaurantMenuId);
        $foodAddonGroup = $restaurantMenu
            ->food_categories()
            ->findOrFail($foodCategoryId)
            ->foods()
            ->findOrFail($foodId)
            ->food_addon_groups()
            ->findOrFail($addonGroupId);
        $ids = $request->get('data');
        FoodAddon::reorderData($foodAddonGroup->food_addons(), $ids);
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
}
