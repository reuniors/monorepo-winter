<?php namespace Reuniors\Knk\Http\Actions\V1\RestaurantMenu;

use Illuminate\Support\Facades\DB;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Location;
use Reuniors\Knk\Models\RestaurantMenu;
use reuniors\questionnaire\enums\QuestionnaireStatusEnum;
use Reuniors\Questionnaire\Models\QuestionnaireRegistration;

class DeleteRestaurantMenuAction extends BaseAction {
    public function rules()
    {
        return [];
    }

    public function handle(Location $location, $restaurantMenuId)
    {
        $location->restaurant_menu()
            ->where('id', $restaurantMenuId)
            ->firstOrFail()
            ->runDeleteMenuAndRelations();

        return [
            'success' => true,
        ];
    }

    public function asController(Location $location, $id)
    {
        return $this->handle($location, $id);
    }
}
