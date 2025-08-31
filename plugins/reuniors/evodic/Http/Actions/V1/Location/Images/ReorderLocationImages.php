<?php namespace Reuniors\Evodic\Http\Actions\V1\Location\Images;

use Auth;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Evodic\Classes\Helpers\ReorderDataHelper;
use Reuniors\Evodic\Models\Location;

class ReorderLocationImages
{
    use AsAction;

    public function rules()
    {
        return [
            'reorderData' => ['required', 'array'],
            'imageType' => ['required', 'in:gallery'],
        ];
    }

    public function handle(array $attributes, Location $location)
    {
        $reorderData = $attributes['reorderData'];
        $imageType = $attributes['imageType'];


        ReorderDataHelper::reorderModelData(
            $location->{$imageType}()->getQuery(),
            $reorderData
        );
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
