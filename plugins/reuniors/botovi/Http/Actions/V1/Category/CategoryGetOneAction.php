<?php namespace Reuniors\Botovi\Http\Actions\V1\Category;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Botovi\Models\Category;

class CategoryGetOneAction extends BaseAction
{
    public function rules()
    {
        return [];
    }

    public function handle(array $attributes = [], Category $category = null)
    {
        return $category;
    }

    public function asController(Category $category = null): array
    {
        return parent::asController($category);
    }
}
