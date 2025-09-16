<?php namespace reuniors\questionnaire\Http\Actions\V1\Questionnaire\Data\Images\Single;

use http\Exception\InvalidArgumentException;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Base\Classes\Helpers\ReorderDataHelper;
use Reuniors\Questionnaire\Models\QuestionnaireRegistrationData;
use Winter\Storm\Support\Facades\Input;

class DeleteQuestionnaireDataPhoto
{
    use asAction;
    public function rules()
    {
        return [
            'code' => 'required',
            'id' => 'required',
            'imageType' => ['required', 'in:cover_image,logo'],
        ];
    }

    public function handle(array $attributes, $type)
    {
        $code = $attributes['code'];
        $dataId = $attributes['id'];
        $imageType = $attributes['imageType'];

        $questionnaireData = QuestionnaireRegistrationData::where('id', $dataId)
            ->whereHas('questionnaire_registration', function ($query) use ($code) {
                $query->where('code', $code);
            })
            ->where('type', $type)
            ->firstOrFail();

        $imageData = $questionnaireData
            ->{$imageType}()
            ->first();

        if ($imageData) {
            $imageData->delete();
        }

        return [
            'success' => true,
            'data' => [
                'type' => $imageType,
            ]
        ];
    }

    public function asController($type)
    {
        $requestData = request()->all();
        return $this->handle($requestData, $type);
    }
}
