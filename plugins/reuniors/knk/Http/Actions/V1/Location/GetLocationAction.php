<?php namespace reuniors\knk\Http\Actions\V1\Location;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Knk\Models\Location;

class GetLocationAction
{
    use asAction;

    public function rules()
    {
        return [];
    }

    public function handle(array $attributes, Location $location)
    {
        return [
            'success' => true,
            'data' => $location->load([
                'gallery',
                'menu_gallery',
                'cover_image',
                'logo', 'working_time',
                'delivery_working_time',
                'categories' => function ($query) {
                    $query->select('id');
                }
            ]),
        ];
    }

    public function asController(Location $location)
    {
        $requestData = request()->all();
        return $this->handle($requestData, $location);
    }
}
