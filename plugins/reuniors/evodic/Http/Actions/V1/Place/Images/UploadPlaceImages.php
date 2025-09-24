<?php namespace Reuniors\Evodic\Http\Actions\V1\Place\Images;

use InvalidArgumentException;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Base\Classes\Helpers\ReorderDataHelper;
use Reuniors\Evodic\Models\Location;
use Reuniors\Evodic\Models\Place;
use Winter\Storm\Support\Facades\Input;

class UploadPlaceImages extends BaseAction
{
    public function rules()
    {
        return [
            'file' => 'required',
            'fileAfterId' => ['numeric'],
            'imageType' => ['required', 'in:placeGallery,placeCover,placeLogo'],
        ];
    }

    public function handle(array $attributes = [], Place $place = null)
    {
        $imageType = $attributes['imageType'];
        $fileAfterId = $attributes['fileAfterId'] ?? 0;

        if (!Input::hasFile('file')) {
            throw new InvalidArgumentException('File is required');
        }

        $existingImagesCount = $place->{$imageType}()->count();
        $limit = Place::$limits[$imageType];
        if ($existingImagesCount >= $limit) {
            throw new InvalidArgumentException("Maximum $limit images are allowed");
        }

        $imageData = $place
            ->{$imageType}()
            ->create(['data' => Input::file('file')]);

        $imageData->file_name = $imageData->disk_name;
        $imageData->save();

        if ($fileAfterId > 0) {
            ReorderDataHelper::reorderModelData(
                $place->{$imageType}()->getQuery(),
                [ ['from' => $imageData->id, 'to' => $fileAfterId] ]
            );
        }

        return $imageData;
    }

    public function asController(Place $place = null): array
    {
        return parent::asController($place);
    }
}
