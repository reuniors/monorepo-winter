<?php namespace reuniors\knk\Http\Actions\V1\RestaurantMenu;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Location;

class RelationsUpdatedAction extends BaseAction {
    public function rules()
    {
        return [];
    }

    public function handle($attributes = [], Location $location = null, $restaurantMenuId = null)
    {
        $location->restaurant_menu()
            ->where('id', $restaurantMenuId)
            ->firstOrFail()
            ->update([
                'relations_updated_at' => now(),
            ]);

        RestaurantMenuActivationAction::run(
            $location,
            $restaurantMenuId,
        );

        return true;
    }

    public function asController(Location $location = null, $id = null): array
    {
        return parent::asController($location, $id);
    }
}
