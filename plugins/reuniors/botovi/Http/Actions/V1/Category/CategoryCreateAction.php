<?php namespace Reuniors\Botovi\Http\Actions\V1\Category;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Botovi\Models\Category;
use Illuminate\Support\Facades\Auth;

class CategoryCreateAction extends BaseAction
{
    public function rules()
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:reuniors_botovi_categories,slug'],
            'description' => ['nullable', 'string'],
            'parent_id' => ['nullable', 'integer', 'exists:reuniors_botovi_categories,id'],
            'active' => ['boolean'],
            'sort_order' => ['integer', 'min:0'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $category = Category::create($attributes);
        
        return $category;
    }
}
