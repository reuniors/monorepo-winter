<?php namespace Reuniors\Evodic\Http\Actions\V1\Place\Images\Single;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Evodic\Models\Place;

class DeletePlaceImage extends BaseAction
{
    public function rules()
    {
        return [
            'imageType' => ['required', 'in:placeCover,placeLogo'],
        ];
    }

    public function handle(array $attributes, Place $place)
    {
        $imageType = $attributes['imageType'];

        $imageData = $place
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

    public function asController(Place $place)
    {
        $requestData = request()->all();
        return $this->handle($requestData, $place);
    }
}
