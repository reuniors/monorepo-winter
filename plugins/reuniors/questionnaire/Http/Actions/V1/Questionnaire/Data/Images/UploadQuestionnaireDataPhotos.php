<?php namespace reuniors\questionnaire\Http\Actions\V1\Questionnaire\Data\Images;

use InvalidArgumentException;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Base\Classes\Helpers\ReorderDataHelper;
use Reuniors\Questionnaire\Models\QuestionnaireRegistrationData;
use Winter\Storm\Support\Facades\Input;

class UploadQuestionnaireDataPhotos extends BaseAction {
    public function rules()
    {
        return [
            'code' => 'required',
            'dataId' => ['required', 'numeric'],
            'file' => 'required',
            'fileAfterId' => ['numeric'],
            'imageType' => ['required', 'in:questionnaire_data_images,cover_image,logo,gallery_images'],
        ];
    }

    public function handle(array $attributes, $type)
    {
        $code = $attributes['code'];
        $dataId = $attributes['dataId'];
        $imageType = $attributes['imageType'];
        $fileAfterId = $attributes['fileAfterId'] ?? 0;

        $questionnaireData = QuestionnaireRegistrationData::where('id', $dataId)
            ->whereHas('questionnaire_registration', function ($query) use ($code) {
                $query->where('code', $code);
            })
            ->firstOrFail();

        if (!Input::hasFile('file')) {
            throw new InvalidArgumentException('File is required');
        }

        $existingImagesCount = $questionnaireData->{$imageType}()->count();
        $limit = QuestionnaireRegistrationData::PHOTO_UPLOAD_LIMITS[$imageType];
        if ($existingImagesCount >= $limit) {
            throw new InvalidArgumentException("Maximum $limit images are allowed");
        }

        $imageData = $questionnaireData
            ->{$imageType}()
            ->create(['data' => Input::file('file')]);

        if ($fileAfterId > 0) {
            ReorderDataHelper::reorderModelData(
                $questionnaireData->{$imageType}()->getQuery(),
                [ ['from' => $imageData->id, 'to' => $fileAfterId] ]
            );
        }

        return [
            'success' => true,
            'data' => $imageData,
        ];
    }

    public function asController($type)
    {
        $requestData = request()->all();
        return $this->handle($requestData, $type);
    }
}
