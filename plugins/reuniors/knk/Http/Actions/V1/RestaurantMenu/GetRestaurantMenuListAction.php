<?php namespace Reuniors\Knk\Http\Actions\V1\RestaurantMenu;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Knk\Models\Location;
use Reuniors\Knk\Models\RestaurantMenu;
use Reuniors\Questionnaire\Models\QuestionnaireRegistration;

class GetRestaurantMenuListAction
{
    use asAction;

    public function rules()
    {
        return [
            'locationId' => 'required',
        ];
    }

    public function handle($attributes = [])
    {
        $locationId = $attributes['locationId'];

        $location = Location::where('id', $locationId)
            ->firstOrFail();

        $restaurantMenus = $location
            ->restaurant_menu()
            ->paginate();

        return [
            'success' => true,
            'data' => $restaurantMenus ?? null,
        ];
    }

    public function asController()
    {
        $requestData = request()->all();
        return $this->handle($requestData);
    }
}
