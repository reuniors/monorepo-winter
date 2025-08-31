<?php namespace reuniors\questionnaire\Http\Actions\V1\Questionnaire\List;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Questionnaire\Models\QuestionnaireRegistration;
use Reuniors\Questionnaire\Models\QuestionnaireRegistrationData;

class GetQuestionnairesList
{
    use asAction;
    public function rules()
    {
        return [
            'type' => 'string',
        ];
    }

    public function handle($attributes = [])
    {
        $type = $attributes['type'] ?? null;

        $questionnaireListQuery = QuestionnaireRegistration::query()
            ->orderBy('created_at', 'desc');

        if ($type) {
            $questionnaireListQuery->where('type', $type);
        }

        return [
            'success' => true,
            'data' => $questionnaireListQuery->paginate(),
        ];
    }

    public function asController()
    {
        $requestData = request()->all();
        return $this->handle($requestData);
    }
}
