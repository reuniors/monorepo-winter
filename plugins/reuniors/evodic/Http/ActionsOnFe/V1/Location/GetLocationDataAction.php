<?php namespace Reuniors\Evodic\Http\ActionsOnFe\V1\Location;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Evodic\Models\Location;
use Illuminate\Support\Facades\Cache;

class GetLocationDataAction extends BaseAction
{

    public function rules()
    {
        return [
            'slug' => ['required', 'string'],
            'cache' => 'boolean'
        ];
    }

    public function getLocationData($attributes = [])
    {
        return Location::getLocationData($attributes)->firstOrFail();
    }

    public function handle(array $attributes = [])
    {
        if (!isset($attributes['cache']) || $attributes['cache'] === false) {
            return $this->getLocationData($attributes);
        }
//        Cache::forget('location_data_' . $attributes['slug']);
        $locationData = Cache::rememberForever('location_data_' . $attributes['slug'], function () use ($attributes) {
            return Location::getLocationData($attributes)->firstOrFail()->toJSON();
        });

        return $locationData;
    }
}
