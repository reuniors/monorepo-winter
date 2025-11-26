<?php
namespace Reuniors\Reservations\Http\Actions\V1\Location\Slots;

use Carbon\Carbon;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Http\Enums\ReservationStatus;
use Reuniors\Reservations\Models\ClientReservation;
use Reuniors\Reservations\Models\Location;
use Reuniors\Reservations\Models\LocationWorker;
use Reuniors\Reservations\Models\LocationWorkerShift;

class LocationWeekSlotsGetAction extends BaseAction
{
    public function rules()
    {
        return [
            'locationSlug' => ['string', 'required'],
            'startDate' => ['date', 'required'],
            'endDate' => ['date', 'required'],
            'workerIds' => ['array', 'nullable'], // Opciono - niz ID-jeva radnika
            'workerIds.*' => ['integer'],
            'serviceIds' => ['array', 'required'],
            'serviceIds.*' => ['integer'],
            'categoryId' => ['integer'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $location = Location::where('slug', $attributes['locationSlug'])
            ->firstOrFail();

        $startDate = Carbon::parse($attributes['startDate'])->startOfDay();
        $endDate = Carbon::parse($attributes['endDate'])->endOfDay();

        // Validacija da je nedelja (max 7 dana)
        if ($startDate->diffInDays($endDate) > 7) {
            throw new \Illuminate\Validation\ValidationException(
                validator([], []),
                ['endDate' => 'Max 7 days allowed']
            );
        }

        // Učitaj radnike - ako su prosleđeni workerIds, učitaj samo njih, inače sve aktivne
        $workerIds = $attributes['workerIds'] ?? null;
        
        $workersQuery = LocationWorker::query()
            ->whereHas('locations', function ($query) use ($location) {
                $query->where('location_id', $location->id);
            })
            ->where('active', true)
            ->with('avatar');

        // Ako je prosleđen prazan niz [] ili null, učitaj sve aktivne radnike
        // Ako je prosleđen niz sa ID-jevima, učitaj samo te radnike
        if ($workerIds !== null && is_array($workerIds) && count($workerIds) > 0) {
            // Učitaj samo prosleđene radnike
            $workersQuery->whereIn('id', $workerIds);
        }
        // Ako je $workerIds === null ili prazan niz [], učitaj sve aktivne radnike

        $workers = $workersQuery->get();

        if ($workers->isEmpty()) {
            return [
                'shifts' => [],
                'reservations' => [],
                'workers' => [],
            ];
        }

        $allShifts = [];
        $allReservations = [];
        $workersData = [];

        foreach ($workers as $worker) {
            $shifts = LocationWorkerShift::query()
                ->where('location_worker_id', $worker->id)
                ->whereBetween('date_utc', [$startDate->toDateString(), $endDate->toDateString()])
                ->whereNotNull('shift')
                ->get()
                ->map(function ($shift) use ($worker) {
                    return [
                        'dateUtc' => Carbon::parse($shift->date_utc)->format('Y-m-d'),
                        'timeFromUtc' => $shift->time_from_utc,
                        'timeToUtc' => $shift->time_to_utc,
                        'pausesUtc' => $shift->pauses_utc ?? [],
                        'locationWorkerId' => $worker->id,
                    ];
                });

            $reservations = ClientReservation::query()
                ->where('location_id', $location->id)
                ->where('location_worker_id', $worker->id)
                ->whereBetween('date_utc', [
                    $startDate->toDateTimeString(),
                    $endDate->toDateTimeString(),
                ])
                ->where('status', '!=', ReservationStatus::CANCELLED)
                ->get()
                ->map(function ($reservation) use ($worker) {
                    return [
                        'dateUtc' => $reservation->date_utc,
                        'servicesDuration' => $reservation->services_duration,
                        'locationWorkerId' => $worker->id,
                    ];
                });

            $allShifts = array_merge($allShifts, $shifts->toArray());
            $allReservations = array_merge($allReservations, $reservations->toArray());
            
            $workersData[$worker->id] = [
                'id' => $worker->id,
                'fullName' => $worker->full_name,
                'avatar' => $worker->avatar ? [
                    'id' => $worker->avatar->id,
                    'path' => $worker->avatar->path,
                ] : null,
            ];
        }

        return [
            'shifts' => $allShifts,
            'reservations' => $allReservations,
            'workers' => $workersData,
        ];
    }
}

