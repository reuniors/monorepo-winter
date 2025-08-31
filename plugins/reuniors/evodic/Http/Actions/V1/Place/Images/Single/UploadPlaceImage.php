<?php namespace Reuniors\Evodic\Http\Actions\V1\Place\Images\Single;

use InvalidArgumentException;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Evodic\Models\Place;
use Winter\Storm\Support\Facades\Input;

class UploadPlaceImage
{
    use asAction;
    public function rules()
    {
        return [
            'file' => 'required',
            'imageType' => ['required', 'in:placeCover,placeLogo'],
        ];
    }

    public function handle(array $attributes, Place $place)
    {
        $imageType = $attributes['imageType'];

        if (!Input::hasFile('file')) {
            throw new InvalidArgumentException('File is required');
        }

        DeletePlaceImage::run(['imageType' => $imageType], $place);

        $imageData = $place
            ->{$imageType}()
            ->create(['data' => Input::file('file')]);

        $imageData->file_name = $imageData->disk_name;
        $imageData->save();

        return [
            'success' => true,
            'data' => $imageData,
        ];
    }

    public function asController(Place $place)
    {
        $requestData = request()->all();
        return $this->handle($requestData, $place);
    }
}
