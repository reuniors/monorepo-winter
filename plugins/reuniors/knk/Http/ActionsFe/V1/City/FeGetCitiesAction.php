<?php namespace Reuniors\Knk\Http\ActionsFe\V1\City;

use Reuniors\Knk\Classes\CacheData;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Location;

class FeGetCitiesAction extends BaseAction
{
    public function rules()
    {
        return [
            'onlyConnected' => 'boolean',
        ];
    }

    public function handle(array $attributes = [])
    {
        $cities = CacheData::get('cities-with-locations-count') ?? [];
        $onlyConnected = $attributes['onlyConnected'] ?? false;

        if ($onlyConnected) {
            $cities = array_filter($cities, function ($city) {
                return (int)$city['locationsCount'] > 0;
            });
        }

        return $cities;
    }
}
