<?php namespace Reuniors\Evodic\Http\Actions\V1\Place\PlaceType;

use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Evodic\Models\Location;
use Reuniors\Evodic\Models\PlaceType;

class GetPlaceTypesAction extends BaseAction
{

    public function rules()
    {
        return [
            'search' => 'string',
            'perPage' => 'integer',
            'locationId' => 'integer',
        ];
    }

    public function handle(array $attributes = [])
    {
        $search = $attributes['search'] ?? null;
        $perPage = $attributes['perPage'] ?? 15;
        $locationId = $attributes['locationId'] ?? null;

        $placesQuery = PlaceType::query();

        if ($search) {
            $placesQuery->where('title', 'like', "%$search%" );
        }
        if ($locationId) {
            $locationData = Location::where('id', $locationId)->firstOrFail();
            $placesQuery->whereHas('places', function ($query) use ($locationData) {
                $query->where('city_id', $locationData->city_id);
            });
            $placesQuery->withCount(['places' => function ($query) use ($locationData) {
                $query->whereHas('locations', function ($query) use ($locationData) {
                    $query->where('id', $locationData->id);
                });
            }]);
        }

        return $placesQuery->paginate($perPage);
    }
}
