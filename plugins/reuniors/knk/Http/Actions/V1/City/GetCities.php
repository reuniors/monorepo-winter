<?php

namespace reuniors\knk\http\actions\v1\city;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Classes\CacheData;
use Reuniors\Knk\Models\Category;

class GetCities extends BaseAction
{

    public function rules()
    {
        return [
            'onlyConnected' => 'boolean',
        ];
    }
    
    public function handle($attributes = [])
    {
        $cities = CacheData::get('cities-with-locations-count') ?? [];
        $onlyConnected = $attributes['onlyConnected'] ?? false;

        if ($onlyConnected) {
            $cities = array_filter($cities, function ($city) {
                return (int)$city['locationsCount'] > 0;
            });
        }

        return [
            'data' => array_values($cities),
            'success' => true,
        ];
    }

}
