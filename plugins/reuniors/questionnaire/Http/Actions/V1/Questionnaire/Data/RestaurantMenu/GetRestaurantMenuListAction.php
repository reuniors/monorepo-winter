<?php namespace reuniors\questionnaire\Http\Actions\V1\Questionnaire\Data\RestaurantMenu;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Models\RestaurantMenu;
use Reuniors\Questionnaire\Models\QuestionnaireRegistration;

class GetRestaurantMenuListAction extends BaseAction {
    public function rules()
    {
        return [
            'code' => ['required', 'string'],
            'questionnaireDataId' => ['required', 'numeric'],
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

        if (!empty($questionnaireData->data['restaurant_menu_ids'])) {
            $restaurantMenuIds = $questionnaireData->data['restaurant_menu_ids'];
            $restaurantMenus = RestaurantMenu::whereIn('id', $restaurantMenuIds)
                ->paginate();
        }


        return $restaurantMenus ?? null;
    }
}
