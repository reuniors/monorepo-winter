<?php namespace Reuniors\Knk\Http\ActionsFe\V1\Location;

use Illuminate\Database\Query\JoinClause;
use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Category;
use Reuniors\Knk\Models\Location;
use Reuniors\Base\Models\City;

class FeGetCityCategoriesLocations extends BaseAction
{
    public function rules()
    {
        return [
            'perPage' => ['integer'],
            'citySlug' => ['string', 'required'],
            'locationsPerPage' => ['integer']
        ];
    }

    public function handle(array $attributes = [])
    {
        $perPage = $attributes['perPage'] ?? 100;
        $locationsPerPage = $attributes['locationsPerPage'] ?? 6;
        $citySlug = $attributes['citySlug'];
        $cityData = City::query()
            ->where('slug', $citySlug)
            ->firstOrFail();

        $categories = Category::query()
            ->whereHas('locations', function ($query) use ($cityData) {
                $query
                    ->where('active', 1)
                    ->where('city_id', $cityData->id);
            })
            ->paginate($perPage);

        foreach ($categories as $category) {
            $category->locations = $category->locations()
                ->select(...Location::FE_SELECT)
                ->where('active', 1)
                ->where('is_closed', 0)
                ->where('city_id', $cityData->id)
                ->with(['cover_image', 'logo'])
                ->orderByRaw("main_category_id = {$category->id}, id DESC")
                ->limit($locationsPerPage)
                ->get();
        }

        return $categories;
    }
}
