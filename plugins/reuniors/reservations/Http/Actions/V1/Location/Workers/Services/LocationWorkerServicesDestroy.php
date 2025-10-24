<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\Workers\Services;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\LocationWorker;
use Reuniors\Reservations\Models\LocationWorkerService;

class LocationWorkerServicesDestroy extends BaseAction
{
    public function rules()
    {
        return [
            'locationSlug' => ['required', 'string'],
            'serviceId' => ['required', 'integer', 'exists:reuniors_reservations_services,id'],
        ];
    }

    public function handle(array $attributes = [], LocationWorker $worker = null)
    {
        $serviceId = $attributes['serviceId'];

        $workerService = LocationWorkerService::where('location_worker_id', $worker->id)
            ->where('service_id', $serviceId)
            ->firstOrFail();

        $workerService->delete();

        return ['success' => true, 'message' => 'Service removed from worker'];
    }

    public function asController(LocationWorker $worker = null): array
    {
        return parent::asController($worker);
    }
}
