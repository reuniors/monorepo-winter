<?php namespace reuniors\questionnaire\Http\Actions\V1\Questionnaire\Data\List;

use Lorisleiva\Actions\Concerns\AsAction;
use reuniors\questionnaire\enums\QuestionnaireStatusEnum;
use Reuniors\Questionnaire\Models\QuestionnaireRegistration;
use Reuniors\Questionnaire\Models\QuestionnaireRegistrationData;

class GetQuestionnairesDataList
{
    use asAction;
    public function rules()
    {
        return [
            'code' => ['required', 'string'],
        ];
    }

    public function handle($attributes = [], $type)
    {
        $code = $attributes['code'];

        $questionnaire = QuestionnaireRegistration::query()
            ->where('code', $code)
            ->firstOrFail();

        return [
            'success' => true,
            'data' => $questionnaire
                ->registration_data()
                ->whereNot('status', QuestionnaireStatusEnum::DRAFT)
                ->where('type', $type)
                ->paginate(),
        ];
    }

    public function asController($type)
    {
        $requestData = request()->all();
        return $this->handle($requestData, $type);
    }
}
