<?php namespace reuniors\questionnaire\Http\Actions\V1\Questionnaire\Data;

use Reuniors\Base\Http\Actions\BaseAction;
use reuniors\questionnaire\enums\QuestionnaireStatusEnum;
use Reuniors\Questionnaire\Models\QuestionnaireRegistration;

class DeleteQuestionnaireData extends BaseAction {
    public function rules()
    {
        return [
            'ids' => ['required', 'array'],
            'code' => 'required',
        ];
    }

    public function handle(array $attributes = [], $type = null)
    {
        $code = $attributes['code'];
        $ids = $attributes['ids'];

        $questionnaire = QuestionnaireRegistration::where('code', $code)
            ->firstOrFail();

        $questionnaireData = $questionnaire
            ->registration_data()
            ->with('questionnaire_data_images')
            ->whereIn('id', $ids)
            ->where('type', $type)
            ->get();

        $questionnaireData->each(function ($data) {
            $data->questionnaire_data_images->each(function ($image) {
                $image->delete();
            });
            $data->delete();
        });

        return true;
    }

    public function asController($type = null): array
    {
        return parent::asController($type);
    }
}
