<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\Services\Service;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Http\Actions\BaseChangeRequestAction;
use Reuniors\Reservations\Models\Service;
use Illuminate\Support\Facades\Auth;

class ServiceUpdateAction extends BaseChangeRequestAction
{
    public function getChildRules()
    {
        return [
            'id' => ['required', 'integer'],
            'group_id' => ['nullable', 'integer', 'exists:reuniors_reservations_services_groups,id'],
            'title' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'name' => ['nullable', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'active' => ['nullable', 'boolean'],
            'duration' => ['nullable', 'integer', 'min:0'],
            'price' => ['nullable', 'numeric', 'min:0'],
            'currency' => ['nullable', 'integer', 'in:0,1'],
            'sort_order' => ['nullable', 'integer'],
        ];
    }

    public function handle(array $attributes = [])
    {
        // This method is now handled by BaseChangeRequestAction
        // It will either create a change request or execute the action directly
        return parent::handle($attributes);
    }

    protected function getEntityType(): string
    {
        return 'service';
    }

    protected function getEntityClass(): string
    {
        return Service::class;
    }

    protected function performAction(array $attributes)
    {
        $service = Service::find($attributes['id']);
        
        if (!$service) {
            throw new \Exception('Service not found');
        }

        // Check if user has permission to update (admin only)
        $user = Auth::getUser();
        $isAdmin = $user && in_array($user->group->code, ['admin']);
        
        // Remove fields that non-admin users can't update
        if (!$isAdmin) {
            unset($attributes['slug']);
        }

        // Update fields
        $updateFields = [
            'group_id' => $attributes['group_id'] ?? $service->group_id,
            'title' => $attributes['title'] ?? $service->title,
            'description' => $attributes['description'] ?? $service->description,
            'name' => $attributes['name'] ?? $service->name,
            'duration' => $attributes['duration'] ?? $service->duration,
            'price' => $attributes['price'] ?? $service->price,
            'currency' => $attributes['currency'] ?? $service->currency,
            'sort_order' => $attributes['sort_order'] ?? $service->sort_order,
            'active' => $attributes['active'] ?? $service->active,
        ];

        // Update slug and active status only for admins
        if ($isAdmin) {
            $updateFields['slug'] = $attributes['slug'] ?? $service->slug;
        }

        // Update the service
        $service->fill($updateFields);
        $service->save();

        // Note: If sort_order was changed, the BaseModelWithSort class automatically
        // handles reordering of other services within the same group

        return $service->load('service_group');
    }
} 