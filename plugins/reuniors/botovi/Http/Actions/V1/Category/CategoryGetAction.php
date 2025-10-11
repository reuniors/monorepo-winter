<?php namespace Reuniors\Botovi\Http\Actions\V1\Category;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Botovi\Models\Category;

class CategoryGetAction extends BaseAction
{
    public function rules()
    {
        return [
            'search' => ['nullable', 'string', 'max:255'],
            'page' => ['nullable', 'integer', 'min:1'],
            'perPage' => ['nullable', 'integer', 'min:1', 'max:25000'],
            'active' => ['nullable', 'boolean'],
            'parentId' => ['nullable', 'integer', 'exists:reuniors_botovi_categories,id'],
            'isTree' => ['nullable', 'integer'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $search = $attributes['search'] ?? null;
        $perPage = $attributes['perPage'] ?? 15;
        $active = $attributes['active'] ?? null;
        $parentId = $attributes['parentId'] ?? null;
        $isTree = $attributes['isTree'] ?? false;

        $query = Category::with(['parent', 'children']);

        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($active !== null) {
            $query->where('active', $active);
        }

        if ($parentId !== null) {
            $query->where('parent_id', $parentId);
        }

        // If isTree is true, use NestedTree's getNested() method for hierarchical structure
        if ($isTree) {
            return Category::getNested();
        }

        return $query->orderBy('sort_order', 'asc')
                    ->orderBy('name', 'asc')
                    ->paginate($perPage);
    }
}
