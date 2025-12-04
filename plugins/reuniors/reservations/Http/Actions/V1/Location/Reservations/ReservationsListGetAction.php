<?php
namespace Reuniors\Reservations\Http\Actions\V1\Location\Reservations;

use Carbon\Carbon;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Http\Enums\ReservationStatus;
use Reuniors\Reservations\Models\ClientReservation;
use Reuniors\Reservations\Models\Location;

class ReservationsListGetAction extends BaseAction
{
    public function rules()
    {
        return [
            'locationSlug' => ['string', 'required'],
            'startDate' => ['string', 'required'], // ISO 8601 with timezone, e.g., "2025-12-01T00:00:00+01:00"
            'endDate' => ['string', 'required'], // ISO 8601 with timezone, e.g., "2025-12-31T23:59:59+01:00"
            'workerIds' => ['array', 'nullable'], // Optional - filter by worker IDs
            'workerIds.*' => ['integer'],
            'status' => ['string', 'nullable'], // Optional - filter by status
            'page' => ['integer', 'nullable', 'min:1'],
            'perPage' => ['integer', 'nullable', 'min:1', 'max:100'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $location = Location::where('slug', $attributes['locationSlug'])
            ->firstOrFail();

        // Parse dates with timezone and convert to UTC
        $startDate = Carbon::parse($attributes['startDate'])->setTimezone('UTC');
        $endDate = Carbon::parse($attributes['endDate'])->setTimezone('UTC');

        // Build query
        $query = ClientReservation::query()
            ->where('location_id', $location->id)
            ->whereBetween('date_utc', [
                $startDate->toDateTimeString(),
                $endDate->toDateTimeString(),
            ])
            ->where('status', '!=', ReservationStatus::CANCELLED)
            ->whereNotNull('date_utc')
            ->whereNotNull('services_duration');

        // Filter by worker IDs
        if (isset($attributes['workerIds']) && is_array($attributes['workerIds']) && count($attributes['workerIds']) > 0) {
            $query->whereIn('location_worker_id', $attributes['workerIds']);
        }

        // Filter by status
        if (isset($attributes['status'])) {
            $query->where('status', $attributes['status']);
        }

        // Eager load relationships
        $query->with([
            'locationWorker',
            'client',
            'services' => function ($q) {
                $q->select('reuniors_reservations_services.id', 'reuniors_reservations_services.name');
            },
        ]);

        // Select only needed fields
        $query->select([
            'id',
            'hash',
            'date_utc',
            'services_duration',
            'location_id',
            'location_worker_id',
            'client_id',
            'status',
            'services_cost',
            'notes',
            'created_at',
            'updated_at',
        ]);

        // Order by date
        $query->orderBy('date_utc', 'asc');

        // Pagination
        $perPage = $attributes['perPage'] ?? 20;
        $page = $attributes['page'] ?? 1;

        $paginator = $query->paginate($perPage, ['*'], 'page', $page);

        // Transform results to minimal format
        $data = $paginator->getCollection()->map(function ($reservation) {
            $startTime = Carbon::parse($reservation->date_utc);
            $endTime = $startTime->copy()->addMinutes($reservation->services_duration);
            return [
                'id' => $reservation->id,
                'uuid' => $reservation->hash,
                'startTime' => $startTime->toIso8601String(),
                'endTime' => $endTime->toIso8601String(),
                'workerId' => $reservation->location_worker_id,
                'workerName' => $reservation->locationWorker ? $reservation->locationWorker->full_name : 'Unknown',
                'clientId' => $reservation->client_id,
                'clientName' => $reservation->client ? $reservation->client->full_name : 'Unknown',
                'clientPhone' => $reservation->client ? $reservation->client->phone : null,
                'status' => $reservation->status,
                'services' => $reservation->services->map(function ($service) {
                    return [
                        'id' => $service->id,
                        'name' => $service->name,
                    ];
                })->toArray(),
                'totalPrice' => $reservation->services_cost ?? 0,
                'notes' => $reservation->notes,
                'createdAt' => $reservation->created_at ? Carbon::parse($reservation->created_at)->toIso8601String() : null,
                'updatedAt' => $reservation->updated_at ? Carbon::parse($reservation->updated_at)->toIso8601String() : null,
            ];
        });

        return [
            'data' => $data,
            'meta' => [
                'total' => $paginator->total(),
                'perPage' => $paginator->perPage(),
                'currentPage' => $paginator->currentPage(),
                'lastPage' => $paginator->lastPage(),
            ],
        ];
    }
}

