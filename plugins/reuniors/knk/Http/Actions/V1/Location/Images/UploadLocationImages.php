<?php namespace reuniors\knk\Http\Actions\V1\Location\Images;

use InvalidArgumentException;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Location;
use Reuniors\Questionnaire\Classes\Helpers\ReorderDataHelper;
use Reuniors\Questionnaire\Models\QuestionnaireRegistrationData;
use Winter\Storm\Support\Facades\Input;

class UploadLocationImages extends BaseAction {
    public function rules()
    {
        return [
            'file' => 'required',
            'fileAfterId' => ['numeric'],
            'imageType' => ['required', 'in:gallery,menu_gallery,cover_image,logo'],
        ];
    }

    public function handle(array $attributes = [], Location $location = null)
    {
        $imageType = $attributes['imageType'];
        $fileAfterId = $attributes['fileAfterId'] ?? 0;

        if (!Input::hasFile('file')) {
            throw new InvalidArgumentException('File is required');
        }

        $existingImagesCount = $location->{$imageType}()->count();
        $limit = Location::$limits[$imageType];
        if ($existingImagesCount >= $limit) {
            throw new InvalidArgumentException("Maximum $limit images are allowed");
        }

        $imageData = $location
            ->{$imageType}()
            ->create(['data' => Input::file('file')]);

        if ($fileAfterId > 0) {
            ReorderDataHelper::reorderModelData(
                $location->{$imageType}()->getQuery(),
                [ ['from' => $imageData->id, 'to' => $fileAfterId] ]
            );
        }

        return $imageData;
    }

    public function asController(Location $location = null): array
    {
        return parent::asController($location);
    }
}
