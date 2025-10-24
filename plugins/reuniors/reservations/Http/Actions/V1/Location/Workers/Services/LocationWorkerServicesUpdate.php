<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\Workers\Services;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\LocationWorker;
use Reuniors\Reservations\Models\LocationWorkerService;

class LocationWorkerServicesUpdate extends BaseAction
{
    public function rules()
    {
        return [
            'locationSlug' => ['required', 'string'],
            'serviceId' => ['required', 'integer', 'exists:reuniors_reservations_services,id'],
            'price' => ['nullable', 'numeric', 'min:0'],
            'duration' => ['nullable', 'integer', 'min:1'],
            'sortOrder' => ['nullable', 'integer'],
            'active' => ['boolean'],
        ];
    }

    public function handle(array $attributes = [], LocationWorker $worker = null)
    {
        $serviceId = $attributes['serviceId'];
        $price = $attributes['price'] ?? null;
        $duration = $attributes['duration'] ?? null;
        $sortOrder = $attributes['sortOrder'] ?? null;
        $active = $attributes['active'] ?? true;

        $workerService = LocationWorkerService::where('location_worker_id', $worker->id)
            ->where('service_id', $serviceId)
            ->firstOrFail();

        $workerService->update([
            'price' => $price,
            'duration' => $duration,
            'sort_order' => $sortOrder,
            'active' => $active,
        ]);

        return $workerService;
    }

    public function asController(LocationWorker $worker = null): array
    {
        return parent::asController($worker);
    }
}
