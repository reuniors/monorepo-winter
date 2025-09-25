<?php namespace reuniors\knk\Http\Actions\V1\RestaurantMenu\Food;

use Illuminate\Http\UploadedFile;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Food;
use Reuniors\Knk\Models\RestaurantMenu;
use Winter\Storm\Support\Facades\Input;

class UploadFoodPhoto extends BaseAction {
    public function rules()
    {
        return [
            'file' => ['file'],
        ];
    }

    public function handle($attributes = [], RestaurantMenu $restaurantMenu = null, Food $food = null, ?UploadedFile $file = null)
    {
        $existingImage = $food->food_image()->first();

        if ($existingImage) {
            $existingImage->delete();
        }

        if ($file) {
            $food->food_image()->create([
                'data' => $file,
            ]);
        }

        return
            RestaurantMenu
                ::foodMenu([
                    'id' => $restaurantMenu->id,
                    'allAddonGroups' => true,
                ])
                ->firstOrFail()
                ->withFixedMenuPrices();
    }

    public function asController(RestaurantMenu $restaurantMenu = null, Food $food = null): array
    {
        return parent::asController($restaurantMenu, $food);
    }
}
