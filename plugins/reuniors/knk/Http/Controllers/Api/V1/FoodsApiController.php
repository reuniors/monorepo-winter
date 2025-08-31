<?php namespace Reuniors\Knk\Http\Controllers\Api\V1;

use Backend\Classes\Controller;
use Illuminate\Http\Request;
use Reuniors\Knk\Models\Food;
use Reuniors\Knk\Models\FoodCategory;
use Reuniors\Knk\Models\RestaurantMenu;

class FoodsApiController extends Controller
{
    public $implement = [
        'Reuniors.Knk.Classes.Behaviors.RestControllerExtended'
    ];

    public $restConfig = 'config_rest.yaml';

    public function store($restaurantMenuId, $foodCategoryId, Request $request)
    {
        $restaurantMenu = RestaurantMenu::findOrFail($restaurantMenuId);
        return $restaurantMenu
            ->food_categories()
            ->findOrFail($foodCategoryId)
            ->foods()
            ->create($request->all());
    }

    public function multiSort($restaurantMenuId, $foodCategoryId, Request $request)
    {
        $restaurantMenu = RestaurantMenu::findOrFail($restaurantMenuId);
        $foodCategory = $restaurantMenu
            ->food_categories()
            ->findOrFail($foodCategoryId);
        $foodIds = $request->get('data');
        Food::reorderData($foodCategory->foods(), $foodIds);
        return response()->json(
            RestaurantMenu
                ::foodMenu([
                    'id' => $restaurantMenuId,
                    'allAddonGroups' => true,
                ])
                ->firstOrFail()
                ->withFixedMenuPrices()
        );
    }

//    public function update(Request $request, $id)
//    {
//        $article = FoodCategory::findOrFail($id);
//        $article->update($request->all());
//
//        return $article;
//    }
//
//    public function delete(Request $request, $id)
//    {
//        $article = FoodCategory::findOrFail($id);
//        $article->delete();
//
//        return 204;
//    }
}
