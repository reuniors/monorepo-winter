<?php namespace Reuniors\Evodic\Http\Actions\V1\Location\Images\Single;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Evodic\Models\Location;

class DeleteLocationImage
{
    use asAction;
    public function rules()
    {
        return [
            'imageType' => ['required', 'in:cover,logo'],
        ];
    }

    public function handle(array $attributes, Location $location)
    {
        $imageType = $attributes['imageType'];

        $imageData = $location
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

    public function asController(Location $location)
    {
        $requestData = request()->all();
        return $this->handle($requestData, $location);
    }
}
