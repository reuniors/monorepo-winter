<?php namespace Reuniors\Evodic\Http\Actions\V1\Place\Images;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Evodic\Models\Place;

class DeletePlaceImages
{
    use asAction;

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
