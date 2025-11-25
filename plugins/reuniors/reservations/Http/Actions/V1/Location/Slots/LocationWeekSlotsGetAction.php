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
            'workerId' => ['integer', 'required'],
            'serviceIds' => ['array', 'required'],
            'serviceIds.*' => ['integer'],
            'categoryId' => ['integer'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $location = Location::where('slug', $attributes['locationSlug'])
            ->firstOrFail();

        /** @var LocationWorker $worker */
        $worker = LocationWorker::query()
            ->where('id', $attributes['workerId'])
            ->whereHas('locations', function ($query) use ($location) {
                $query->where('location_id', $location->id);
            })
            ->with('avatar')
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

        // Učitaj shifts za nedelju (za generisanje slotova na FE)
        $shifts = LocationWorkerShift::query()
            ->where('location_worker_id', $worker->id)
            ->whereBetween('date_utc', [$startDate->toDateString(), $endDate->toDateString()])
            ->whereNotNull('shift')
            ->get()
            ->map(function ($shift) {
                return [
                    'dateUtc' => Carbon::parse($shift->date_utc)->format('Y-m-d'),
                    'timeFromUtc' => $shift->time_from_utc,
                    'timeToUtc' => $shift->time_to_utc,
                    'pausesUtc' => $shift->pauses_utc ?? [],
                ];
            });

        // Učitaj rezervacije za nedelju
        $reservations = ClientReservation::query()
            ->where('location_id', $location->id)
            ->where('location_worker_id', $worker->id)
            ->whereBetween('date_utc', [
                $startDate->toDateTimeString(),
                $endDate->toDateTimeString(),
            ])
            ->where('status', '!=', ReservationStatus::CANCELLED)
            ->get()
            ->map(function ($reservation) {
                return [
                    'dateUtc' => $reservation->date_utc,
                    'servicesDuration' => $reservation->services_duration,
                ];
            });

        return [
            'shifts' => $shifts->values()->all(),
            'reservations' => $reservations->values()->all(),
            'worker' => [
                'id' => $worker->id,
                'fullName' => $worker->full_name,
                'avatar' => $worker->avatar ? [
                    'id' => $worker->avatar->id,
                    'path' => $worker->avatar->path,
                ] : null,
            ],
        ];
    }
}

