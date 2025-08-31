<?php namespace Reuniors\Evodic\Http\ActionsOnFe\V1\Location;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Evodic\Models\PlaceType;
use Illuminate\Support\Facades\Cache;

class GetLocationPlaceTypesAction
{
    use asAction;

    public function rules()
    {
        return [
            'locationSlug' => ['required', 'string'],
            'cache' => 'boolean'
        ];
    }

    public function getLocationPlaceTypes($attributes = [])
    {
        return PlaceType::locationPlaceTypes($attributes)->paginate(10000);
    }

    public function handle(array $attributes = [])
    {
        // $placeTypes = PlaceType::locationPlaceTypes($attributes);
        if (!isset($attributes['cache']) || $attributes['cache'] === false) {
            return $this->getLocationPlaceTypes($attributes);
        }
//        Cache::forget('location_place_types_' . $attributes['locationSlug']);
        $placeTypes = Cache::rememberForever('location_place_types_' . $attributes['locationSlug'], function () use ($attributes) {
            return PlaceType::locationPlaceTypes($attributes)->paginate(10000)->toJSON();
        });
        return $placeTypes;
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
