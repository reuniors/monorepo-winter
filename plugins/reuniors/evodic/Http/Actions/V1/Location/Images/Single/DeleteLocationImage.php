<?php namespace Reuniors\Evodic\Http\Actions\V1\Location\Images\Single;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Evodic\Models\Location;

class DeleteLocationImage extends BaseAction
{
    
    public function rules()
    {
        return [
            'imageType' => ['required', 'in:cover,logo'],
        ];
    }

    public function handle(array $attributes = [], Location $location = null)    {
        $imageType = $attributes['imageType'];

        $imageData = $location
            ->{$imageType}()
            ->first();

        if ($imageData) {
            $imageData->delete();
        }

        return [
            'type' => $imageType,
        ];
    }

    public function asController(Location $location = null): array
    {
        return parent::asController($location);
    }
}
