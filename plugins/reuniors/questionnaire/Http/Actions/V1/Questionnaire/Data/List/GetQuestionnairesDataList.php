<?php namespace reuniors\questionnaire\Http\Actions\V1\Questionnaire\Data\List;

use Reuniors\Base\Http\Actions\BaseAction;
use reuniors\questionnaire\enums\QuestionnaireStatusEnum;
use Reuniors\Questionnaire\Models\QuestionnaireRegistration;
use Reuniors\Questionnaire\Models\QuestionnaireRegistrationData;

class GetQuestionnairesDataList extends BaseAction {
    public function rules()
    {
        return [
            'code' => ['required', 'string'],
        ];
    }

    public function handle($attributes = [], $type = null)
    {
        $code = $attributes['code'];

        $questionnaire = QuestionnaireRegistration::query()
            ->where('code', $code)
            ->firstOrFail();

        return $questionnaire
                ->registration_data()
                ->whereNot('status', QuestionnaireStatusEnum::DRAFT)
                ->where('type', $type)
                ->paginate();
    }

    public function asController($type = null): array
    {
        return parent::asController($type);
    }
}
