<?php

namespace Reuniors\Knk\Http\ActionsFe\V1\Category;

use Reuniors\Knk\Http\Actions\BaseAction;
use Reuniors\Knk\Models\Category;

class LocationCategoryGetOneAction extends BaseAction
{
    public function rules()
    {
        return [
            'categorySlug' => ['string', 'required'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $categorySlug = $attributes['categorySlug'];

        return Category::query()
            ->where('slug', $categorySlug)
            ->where('active', 1)
            ->select('id', 'title', 'slug')
            ->firstOrFail();
    }
}
