<?php

namespace reuniors\knk\http\actions\v1\city;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Knk\Classes\CacheData;
use Reuniors\Knk\Models\Category;

class GetCities
{
    use asAction;

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

    public function asController()
    {
        $requestData = request()->all();
        return $this->handle($requestData);
    }
}
