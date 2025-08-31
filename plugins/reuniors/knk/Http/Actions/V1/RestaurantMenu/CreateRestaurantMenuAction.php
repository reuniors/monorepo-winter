<?php namespace Reuniors\Knk\Http\Actions\V1\RestaurantMenu;

use Illuminate\Support\Facades\DB;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Knk\Models\Location;
use Reuniors\Knk\Models\RestaurantMenu;
use Reuniors\Questionnaire\Models\QuestionnaireRegistration;

class CreateRestaurantMenuAction
{
    use asAction;

    public function rules()
    {
        return [
            'locationId' => 'required',
            'name' => ['required', 'string'],
            'title' => ['required', 'string'],
            'slug' => ['required', 'string'],
        ];
    }

    public function handle($attributes = [])
    {
        $locationId = $attributes['locationId'];

        $location = Location::where('id', $locationId)
            ->firstOrFail();

        $restaurantMenu = RestaurantMenu::create([
            'name' => $attributes['name'],
            'title' => $attributes['title'],
            'slug' => $attributes['slug'],
            'active' => false,
        ]);

        $location->restaurant_menu()->attach($restaurantMenu);

        return [
            'success' => true,
            'data' => $restaurantMenu ?? null,
        ];
    }

    public function asController()
    {
        $requestData = request()->all();
        return $this->handle($requestData);
    }
}
