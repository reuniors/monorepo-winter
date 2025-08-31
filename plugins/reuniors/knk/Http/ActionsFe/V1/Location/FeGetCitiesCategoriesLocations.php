<?php namespace Reuniors\Knk\Http\ActionsFe\V1\Location;

use Illuminate\Database\Query\JoinClause;
use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Category;
use Reuniors\Knk\Models\Location;
use Reuniors\Knk\Models\RegionCity;

class FeGetCitiesCategoriesLocations extends BaseAction
{
    public function rules()
    {
        return [
            'perPage' => ['integer'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $perPage = $attributes['perPage'] ?? 100;
        $categoryModel = new Category;
        $cityModel = new RegionCity;
        $categoryTable = $categoryModel->table;
        $cityTable = $cityModel->table;

        $citiesCategories = RegionCity::crossJoin($categoryTable)
            ->select("$cityTable.*", "$categoryTable.id as category_id", "$categoryTable.title as category_title", "$categoryTable.slug as category_slug")
            ->whereHas('locations', function ($query) use ($categoryTable) {
                $query
                    ->where('active', 1)
                    ->whereColumn('main_category_id', "$categoryTable.id");
            })
            ->orderBy('category_id')
            ->paginate($perPage);

        foreach ($citiesCategories as $cityCategory) {
            $cityCategory->locations = $cityCategory->locations()
                ->select(...Location::FE_SELECT)
                ->where('active', 1)
                ->where('is_closed', 0)
                ->where('main_category_id', $cityCategory->category_id)
                ->where('city_id', $cityCategory->id)
                ->with(['cover_image', 'logo'])
                ->limit($perPage)
                ->orderBy('id', 'desc')
                ->get();
        }

        return $citiesCategories;
    }
}
