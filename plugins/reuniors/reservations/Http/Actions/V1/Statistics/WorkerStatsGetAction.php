<?php

namespace Reuniors\Reservations\Http\Actions\V1\Statistics;

use Carbon\Carbon;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Http\Enums\ReservationStatus;
use Reuniors\Reservations\Models\ClientReservation;
use Reuniors\Reservations\Models\Location;
use Reuniors\Reservations\Models\WorkerStat;

class WorkerStatsGetAction extends BaseAction
{
    public function rules()
    {
        return [
            'workerId' => ['required', 'integer'],
            'locationSlug' => ['required', 'string'],
            'forceUpdate' => ['boolean'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $workerId = $attributes['workerId'];
        $locationSlug = $attributes['locationSlug'];
        $forceUpdate = $attributes['forceUpdate'] ?? false;

        $location = Location::where('slug', $locationSlug)->first();
        if (!$location) {
            throw new \Exception('Location not found');
        }

        $stat = WorkerStat::where('worker_id', $workerId)
            ->where('location_id', $location->id)
            ->first();

        $today = Carbon::today()->utc();

        if ($forceUpdate || !$stat || !$stat->updated_at || $stat->updated_at->lt($today)) {
            // Calculate statistics
            $reservations = ClientReservation::where('location_worker_id', $workerId)
                ->where('location_id', $location->id)
                ->get();

            $confirmedReservations = $reservations->where('status', ReservationStatus::CONFIRMED);
            $canceledReservations = $reservations->where('status', ReservationStatus::CANCELLED);

            $totalReservations = $reservations->count();
            $confirmedReservationsCount = $confirmedReservations->count();
            $canceledReservationsCount = $canceledReservations->count();
            $lastVisit = $confirmedReservations
                ->where('date_utc', '<', $today)
                ->max('date_utc');
            $costSum = $confirmedReservations->sum('services_cost');

            $data = [
                'total_reservations' => $totalReservations,
                'confirmed_reservations_count' => $confirmedReservationsCount,
                'canceled_reservations_count' => $canceledReservationsCount,
                'last_visit' => $lastVisit,
                'cost_sum' => $costSum,
            ];

            if (!$stat) {
                $stat = new WorkerStat([
                    'worker_id' => $workerId,
                    'location_id' => $location->id,
                ]);
            }
            $stat->total_reservations = $data['total_reservations'];
            $stat->confirmed_reservations_count = $data['confirmed_reservations_count'];
            $stat->canceled_reservations_count = $data['canceled_reservations_count'];
            $stat->last_visit = $data['last_visit'];
            $stat->cost_sum = $data['cost_sum'];
            $stat->updated_at = now();
            $stat->save();
        }

        return [
            'workerId' => $stat->worker_id,
            'locationId' => $stat->location_id,
            'data' => [
                'totalReservations' => $stat->total_reservations,
                'confirmedReservationsCount' => $stat->confirmed_reservations_count,
                'canceledReservationsCount' => $stat->canceled_reservations_count,
                'lastVisit' => $stat->last_visit,
                'costSum' => $stat->cost_sum,
            ],
            'updatedAt' => $stat->updated_at,
        ];
    }
}
