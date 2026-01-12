<?php
namespace Reuniors\Reservations\Http\Actions\V1\Location\Workers;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;
use Reuniors\Reservations\Models\LocationWorker;

class LocationWorkerUpdateAction extends BaseAction
{
    public function rules()
    {
        return [
            'id' => ['required', 'integer'],
            'locationSlug' => ['required', 'string'],
            'first_name' => ['sometimes', 'string', 'max:255'],
            'last_name' => ['sometimes', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'active' => ['nullable', 'boolean'],
            'status' => ['nullable', 'integer'],
            'user_id' => ['nullable', 'integer'],
            'phone_data' => ['nullable', 'array'],
            'is_synced_service' => ['nullable', 'boolean'],
            'is_synced_category' => ['nullable', 'boolean'],
            'max_discount_percent' => ['nullable', 'integer', 'min:0', 'max:100'],
            'service_category_ids' => ['nullable', 'array'],
            'service_category_ids.*' => ['integer'],
            // Also accept camelCase for backward compatibility
            'serviceCategoryIds' => ['nullable', 'array'],
            'serviceCategoryIds.*' => ['integer'],
            // Add other fields as needed
        ];
    }

    public function handle(array $attributes = [])
    {
        $location = Location::where('slug', $attributes['locationSlug'])->first();
        if (!$location) {
            throw new \Exception('Location not found');
        }

        $worker = LocationWorker::find($attributes['id']);
        if (!$worker) {
            throw new \Exception('Worker not found');
        }

        // Handle service categories separately
        // Accept both snake_case and camelCase
        $serviceCategoryIds = $attributes['service_category_ids'] ?? $attributes['serviceCategoryIds'] ?? null;
        unset($attributes['serviceCategoryIds'], $attributes['service_category_ids']);

        $worker->fill($attributes);
        $worker->save();

        // Sync service categories if provided
        if ($serviceCategoryIds !== null) {
            $worker->serviceCategories()->sync($serviceCategoryIds);
        }

        // Ensure attached to location
        if (!$location->workers()->where('location_worker_id', $worker->id)->exists()) {
            $location->workers()->attach($worker->id);
        }

        // Load serviceCategories relation before returning
        return $worker->fresh()->load('serviceCategories:id,title,slug,active');
    }
} 