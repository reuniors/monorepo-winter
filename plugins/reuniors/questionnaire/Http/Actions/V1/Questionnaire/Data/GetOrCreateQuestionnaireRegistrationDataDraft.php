<?php namespace reuniors\questionnaire\Http\Actions\V1\Questionnaire\Data;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Questionnaire\Models\QuestionnaireRegistration;
use Reuniors\Questionnaire\Models\QuestionnaireRegistrationData;

class GetOrCreateQuestionnaireRegistrationDataDraft extends BaseAction {
    

    const QUESTIONNAIRE_LIMIT = 10;

    public function rules()
    {
        return [
            'code' => 'required',
        ];
    }

    public function handle(array $attributes, $type)
    {
        $code = $attributes['code'];

        $questionnaire = QuestionnaireRegistration::where('code', $code)
            ->withCount('registration_data')
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
            ->where('status', 'draft')
            ->first();

        $qLimit = self::QUESTIONNAIRE_LIMIT;

        if (!$questionnaireData) {
            if ($questionnaire->registration_data_count >= $qLimit) {
                throw new \Exception("You can not create more than $qLimit questionnaires");
            }
            $questionnaireData = QuestionnaireRegistrationData::create([
                'questionnaire_registration_id' => $questionnaire->id,
                'data' => [],
                'type' => $type,
                'status' => 'draft',
            ]);
        }

        return [
            'success' => true,
            'data' => $questionnaireData,
        ];
    }

    public function asController($type)
    {
        $requestData = request()->all();
        return $this->handle($requestData, $type);
    }
}
