<?php
namespace Reuniors\Knk\Http\ActionsFe\V1\Location\RestaurantMenu\Food;

use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Food;
use Auth;

class FeGetCityFavoriteFoodsAction extends BaseAction
{
    public function rules()
    {
        return [
            'citySlug' => ['string', 'required'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $citySlug = $attributes['citySlug'];
        $user = Auth::getUser();

        if (!$user) {
            throw new \Exception('User not authenticated');
        }

        $favoriteFoods = Food::query()
            ->whereHas('food_category.restaurant_menus.locations.city', function ($query) use ($citySlug) {
                $query->where('slug', $citySlug);
            })
            ->with(['food_category.restaurant_menus.locations' => function ($query) use ($citySlug) {
                $query->whereHas('city', function ($q) use ($citySlug) {
                    $q->where('slug', $citySlug);
                });
            }])
            ->with(['food_image'])
            ->where('like_count', '>', 0)
            ->orderBy('like_count', 'DESC')
            ->limit(50)
            ->get();

        return $favoriteFoods;
    }
}
