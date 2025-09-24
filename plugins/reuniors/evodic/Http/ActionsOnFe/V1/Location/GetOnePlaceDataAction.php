<?php namespace Reuniors\Evodic\Http\ActionsOnFe\V1\Location;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Evodic\Models\Place;
use Illuminate\Support\Facades\Cache;

class GetOnePlaceDataAction extends BaseAction
{

    public function rules()
    {
        return [
            'slug' => ['required', 'string'],
            'cache' => 'boolean'
        ];
    }

    public function getPlaceData($attributes = [])
    {
        return Place::placeData($attributes)->firstOrFail();
    }

    public function handle(array $attributes = [])
    {
        if (!isset($attributes['cache']) || $attributes['cache'] === false) {
            return $this->getPlaceData($attributes);
        }

        $locationData = Cache::rememberForever('place_data_' . $attributes['slug'], function () use ($attributes) {
            return $this->getPlaceData($attributes)->toJSON();
        });

        return $locationData;
    }

    public function asController()
    {
        $requestData = request()->all();
        return [
            'data' => $this->handle($requestData),
            'success' => true
        ];
    }
}
