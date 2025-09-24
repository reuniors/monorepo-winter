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

    public function handle(RestaurantMenu $restaurantMenu, Food $food, ?UploadedFile $file)
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

    public function asController(RestaurantMenu $restaurantMenu, Food $food)
    {
        return $this->handle($restaurantMenu, $food, Input::file('file'));
    }
}
