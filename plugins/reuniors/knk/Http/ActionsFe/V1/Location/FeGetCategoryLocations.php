<?php namespace Reuniors\Knk\Http\ActionsFe\V1\Location;

use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Category;
use Reuniors\Knk\Models\Location;
use Reuniors\Knk\Models\RegionCity;

class FeGetCategoryLocations extends BaseAction
{
    public function rules()
    {
        return [
            'perPage' => ['integer'],
            'citySlug' => ['string', 'required'],
            'categorySlug' => ['string', 'required'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $perPage = $attributes['perPage'] ?? 2000;
        $citySlug = $attributes['citySlug'];
        $categorySlug = $attributes['categorySlug'];

        $cityData = RegionCity::query()
            ->where('slug', $citySlug)
            ->firstOrFail();

        $category = Category::query()
            ->where('slug', $categorySlug)
            ->firstOrFail();

        return Location::query()
            ->select('id', 'city_id', 'main_category_id', 'title', 'slug', 'active', 'snippet', 'likes_count', 'comments_count', 'rating_average_grade')
            ->where('active', 1)
            ->where('is_closed', 0)
            ->where('city_id', $cityData->id)
            ->whereHas('categories', function ($query) use ($category) {
                $query->where('id', $category->id);
            })
            ->with(['cover_image', 'logo'])
            ->paginate($perPage);
    }
}
