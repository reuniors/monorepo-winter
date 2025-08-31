<?php namespace Reuniors\Knk\Http\ActionsFe\V1\Location;

use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Location;

class FeGetLocations extends BaseAction
{
    public function rules()
    {
        return [
            'citySlug' => ['string'],
            'categorySlug' => ['string'],
            'perPage' => ['integer'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $citySlug = $attributes['citySlug'] ?? null;
        $categorySlug = $attributes['categorySlug'] ?? null;
        $perPage = $attributes['perPage'] ?? 20;

        return Location::when($categorySlug, function ($query, $categorySlug) {
                return $query->whereHas('category', function ($query) use ($categorySlug) {
                    $query->where('slug', $categorySlug);
                });
            })
            ->when($citySlug, function ($query, $citySlug) {
                return $query->whereHas('city', function ($query) use ($citySlug) {
                    $query->where('slug', $citySlug);
                });
            })
            ->where('is_closed', 0)
            ->getFe();
    }
}
