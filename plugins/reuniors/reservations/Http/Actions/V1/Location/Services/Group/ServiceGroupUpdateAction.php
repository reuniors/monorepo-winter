<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\Services\Group;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Reservations\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\ServiceGroup;
use Illuminate\Support\Facades\Auth;

class ServiceGroupUpdateAction extends BaseAction
{
    use AsAction;

    public function rules()
    {
        return [
            'id' => ['required', 'integer'],
            'title' => ['nullable', 'string', 'max:255'],
            'name' => ['nullable', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'active' => ['nullable', 'boolean'],
            'type' => ['nullable', 'integer'],
            'sort_order' => ['nullable', 'integer'],
            'required' => ['nullable', 'boolean'],
            'min_selected' => ['nullable', 'integer', 'min:0'],
            'max_selected' => ['nullable', 'integer', 'min:0'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $serviceGroup = ServiceGroup::find($attributes['id']);
        
        if (!$serviceGroup) {
            throw new \Exception('Service group not found');
        }

        // Check if user has permission to update (admin only)
        $user = Auth::getUser();
        $isAdmin = $user && in_array($user->group->code, ['admin']);
        
        // Remove fields that non-admin users can't update
        if (!$isAdmin) {
            unset($attributes['slug']);
            unset($attributes['active']);
        }

        // Update fields
        $updateFields = [
            'title' => $attributes['title'] ?? $serviceGroup->title,
            'name' => $attributes['name'] ?? $serviceGroup->name,
            'description' => $attributes['description'] ?? $serviceGroup->description,
            'type' => $attributes['type'] ?? $serviceGroup->type,
            'sort_order' => $attributes['sort_order'] ?? $serviceGroup->sort_order,
            'required' => $attributes['required'] ?? $serviceGroup->required,
            'min_selected' => $attributes['min_selected'] ?? $serviceGroup->min_selected,
            'max_selected' => $attributes['max_selected'] ?? $serviceGroup->max_selected,
        ];

        // Update slug and active status only for admins
        if ($isAdmin) {
            $updateFields['slug'] = $attributes['slug'] ?? $serviceGroup->slug;
            $updateFields['active'] = $attributes['active'] ?? $serviceGroup->active;
        }

        // Update the service group
        $serviceGroup->fill($updateFields);
        $serviceGroup->save();

        // Note: If sort_order was changed, the BaseModelWithSort class automatically
        // handles reordering of other items in the same scope

        return $serviceGroup->load('services');
    }
} 