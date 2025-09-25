<?php namespace reuniors\knk\Http\Actions\V1\RestaurantMenu;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Classes\FoodMenuSyncWolt;
use Reuniors\Knk\Models\Location;

class RestaurantMenuImportFromUrlAction extends BaseAction {
    public function rules()
    {
        return [
            'url' => ['required', 'url'],
        ];
    }

    public function handle(array $attributes = [], Location $location = null)
    {
        $url = $attributes['url'];
        $sync = new FoodMenuSyncWolt();

        return $sync->syncDataFromWolt([
            'url' => $url,
            'locationId' => $location->id,
        ]);
    }

    public function asController(Location $location = null): array
    {
        return parent::asController($location);
    }
}
