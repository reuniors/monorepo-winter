<?php namespace Reuniors\Evodic\Http\Actions\V1\Location\Images;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Evodic\Models\Location;

class DeleteLocationImages
{
    use asAction;

    public function rules()
    {
        return [
            'imagesIds' => ['required', 'array'],
            'fileAfterId' => ['numeric'],
            'imageType' => ['required', 'in:gallery'],
        ];
    }

    public function handle(array $attributes, Location $location)
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
            'success' => true,
            'data' => [
                'type' => $imageType,
                'images' => $location->{$imageType}()->get(),
            ]
        ];
    }

    public function asController(Location $location)
    {
        $requestData = request()->all();
        return $this->handle($requestData, $location);
    }
}
