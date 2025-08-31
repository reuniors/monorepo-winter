<?php namespace Reuniors\Knk\Http\Controllers\Api\V1;

use Backend\Classes\Controller;
use Illuminate\Http\Request;
use Reuniors\Knk\Models\FoodCategory;
use Reuniors\Knk\Models\RestaurantMenu;

class FoodCategoriesApiController extends Controller
{
    public $implement = [
        'Reuniors.Knk.Classes.Behaviors.RestControllerExtended'
    ];

    public $restConfig = 'config_rest.yaml';

    public function store($restaurantMenuId, Request $request)
    {
        $restaurantMenu = RestaurantMenu::findOrFail($restaurantMenuId);
        return $restaurantMenu->food_categories()->create($request->all());
    }

    public function update(Request $request, $id)
    {
        $article = FoodCategory::findOrFail($id);
        $article->update($request->all());

        return $article;
    }

    public function delete(Request $request, $id)
    {
        $article = FoodCategory::findOrFail($id);
        $article->delete();

        return 204;
    }

    public function multiSort($restaurantMenuId, Request $request)
    {
        $restaurantMenu = RestaurantMenu::findOrFail($restaurantMenuId);
        $foodCategoriesIds = $request->get('data');
        FoodCategory::reorderData($restaurantMenu->food_categories(), $foodCategoriesIds);
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
