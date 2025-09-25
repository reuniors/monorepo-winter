<?php

namespace reuniors\knk\http\actions\v1\location\category;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Classes\CacheData;
use Reuniors\Knk\Models\Category;

class GetCategories extends BaseAction
{

    const WITHOUT_CATEGORIES = ['zatvoreni-objekti', 'dostava'];

    public function removeUnused(array $categories)
    {
        foreach (self::WITHOUT_CATEGORIES as $unusedCategory) {
            if (isset($categories[$unusedCategory])) {
                unset($categories[$unusedCategory]);
            }
        }
        return $categories;
    }

    public function rules()
    {
        return [];
    }

    public function handle(array $attributes = [])
    {
        $categories = array_values(
            $this->removeUnused(CacheData::get('categories') ?? [])
        );

        return $categories;
    }
}
