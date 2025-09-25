<?php namespace reuniors\questionnaire\Http\Actions\V1\Questionnaire\Data;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Questionnaire\Models\QuestionnaireRegistration;
use Reuniors\Questionnaire\Models\QuestionnaireRegistrationData;

class GetQuestionnaireRegistrationData extends BaseAction {
    public function rules()
    {
        return [
            'code' => 'required',
            'id' => 'required',
        ];
    }

    public function handle(array $attributes = [], $type = null)
    {
        $code = $attributes['code'];
        $id = $attributes['id'];

        $questionnaire = QuestionnaireRegistration::where('code', $code)
            ->firstOrFail();

        $questionnaireData = $questionnaire
            ->registration_data()
            ->with([
                'questionnaire_data_images',
                'gallery_images',
                'cover_image',
                'logo'
            ])
            ->where('type', $type)
            ->where('id', $id)
            ->firstOrFail();

        return $questionnaireData;
    }

    public function asController($type = null): array
    {
        return parent::asController($type);
    }
}
