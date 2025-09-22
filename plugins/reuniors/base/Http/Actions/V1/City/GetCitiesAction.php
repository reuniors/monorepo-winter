<?php namespace Reuniors\Base\Http\Actions\V1\City;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Base\Models\City;

class GetCitiesAction
{
    use AsAction;

    public function rules()
    {
        return [
            'search' => 'nullable|string|max:255',
            'country_id' => 'nullable|integer|exists:reuniors_base_countries,id',
            'active' => 'nullable|boolean',
        ];
    }

    public function handle($filters = [])
    {
        $search = $filters['search'] ?? null;
        $countryId = $filters['country_id'] ?? null;
        $active = $filters['active'] ?? null;

        $citiesQuery = City::with('country');

        if ($search) {
            $citiesQuery->where('name', 'like', "%{$search}%");
        }

        if ($countryId) {
            $citiesQuery->where('country_id', $countryId);
        }

        if ($active !== null) {
            $citiesQuery->where('active', $active);
        }

        return [
            'success' => true,
            'data' => $citiesQuery->orderBy('name')->get()
        ];
    }

    public function asController()
    {
        return $this->handle(request()->all());
    }
}
