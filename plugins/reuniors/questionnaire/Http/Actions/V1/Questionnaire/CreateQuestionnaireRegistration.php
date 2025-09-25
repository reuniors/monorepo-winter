<?php namespace Reuniors\Questionnaire\Http\Actions\V1\Questionnaire;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Questionnaire\Models\QuestionnaireRegistration;

class CreateQuestionnaireRegistration extends BaseAction {
    public function rules()
    {
        return [];
    }

    public function handle($attributes = [])
    {
        $questionnaire = QuestionnaireRegistration::create($attributes);

        return [
            ...$questionnaire->toArray(),
            'redirectUrl' => url('/') . 'app/questionnaire/location/list/',
        ];
    }
}
