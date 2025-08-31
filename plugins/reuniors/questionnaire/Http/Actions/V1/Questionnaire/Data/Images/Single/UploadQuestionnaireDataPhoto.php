<?php namespace reuniors\questionnaire\Http\Actions\V1\Questionnaire\Data\Images\Single;

use InvalidArgumentException;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Questionnaire\Classes\Helpers\ReorderDataHelper;
use Reuniors\Questionnaire\Models\QuestionnaireRegistrationData;
use Winter\Storm\Support\Facades\Input;

class UploadQuestionnaireDataPhoto
{
    use asAction;
    public function rules()
    {
        return [
            'code' => 'required',
            'dataId' => ['required', 'numeric'],
            'file' => 'required',
            'imageType' => ['required', 'in:cover_image,logo'],
        ];
    }

    public function handle(array $attributes, $type)
    {
        $code = $attributes['code'];
        $dataId = $attributes['dataId'];
        $imageType = $attributes['imageType'];

        $questionnaireData = QuestionnaireRegistrationData::where('id', $dataId)
            ->whereHas('questionnaire_registration', function ($query) use ($code) {
                $query->where('code', $code);
            })
            ->firstOrFail();

        if (!Input::hasFile('file')) {
            throw new InvalidArgumentException('File is required');
        }
        $imageData = $questionnaireData
            ->{$imageType}()
            ->create(['data' => Input::file('file')]);

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
