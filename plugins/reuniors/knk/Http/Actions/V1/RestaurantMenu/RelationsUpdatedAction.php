<?php namespace reuniors\knk\Http\Actions\V1\RestaurantMenu;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Knk\Models\Location;

class RelationsUpdatedAction
{
    use asAction;

    public function rules()
    {
        return [];
    }

    public function handle(Location $location, $restaurantMenuId)
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

        return [
            'success' => true,
        ];
    }

    public function asController(Location $location, $id)
    {
        return $this->handle($location, $id);
    }
}
