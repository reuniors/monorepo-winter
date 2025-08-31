<?php namespace Reuniors\Evodic\Http\Actions\V1\City;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Evodic\Models\City;

class GetCitiesAction
{
    use AsAction;

    public function rules()
    {
        return [
            'search' => 'string',
            'countryId' => 'integer',
        ];
    }

    public function handle($filters = [])
    {
        $countryId = $filters['countryId'] ?? null;

        $citiesQuery = City::query();

        if ($countryId) {
            $citiesQuery->where('country_id', $countryId);
        }

        return [
            'success' => true,
            'data' => $citiesQuery
                ->get()
        ];
    }

    public function asController()
    {
        return $this->handle(
            request()->all()
        );
    }
}
