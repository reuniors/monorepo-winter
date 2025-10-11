<?php namespace Reuniors\Botovi\Http\Actions\V1\Category;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Botovi\Models\Category;
class CategoryUpdateAction extends BaseAction
{
    public function rules()
    {
        return [
            'name' => ['nullable', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'parent_id' => ['nullable', 'integer', 'exists:reuniors_botovi_categories,id'],
            'active' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }

    public function handle(array $attributes = [], Category $category = null)
    {
        $category->update($attributes);
        
        return $category;
    }

    public function asController(Category $category = null): array
    {
        return parent::asController($category);
    }
}
