<?php namespace reuniors\knk\Http\Actions\V1\Location\Images;

use http\Exception\InvalidArgumentException;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Knk\Models\Location;
use Reuniors\Questionnaire\Classes\Helpers\ReorderDataHelper;
use Reuniors\Questionnaire\Models\QuestionnaireRegistrationData;
use Winter\Storm\Support\Facades\Input;

class DeleteLocationImages
{
    use asAction;

    public function rules()
    {
        return [
            'imagesIds' => ['required', 'array'],
            'fileAfterId' => ['numeric'],
            'imageType' => ['required', 'in:gallery,menu_gallery'],
        ];
    }

    public function handle(array $attributes, Location $location)
    {
        $imagesIds = $attributes['imagesIds'];
        $imageType = $attributes['imageType'];


        $imagesData = $location
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
                'images' => $location->{$imageType}()->get(),
            ]
        ];
    }

    public function asController(Location $location)
    {
        $requestData = request()->all();
        return $this->handle($requestData, $location);
    }
}
