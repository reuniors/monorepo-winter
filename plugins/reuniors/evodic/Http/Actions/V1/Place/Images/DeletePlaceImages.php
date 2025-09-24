<?php namespace Reuniors\Evodic\Http\Actions\V1\Place\Images;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Evodic\Models\Place;

class DeletePlaceImages extends BaseAction
{

    public function rules()
    {
        return [
            'imagesIds' => ['required', 'array'],
            'fileAfterId' => ['numeric'],
            'imageType' => ['required', 'in:placeGallery'],
        ];
    }

    public function handle(array $attributes, Place $place)
    {
        $imagesIds = $attributes['imagesIds'];
        $imageType = $attributes['imageType'];


        $imagesData = $place
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
                'images' => $place->{$imageType}()->get(),
            ]
        ];
    }

    public function asController(Place $place)
    {
        $requestData = request()->all();
        return $this->handle($requestData, $place);
    }
}
