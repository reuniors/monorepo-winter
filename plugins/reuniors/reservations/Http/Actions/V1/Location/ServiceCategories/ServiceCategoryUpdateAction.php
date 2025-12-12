<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\ServiceCategories;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\ServiceCategory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ServiceCategoryUpdateAction extends BaseAction
{
    public function rules()
    {
        return [
            'id' => ['required', 'integer'],
            'title' => ['nullable', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'active' => ['nullable', 'boolean'],
            'sortOrder' => ['nullable', 'integer', 'min:0'],
            'serviceGroupIds' => ['nullable', 'array'],
            'serviceGroupIds.*' => ['integer', 'exists:reuniors_reservations_services_groups,id'],
            'service_group_ids' => ['nullable', 'array'],
            'service_group_ids.*' => ['integer', 'exists:reuniors_reservations_services_groups,id'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $serviceCategory = ServiceCategory::find($attributes['id']);
        
        if (!$serviceCategory) {
            throw new \Exception('Service category not found');
        }

        // Check if user has permission to update (admin only)
        $user = Auth::getUser();
        $isAdmin = $user && in_array($user->group->code, ['admin']);
        
        // Remove fields that non-admin users can't update
        if (!$isAdmin) {
            unset($attributes['slug']);
            unset($attributes['active']);
        }

        // Update title
        if (isset($attributes['title'])) {
            $serviceCategory->title = $attributes['title'];
        }

        // Update slug (only for admins)
        if ($isAdmin && isset($attributes['slug'])) {
            // Ensure slug is unique
            $baseSlug = $attributes['slug'];
            $counter = 1;
            $newSlug = $baseSlug;
            while (ServiceCategory::where('slug', $newSlug)
                ->where('location_id', $serviceCategory->location_id)
                ->where('id', '!=', $serviceCategory->id)
                ->exists()) {
                $newSlug = $baseSlug . '-' . $counter;
                $counter++;
            }
            $serviceCategory->slug = $newSlug;
        }

        // Update description
        if (isset($attributes['description'])) {
            $serviceCategory->description = $attributes['description'];
        }

        // Update active status (only for admins)
        if ($isAdmin && isset($attributes['active'])) {
            $serviceCategory->active = $attributes['active'];
        }

        // Update sort order
        if (isset($attributes['sortOrder'])) {
            $serviceCategory->sort_order = $attributes['sortOrder'];
        }

        $serviceCategory->save();

        // Handle service groups attach/detach
        // Support both camelCase and snake_case from request
        $serviceGroupIds = request()->input('serviceGroupIds') ?? request()->input('service_group_ids') ?? null;
        if ($serviceGroupIds !== null) {
            $serviceCategory->serviceGroups()->sync($serviceGroupIds);
        }

        // Reload service groups relationship
        $serviceCategory->load('serviceGroups');

        return $serviceCategory;
    }
}

