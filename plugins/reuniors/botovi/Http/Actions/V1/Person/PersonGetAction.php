<?php namespace Reuniors\Botovi\Http\Actions\V1\Person;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Botovi\Models\Person;

class PersonGetAction extends BaseAction
{
    public function rules()
    {
        return [
            'page' => ['nullable', 'integer', 'min:1'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
            'search' => ['nullable', 'string'],
            'type' => ['nullable', 'string', 'in:bot,caci,neutral'],
            'category_id' => ['nullable', 'integer', 'exists:reuniors_botovi_categories,id'],
            'city_id' => ['nullable', 'integer', 'exists:reuniors_base_cities,id'],
            'status' => ['nullable', 'string', 'in:pending,approved,rejected,active,inactive'],
            'active' => ['nullable', 'boolean'],
            'sort_by' => ['nullable', 'string', 'in:created_at,updated_at,first_name,last_name,view_count,like_count'],
            'sort_order' => ['nullable', 'string', 'in:asc,desc'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $query = Person::with(['city', 'birth_city', 'main_category', 'categories', 'groups', 'tags', 'avatar', 'cover_image']);

        // Apply filters
        if (isset($attributes['search'])) {
            $query->search($attributes['search']);
        }

        if (isset($attributes['type'])) {
            $query->byType($attributes['type']);
        }

        if (isset($attributes['category_id'])) {
            $query->byCategory($attributes['category_id']);
        }

        if (isset($attributes['city_id'])) {
            $query->byCity($attributes['city_id']);
        }

        if (isset($attributes['status'])) {
            $query->where('status', $attributes['status']);
        }

        if (isset($attributes['active'])) {
            $query->where('active', $attributes['active']);
        }

        // Apply sorting
        $sortBy = $attributes['sort_by'] ?? 'created_at';
        $sortOrder = $attributes['sort_order'] ?? 'desc';
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $perPage = $attributes['per_page'] ?? 20;
        return $query->paginate($perPage);
    }
}
