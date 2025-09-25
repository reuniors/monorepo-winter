<?php namespace Reuniors\Base\Http\Actions\V1\Country;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Base\Models\Country;

class GetCountriesAction extends BaseAction {
    public function rules()
    {
        return [
            'search' => 'nullable|string|max:255',
            'active' => 'nullable|boolean',
        ];
    }

    public function handle($filters = [])
    {
        $search = $filters['search'] ?? null;
        $active = $filters['active'] ?? null;

        $countriesQuery = Country::query();

        if ($search) {
            $countriesQuery->where('name', 'like', "%{$search}%");
        }

        if ($active !== null) {
            $countriesQuery->where('active', $active);
        }

        return $countriesQuery->orderBy('name')->get();
    }
}
