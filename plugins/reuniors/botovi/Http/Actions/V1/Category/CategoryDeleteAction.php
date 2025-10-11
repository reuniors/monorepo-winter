<?php namespace Reuniors\Botovi\Http\Actions\V1\Category;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Botovi\Models\Category;

class CategoryDeleteAction extends BaseAction
{
    public function rules()
    {
        return [];
    }

    public function handle(array $attributes = [], Category $category = null)
    {
        // Check if category has children
        if ($category->children()->count() > 0) {
            throw new \Exception('Cannot delete category with children');
        }
        
        // Check if category is used by people
        if ($category->people()->count() > 0) {
            throw new \Exception('Cannot delete category that is used by people');
        }
        
        $category->delete();
        
        return ['success' => true, 'message' => 'Category deleted successfully'];
    }

    public function asController(Category $category = null): array
    {
        return parent::asController($category);
    }
}
