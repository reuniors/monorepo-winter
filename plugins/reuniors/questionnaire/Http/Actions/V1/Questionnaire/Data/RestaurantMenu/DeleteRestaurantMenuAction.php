<?php namespace reuniors\questionnaire\Http\Actions\V1\Questionnaire\Data\RestaurantMenu;

use Illuminate\Support\Facades\DB;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Models\RestaurantMenu;
use reuniors\questionnaire\enums\QuestionnaireStatusEnum;
use Reuniors\Questionnaire\Models\QuestionnaireRegistration;

class DeleteRestaurantMenuAction extends BaseAction {
    public function rules()
    {
        return [
            'questionnaireDataId' => ['required'],
            'code' => 'required',
            'id' => ['required'],
        ];
    }

    public function handle(array $attributes, $type)
    {
        $questionnaireDataId = $attributes['questionnaireDataId'];
        $code = $attributes['code'];
        $restaurantMenuId = $attributes['id'];

        $questionnaire = QuestionnaireRegistration::where('code', $code)
            ->firstOrFail();

        $questionnaireData = $questionnaire
            ->registration_data()
            ->where('id', $questionnaireDataId)
            ->where('type', $type)
            ->firstOrFail();

        $data = $questionnaireData->data ?? [];

        if ($data['restaurant_menu_ids']) {
            $restaurantMenuIds = $data['restaurant_menu_ids'];

            if (in_array($restaurantMenuId, $restaurantMenuIds)) {
                DB::beginTransaction();
                try {
                    $restaurantMenuIds = array_diff($restaurantMenuIds, [$restaurantMenuId]);
                    $data['restaurant_menu_ids'] = $restaurantMenuIds;
                    $questionnaireData->data = $data;
                    $questionnaireData->save();

                    RestaurantMenu::where('id', $restaurantMenuId)
                        ->firstOrFail()
                        ->delete();
                } catch (\Exception $e) {
                    DB::rollback();
                    throw $e;
                }
                DB::commit();
            } else {
                throw new \Exception('Restaurant Menu not found');
            }
        }

        return [
            'success' => true,
        ];
    }

    public function asController($type)
    {
        $requestData = request()->all();
        return $this->handle($requestData, $type);
    }
}
