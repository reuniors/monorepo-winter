<?php namespace Reuniors\Evodic\Http\Actions\V1\City;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Base\Models\City;

class GetCitiesAction extends BaseAction {
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
