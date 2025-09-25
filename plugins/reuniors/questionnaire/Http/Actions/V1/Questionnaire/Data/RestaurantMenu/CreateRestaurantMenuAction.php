<?php namespace reuniors\questionnaire\Http\Actions\V1\Questionnaire\Data\RestaurantMenu;

use Illuminate\Support\Facades\DB;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Models\RestaurantMenu;
use Reuniors\Questionnaire\Models\QuestionnaireRegistration;

class CreateRestaurantMenuAction extends BaseAction {
    public function rules()
    {
        return [
            'code' => 'required',
            'questionnaireDataId' => 'required',
            'name' => ['required', 'string'],
            'title' => ['required', 'string'],
            'slug' => ['required', 'string'],
        ];
    }

    public function handle($attributes = [])
    {
        $code = $attributes['code'];
        $dataId = $attributes['questionnaireDataId'];

        $questionnaire = QuestionnaireRegistration::where('code', $code)
            ->firstOrFail();

        $questionnaireData = $questionnaire
            ->registration_data()
            ->where('id', $dataId)
            ->firstOrFail();

        DB::beginTransaction();

        try {
            $restaurantMenu = RestaurantMenu::create([
                'name' => $attributes['name'],
                'title' => $attributes['title'],
                'slug' => $attributes['slug'],
                'active' => false,
            ]);
            $data = $questionnaireData->data ?? [];

            $restaurantMenuIds = $questionnaireData->data['restaurant_menu_ids'] ?? [];
            $data['restaurant_menu_ids'] = [...$restaurantMenuIds, $restaurantMenu->id];

            $questionnaireData->data = $data;
            $questionnaireData->save();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }

        DB::commit();


        return $restaurantMenu ?? null;
    }
}
