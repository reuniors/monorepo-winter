<?php namespace Reuniors\Knk\Http\ActionsFe\V1\Location\RestaurantMenu\Food\User;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Models\FoodLikeHistory;
use Reuniors\Knk\Models\Location;
use Auth;

class FeGetUserFoodsLikesAction extends BaseAction
{
    public function rules()
    {
        return [
            'citySlug' => ['string', 'required'],
            'slug' => ['string', 'required'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $citySlug = $attributes['citySlug'];
        $slug = $attributes['slug'];
        $user = Auth::getUser();

        $location = Location::getFE([
            'citySlug' => $citySlug,
            'slug' => $slug,
        ])->firstOrFail();

        return FoodLikeHistory::query()
            ->whereHas('food.food_category.restaurant_menus.locations', function ($query) use ($location) {
                $query->where('id', $location->id);
            })
            ->where('user_id', $user->id)
            ->get();
    }
}
