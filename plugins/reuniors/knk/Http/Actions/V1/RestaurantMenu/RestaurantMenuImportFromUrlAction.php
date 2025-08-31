<?php namespace reuniors\knk\Http\Actions\V1\RestaurantMenu;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Knk\Classes\FoodMenuSyncWolt;
use Reuniors\Knk\Models\Location;

class RestaurantMenuImportFromUrlAction
{
    use AsAction;

    public function rules()
    {
        return [
            'url' => ['required', 'url'],
        ];
    }

    public function handle(Location $location, array $attributes)
    {
        $url = $attributes['url'];
        $sync = new FoodMenuSyncWolt();

        return $sync->syncDataFromWolt([
            'url' => $url,
            'locationId' => $location->id,
        ]);
    }

    public function asController(Location $location)
    {
        return [
            'success' => true,
            'data' => $this->handle($location, request()->all()),
        ];
    }
}
