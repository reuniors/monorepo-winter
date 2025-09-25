<?php namespace reuniors\questionnaire\Http\Actions\V1\Questionnaire\Data\Images;

use http\Exception\InvalidArgumentException;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Base\Classes\Helpers\ReorderDataHelper;
use Reuniors\Questionnaire\Models\QuestionnaireRegistrationData;
use Winter\Storm\Support\Facades\Input;

class DeleteQuestionnaireDataPhotos extends BaseAction {
    public function rules()
    {
        return [
            'code' => 'required',
            'imagesIds' => ['required', 'array'],
            'id' => 'required',
            'fileAfterId' => ['numeric'],
            'imageType' => ['required', 'in:questionnaire_data_images,gallery_images'],
        ];
    }

    public function handle(array $attributes = [], $type = null)
    {
        $code = $attributes['code'];
        $imagesIds = $attributes['imagesIds'];
        $dataId = $attributes['id'];
        $imageType = $attributes['imageType'];

        $questionnaireData = QuestionnaireRegistrationData::where('id', $dataId)
            ->whereHas('questionnaire_registration', function ($query) use ($code) {
                $query->where('code', $code);
            })
            ->where('type', $type)
            ->firstOrFail();

        $imagesData = $questionnaireData
            ->{$imageType}()
            ->whereIn('id', $imagesIds)
            ->get();

        foreach ($imagesData as $imageData) {
            $imageData->delete();
        }

        return [
            'type' => $imageType,
            'images' => $questionnaireData->{$imageType}()->get(),
        ];
    }

    public function asController($type = null): array
    {
        return parent::asController($type);
    }
}
