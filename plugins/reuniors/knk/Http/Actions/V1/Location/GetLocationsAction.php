<?php namespace Reuniors\Knk\Http\Actions\V1\Location;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Classes\S;
use Reuniors\Knk\Models\Location;

class GetLocationsAction extends BaseAction
{

    const PER_PAGE = 30;

    public function rules()
    {
        return [
            'search' => 'string',
            'citySlug' => 'string',
            'fields' => 'array',
            'isRestaurantMenuUpdated' => 'boolean'
        ];
    }

    public function handle($attributes = [])
    {
        $search = $attributes['search'] ?? null;
        $citySlug = $attributes['citySlug'] ?? null;
        $fields = $attributes['fields'] ?? [
            'id', 'name', 'slug', 'title',
        ];
        $isRestaurantMenuUpdated = $attributes['isRestaurantMenuUpdated'] ?? false;

        $locations = Location::query()
            ->select($fields);

        if ($search) {
            $locations = $locations
                ->where(function ($query) use ($search) {
                    $searchSlug = S::slug($search);
                    $searchName = S::camel($search);

                    $query
                        ->where('title', 'like', "%$search%")
                        ->orWhere('slug', 'like', "%$searchSlug%")
                        ->orWhere('name', 'like', "%$searchName%");
                });
        }

        if ($citySlug) {
            $locations = $locations->whereHas('city', function ($query) use ($citySlug) {
                $query
                    ->where('slug', $citySlug)
                    ->orWhereHas('parent_city', function ($childCitiesQuery) use ($citySlug) {
                        $childCitiesQuery->where('slug', $citySlug);
                    });;
            });
        }

        if ($isRestaurantMenuUpdated) {
            $locations = $locations->where(function ($query) {
                $query
//                    ->whereHas('restaurant_menu', function ($query) {
//                        $query->whereNotNull('relations_updated_at');
//                    })
                    ->has('restaurant_menu', '>', 1)
                    ->orHas('change_actions');
            });
        }

        return [
            'success' => true,
            'data' => $locations->paginate(self::PER_PAGE),
        ];
    }

    public function asController()
    {
        $requestData = request()->all();
        return $this->handle($requestData);
    }
}
