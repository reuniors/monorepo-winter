<?php namespace Reuniors\Knk\Http\Controllers\Api\V1;

use Backend\Classes\Controller;
use Reuniors\Knk\Models\RestaurantMenu;

class RestaurantMenuApiController extends Controller
{
    public $implement = [
        'Reuniors.Knk.Classes.Behaviors.RestControllerExtended'
    ];

    public $restConfig = 'config_rest.yaml';

    public function indexByLocationSlug($locationSlug)
    {
        return response()->json(
            RestaurantMenu::getFiltered([
                'locationSlug' => $locationSlug,
            ])
            ->get()
        );
    }

    public function show($id)
    {
        return response()->json(
            RestaurantMenu
                ::foodMenu([
                    'id' => $id,
                    'allAddonGroups' => true,
                ])
                ->firstOrFail()
                ->withFixedMenuPrices()
        );
    }
}
