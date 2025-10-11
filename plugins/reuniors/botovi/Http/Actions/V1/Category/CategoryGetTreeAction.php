<?php namespace Reuniors\Botovi\Http\Actions\V1\Category;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Botovi\Models\Category;

class CategoryGetTreeAction extends BaseAction
{
    public function rules()
    {
        return [
            'search' => ['nullable', 'string', 'max:255'],
            'active' => ['nullable', 'boolean'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $search = $attributes['search'] ?? null;
        $active = $attributes['active'] ?? null;

        $query = Category::query();

        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($active !== null) {
            $query->where('active', $active);
        }

        // Use NestedTree's getNested() method for hierarchical structure
        $nested = $query->getNested();
        
        // Convert to array - getNested() returns Collection, we need array
        return array_values($nested->toArray());
    }
}
