<?php namespace reuniors\questionnaire\Http\Actions\V1\Questionnaire\Data;

use Reuniors\Base\Http\Actions\BaseAction;
use reuniors\questionnaire\enums\QuestionnaireStatusEnum;
use Reuniors\Questionnaire\Models\QuestionnaireRegistration;
use Stevebauman\Purify\Facades\Purify;

class UpdateQuestionnaireData extends BaseAction {
    public function rules()
    {
        return [
            'id' => 'required',
            'code' => 'required',
            'data' => 'required',
        ];
    }

    public function handle(array $attributes = [], $type = null)
    {
        $code = $attributes['code'];
        $data = Purify::clean($attributes['data']);
        $id = $attributes['id'];

        $questionnaire = QuestionnaireRegistration::where('code', $code)
            ->firstOrFail();

        $questionnaireData = $questionnaire
            ->registration_data()
            ->where('id', $id)
            ->firstOrFail();

        $questionnaireData->update([
            'data' => [
                ...$questionnaireData->data,
                ...$data
            ],
            'status' => QuestionnaireStatusEnum::SUBMITTED,
        ]);

        return $questionnaireData;
    }

    public function asController($type = null): array
    {
        return parent::asController($type);
    }
}
