<?php namespace Reuniors\Evodic\Http\Actions\V1\Location\Images\Single;

use InvalidArgumentException;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Evodic\Models\Location;
use Winter\Storm\Support\Facades\Input;

class UploadLocationImage extends BaseAction
{
    public function rules()
    {
        return [
            'file' => 'required',
            'imageType' => ['required', 'in:cover,logo'],
        ];
    }

    public function handle(array $attributes = [], Location $location = null)
    {
        $imageType = $attributes['imageType'];

        if (!Input::hasFile('file')) {
            throw new InvalidArgumentException('File is required');
        }

        $file = Input::file('file');

        DeleteLocationImage::run(['imageType' => $imageType], $location);

        $imageData = $location
            ->{$imageType}()
            ->create(['data' => $file]);

        $imageData->file_name = $imageData->disk_name;
        $imageData->save();

        return $imageData;
    }

    public function asController(Location $location = null): array
    {
        return parent::asController($location);
    }
}
