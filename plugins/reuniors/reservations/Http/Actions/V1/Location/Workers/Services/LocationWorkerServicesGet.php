<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\Workers\Services;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\LocationWorker;

class LocationWorkerServicesGet extends BaseAction
{
    public function rules()
    {
        return [
            'locationSlug' => ['required', 'string'],
            'perPage' => ['integer'],
        ];
    }

    public function handle(array $attributes = [], LocationWorker $worker = null)
    {
        $perPage = $attributes['perPage'] ?? 50;

        $services = $worker->services()
            ->withPivot(['price', 'duration', 'sort_order', 'active', 'location_id'])
            ->orderBy('pivot_sort_order')
            ->get();

        // Transform to expected format
        return $services->map(function ($service) {
            return [
                'id' => null, // Pivot table doesn't have id field
                'serviceId' => $service->id,
                'locationId' => $service->pivot->location_id,
                'locationWorkerId' => $service->pivot->location_worker_id,
                'price' => $service->pivot->price,
                'duration' => $service->pivot->duration,
                'sortOrder' => $service->pivot->sort_order,
                'active' => (bool) $service->pivot->active,
                'service' => [
                    'id' => $service->id,
                    'title' => $service->title,
                    'description' => $service->description,
                    'price' => $service->price,
                    'duration' => $service->duration,
                ],
            ];
        });
    }

    public function asController(LocationWorker $worker = null): array
    {
        return parent::asController($worker);
    }
}
