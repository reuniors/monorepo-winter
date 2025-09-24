<?php namespace Reuniors\Evodic\Http\Actions\V1\Location\Images;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Evodic\Models\Location;

class DeleteLocationImages extends BaseAction
{
    public function rules()
    {
        return [
            'imagesIds' => ['required', 'array'],
            'fileAfterId' => ['numeric'],
            'imageType' => ['required', 'in:gallery'],
        ];
    }

    public function handle(array $attributes = [], Location $location = null)
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
            'type' => $imageType,
            'images' => $location->{$imageType}()->get(),
        ];
    }

    public function asController(Location $location = null): array
    {
        return parent::asController($location);
    }
}
