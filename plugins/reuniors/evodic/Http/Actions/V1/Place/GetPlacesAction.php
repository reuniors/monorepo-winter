<?php namespace Reuniors\Evodic\Http\Actions\V1\Place;

use Illuminate\Http\Request;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Evodic\Models\Place;

class GetPlacesAction
{
    use asAction;

    public function rules()
    {
        return [
            'citySlug' => 'string',
            'placeTypeId' => 'numeric',
            'locationId' => 'numeric',
        ];
    }

    public function handle(array $attributes = [])
    {
        $citySlug = $attributes['citySlug'] ?? null;
        $placeTypeId = $attributes['placeTypeId'] ?? null;
        $locationId = $attributes['locationId'] ?? null;

        $placesQuery = Place::query();

        if ($citySlug) {
            $placesQuery->whereHas('city', function ($query) use ($citySlug) {
                $query->where('slug', $citySlug);
            });
        }
        if ($placeTypeId) {
            $placesQuery->whereHas('placeType', function ($query) use ($placeTypeId) {
                $query->where('id', $placeTypeId);
            });
        }
        if ($locationId) {
            $placesQuery->whereHas('locations', function ($query) use ($locationId) {
                $query->where('id', $locationId);
            });
        }

        return [
            'success' => true,
            'data' => $placesQuery
                ->whereNot('address_lat')
                ->paginate()
        ];
    }

    public function asController(Request $request)
    {
        $requestData = $request->all();
        return $this->handle($requestData);
    }
}
