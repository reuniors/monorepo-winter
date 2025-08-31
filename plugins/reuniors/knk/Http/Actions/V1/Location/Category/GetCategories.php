<?php

namespace reuniors\knk\http\actions\v1\location\category;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Knk\Classes\CacheData;
use Reuniors\Knk\Models\Category;

class GetCategories
{
    use asAction;

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

    public function handle()
    {
        $categories = array_values(
            $this->removeUnused(CacheData::get('categories') ?? [])
        );

        return [
            'data' => $categories,
            'success' => true,
        ];
    }

    public function rules()
    {
        return [];
    }

    public function asController()
    {
        return $this->handle();
    }
}
