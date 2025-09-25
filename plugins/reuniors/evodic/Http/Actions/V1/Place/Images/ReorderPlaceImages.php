<?php namespace Reuniors\Evodic\Http\Actions\V1\Place\Images;

use Auth;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Base\Classes\Helpers\ReorderDataHelper;
use Reuniors\Evodic\Models\Place;

class ReorderPlaceImages extends BaseAction {
    public function rules()
    {
        return [
            'reorderData' => ['required', 'array'],
            'imageType' => ['required', 'in:placeGallery'],
        ];
    }

    public function handle(array $attributes = [], Place $place = null)
    {
        $reorderData = $attributes['reorderData'];
        $imageType = $attributes['imageType'];


        ReorderDataHelper::reorderModelData(
            $place->{$imageType}()->getQuery(),
            $reorderData
        );

        return [
            'type' => $imageType,
            'images' => $place->{$imageType}()->get(),
        ];
    }

    public function asController(Place $place = null): array
    {
        return parent::asController($place);
    }
}
