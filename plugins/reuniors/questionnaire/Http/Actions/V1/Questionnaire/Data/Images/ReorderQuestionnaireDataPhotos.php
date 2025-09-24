<?php namespace reuniors\questionnaire\Http\Actions\V1\Questionnaire\Data\Images;

use Auth;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Base\Classes\Helpers\ReorderDataHelper;
use Reuniors\Questionnaire\Models\QuestionnaireRegistrationData;

class ReorderQuestionnaireDataPhotos extends BaseAction {
    public function rules()
    {
        return [
            'id' => ['required'],
            'code' => ['required'],
            'reorderData' => ['required', 'array'],
            'imageType' => ['required', 'in:questionnaire_data_images,gallery_images'],
        ];
    }

    public function handle(array $attributes, $type)
    {
        $dataId = $attributes['id'];
        $reorderData = $attributes['reorderData'];
        $code = $attributes['code'];
        $imageType = $attributes['imageType'];

        $questionnaireData = QuestionnaireRegistrationData::where('id', $dataId)
            ->whereHas('questionnaire_registration', function ($query) use ($code) {
                $query->where('code', $code);
            })
            ->where('type', $type)
            ->firstOrFail();

        ReorderDataHelper::reorderModelData(
            $questionnaireData->{$imageType}()->getQuery(),
            $reorderData
        );
        return [
            'success' => true,
            'data' => [
                'type' => $imageType,
                'images' => $questionnaireData->{$imageType}()->get(),
            ]
        ];
    }

    public function asController($type)
    {
        $requestData = request()->all();
        return $this->handle($requestData, $type);
    }
}
