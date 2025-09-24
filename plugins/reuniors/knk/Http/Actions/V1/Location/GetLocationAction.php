<?php namespace reuniors\knk\Http\Actions\V1\Location;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Location;

class GetLocationAction extends BaseAction
{

    public function rules()
    {
        return [];
    }

    public function handle(array $attributes = [], Location $location = null)
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

    public function asController(Location $location = null): array
    {
        return parent::asController($location);
    }
}
