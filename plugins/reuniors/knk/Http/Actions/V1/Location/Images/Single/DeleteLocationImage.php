<?php namespace reuniors\knk\Http\Actions\V1\Location\Images\Single;

use http\Exception\InvalidArgumentException;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Location;
use Reuniors\Questionnaire\Classes\Helpers\ReorderDataHelper;
use Reuniors\Questionnaire\Models\QuestionnaireRegistrationData;
use Winter\Storm\Support\Facades\Input;

class DeleteLocationImage extends BaseAction
{
    public function rules()
    {
        return [
            'imageType' => ['required', 'in:cover_image,logo'],
        ];
    }

    public function handle(array $attributes, Location $location)
    {
        $imageType = $attributes['imageType'];

        $imageData = $location
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

    public function asController(Location $location)
    {
        $requestData = request()->all();
        return $this->handle($requestData, $location);
    }
}
