<?php namespace reuniors\questionnaire\Http\Actions\V1\Questionnaire;

use Reuniors\Base\Http\Actions\BaseAction;
use reuniors\questionnaire\Http\Actions\V1\Questionnaire\Data\DeleteQuestionnaireData;
use Reuniors\Questionnaire\Models\QuestionnaireRegistration;

class DeleteQuestionnaireRegistration extends BaseAction {
    public function rules()
    {
        return [
            'codes' => ['required', 'array'],
        ];
    }

    public function handle($attributes = [])
    {
        $codes = $attributes['codes'];

        $questionnaires = QuestionnaireRegistration::whereIn('code', $codes)
            ->get();

        foreach ($questionnaires as $questionnaire) {
            DeleteQuestionnaireData::run([
                'ids' => $questionnaire->registration_data()->pluck('id'),
                'code' => $questionnaire->code,
            ], 'location');

            $questionnaire->delete();
        }

        return [
            'success' => true,
        ];
    }

    public function asController()
    {
        $requestData = request()->all();
        return $this->handle($requestData);
    }
}
