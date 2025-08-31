<?php namespace Reuniors\Knk\Http\ActionsFe\V1\Location;

use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Category;

class FeGetLocationsCategories extends BaseAction
{
    public function handle(array $attributes = [])
    {
        $categories = Category::query()
            ->where('active', 1)
            ->orderBy('priority', 'DESC')
            ->get();

        return $categories;
    }
}
