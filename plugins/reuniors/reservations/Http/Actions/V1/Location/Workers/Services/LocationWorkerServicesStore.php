<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\Workers\Services;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\LocationWorker;
use Reuniors\Reservations\Models\LocationWorkerService;

class LocationWorkerServicesStore extends BaseAction
{
    public function rules()
    {
        return [
            'locationSlug' => ['required', 'string'],
            'services' => ['required', 'array', 'min:1'],
            'services.*.serviceId' => ['required', 'integer', 'exists:reuniors_reservations_services,id'],
            'services.*.locationId' => ['required', 'integer', 'exists:reuniors_reservations_locations,id'],
            'services.*.price' => ['nullable', 'numeric', 'min:0'],
            'services.*.duration' => ['nullable', 'integer', 'min:1'],
            'services.*.sortOrder' => ['nullable', 'integer'],
            'services.*.active' => ['boolean'],
        ];
    }

    public function handle(array $attributes = [], LocationWorker $worker = null)
    {
        $services = $attributes['services'];
        
        // Get all service IDs being sent
        $sentServiceIds = collect($services)->pluck('serviceId')->toArray();
        
        // Delete services that are not in the sent list (classic sync)
        LocationWorkerService::where('location_worker_id', $worker->id)
            ->whereNotIn('service_id', $sentServiceIds)
            ->delete();
        
        $results = [];
        
        foreach ($services as $serviceData) {
            $serviceId = $serviceData['serviceId'];
            $locationId = $serviceData['locationId'];
            $price = $serviceData['price'] ?? null;
            $duration = $serviceData['duration'] ?? null;
            $sortOrder = $serviceData['sortOrder'] ?? null;
            $active = $serviceData['active'] ?? true;

            // Check if relationship already exists
            $existing = LocationWorkerService::where('location_worker_id', $worker->id)
                ->where('service_id', $serviceId)
                ->where('location_id', $locationId)
                ->first();

            if ($existing) {
                // Update existing relationship
                $existing->update([
                    'price' => $price,
                    'duration' => $duration,
                    'sort_order' => $sortOrder,
                    'active' => $active,
                ]);
                $results[] = $existing;
            } else {
                // Create new relationship
                $workerService = LocationWorkerService::create([
                    'location_worker_id' => $worker->id,
                    'service_id' => $serviceId,
                    'location_id' => $locationId,
                    'price' => $price,
                    'duration' => $duration,
                    'sort_order' => $sortOrder,
                    'active' => $active,
                ]);
                $results[] = $workerService;
            }
        }

        return $results;
    }

    public function asController(LocationWorker $worker = null): array
    {
        return parent::asController($worker);
    }
}
