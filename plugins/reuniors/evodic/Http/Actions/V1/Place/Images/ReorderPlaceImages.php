<?php namespace Reuniors\Evodic\Http\Actions\V1\Place\Images;

use Auth;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Evodic\Classes\Helpers\ReorderDataHelper;
use Reuniors\Evodic\Models\Place;

class ReorderPlaceImages
{
    use AsAction;

    public function rules()
    {
        return [
            'reorderData' => ['required', 'array'],
            'imageType' => ['required', 'in:placeGallery'],
        ];
    }

    public function handle(array $attributes, Place $place)
    {
        $reorderData = $attributes['reorderData'];
        $imageType = $attributes['imageType'];


        ReorderDataHelper::reorderModelData(
            $place->{$imageType}()->getQuery(),
            $reorderData
        );
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
