<?php namespace reuniors\questionnaire\Http\Actions\V1\Questionnaire\Data\Images;

use http\Exception\InvalidArgumentException;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Questionnaire\Classes\Helpers\ReorderDataHelper;
use Reuniors\Questionnaire\Models\QuestionnaireRegistrationData;
use Winter\Storm\Support\Facades\Input;

class DeleteQuestionnaireDataPhotos
{
    use asAction;
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

    public function handle(array $attributes, $type)
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
