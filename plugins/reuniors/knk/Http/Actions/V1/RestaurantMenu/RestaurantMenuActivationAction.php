<?php namespace reuniors\knk\Http\Actions\V1\RestaurantMenu;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Location;

class RestaurantMenuActivationAction extends BaseAction {
    public function rules()
    {
        return [];
    }

    public function handle($attributes = [], Location $location = null, $restaurantMenuId = null)
    {
        $existingActiveMenu = $location->restaurant_menu()
            ->where('active', 1)
            ->first();

        if ($existingActiveMenu && $existingActiveMenu->id !== $restaurantMenuId) {
            $location->restaurant_menu()
                ->where('id', $existingActiveMenu->id)
                ->update([
                    'active' => 0,
                ]);
        }

        $location->restaurant_menu()
            ->where('id', $restaurantMenuId)
            ->firstOrFail()
            ->update([
                'active' => 1,
            ]);

        return true;
    }

    public function asController(Location $location = null, $id = null): array
    {
        return parent::asController($location, $id);
    }
}
