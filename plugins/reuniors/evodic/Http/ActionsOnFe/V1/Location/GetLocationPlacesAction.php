<?php namespace Reuniors\Evodic\Http\ActionsOnFe\V1\Location;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Evodic\Models\Place;
use Illuminate\Support\Facades\Cache;

class GetLocationPlacesAction extends BaseAction
{

    public function rules()
    {
        return [
            'locationSlug' => ['required', 'string'],
            'cache' => 'boolean'
        ];
    }

    public function getLocationPlaces($attributes = [])
    {
        return Place::locationPlaces($attributes)->paginate(10000);
    }

    public function handle(array $attributes = [])
    {
        if (!isset($attributes['cache']) || $attributes['cache'] === false) {
            return $this->getLocationPlaces($attributes);
        }
        // $placesData = Place::locationPlaces($attributes);
//        Cache::forget('location_places_' . $attributes['locationSlug']);
        $placesData = Cache::rememberForever('location_places_' . $attributes['locationSlug'], function () use ($attributes) {
            return Place::locationPlaces($attributes)->paginate(10000)->toJSON();
        });

        return $placesData;
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
