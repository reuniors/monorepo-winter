<?php namespace Reuniors\Knk\Components;

use Cms\Classes\ComponentBase;
use Reuniors\Knk\Models\Food;
use Reuniors\Knk\Models\FoodLikeHistory;
use Reuniors\Knk\Models\RestaurantMenu;
use Auth;
use stringEncode\Exception;

class FoodMenuComponent extends BaseKnkComponent
{
    public $foodMenu;
    public $food;
    public $foodCategory;

    public function componentDetails()
    {
        return [
            'name'        => 'Food Component',
            'description' => 'No description provided yet...'
        ];
    }

    public function defineProperties()
    {
        return [];
    }

    public function onShowMenu()
    {
        $locationSlug = post('locationSlug');
        $restaurantMenu = RestaurantMenu::foodMenu([
           'locationSlug' => $locationSlug
        ]);
        $this->foodMenu = $this->page['foodMenu'] = $restaurantMenu->first();
    }

    public function onGetFoodMenu()
    {
        $locationSlug = post('locationSlug');
        $restaurantMenu = RestaurantMenu::foodMenu([
            'locationSlug' => $locationSlug
        ]);
        $this->foodMenu = $this->page['foodMenu'] = $restaurantMenu->first();
        return response()->json($this->foodMenu);
    }

    public function onRunOriginal() {}

    public function onShowFoodAdvance()
    {
        $foodId = post('foodId');
        $food = Food::getFE([
            'id' => $foodId,
            'withFoodAddons' => true,
            'withFoodCategories' => true,
            'withFoodTypePrices' => true,
            'withFoodImage' => true,
        ]);
        $this->food = $this->page['food'] = $food->first();
        return response()->json($this->food);
    }

    public function onFoodLike()
    {
        if (!Auth::check()) {
            return Response::make('Forbidden', 403);
        }
        $user = Auth::getUser();
        $foodId = post('food_id');
        $action = post('action');
        $food = Food::where('id', $foodId)->first();
        if ($food === null) {
            return Response::make('Food Not Found', 404);
        }
        $foodLikeHistory = FoodLikeHistory::where('food_id', $foodId)
            ->where('user_id', $user->id)
            ->first();
        $this->page['user'] = $user;
        $this->page['isFoodLiked'] = false;
        $this->page['foodId'] = $foodId;
        if ($action == 'like') {
            if ($foodLikeHistory === null) {
                $newFoodLike = new FoodLikeHistory();
                $newFoodLike->user_id = $user->id;
                $newFoodLike->food_id = $foodId;
                $newFoodLike->save();
                $food->number_of_likes += 1;
                $food->save();
            }
            $this->page['isFoodLiked'] = true;
        } elseif ($foodLikeHistory !== null) {
            $foodLikeHistory->delete();
            $food->number_of_likes -= 1;
            $food->save();
        }
        $this->page['numberOfLikes'] = $food->number_of_likes;
    }
}
