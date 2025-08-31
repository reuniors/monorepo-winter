<?php namespace Reuniors\Questionnaire\Http\Actions\V1\Questionnaire;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Questionnaire\Models\QuestionnaireRegistration;

class CreateQuestionnaireRegistration
{
    use asAction;
    public function rules()
    {
        return [];
    }

    public function handle($attributes = [])
    {
        $questionnaire = QuestionnaireRegistration::create($attributes);

        return [
            'success' => true,
            'data' => [
                ...$questionnaire->toArray(),
                'redirectUrl' => url('/') . 'app/questionnaire/location/list/',
            ],
        ];
    }

    public function asController()
    {
        $requestData = request()->all();
        return $this->handle($requestData);
    }
}
