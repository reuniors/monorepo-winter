<?php

namespace Reuniors\Reservations\Http\Actions\V1\Statistics;

use Carbon\Carbon;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Client;
use Reuniors\Reservations\Models\Location;
use Reuniors\Reservations\Models\LocationWorker;
use Reuniors\Reservations\Models\WorkerStat;

class LocationStatsGetAction extends BaseAction
{
    public function rules()
    {
        return [
            'locationSlug' => ['required', 'string'],
            'forceUpdate' => ['numeric'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $locationSlug = $attributes['locationSlug'];
        $forceUpdate = $attributes['forceUpdate'] ?? false;

        $location = Location::where('slug', $locationSlug)->first();
        if (!$location) {
            throw new \Exception('Location not found');
        }

        // Get all workers who are currently working or have worked at this location
        $locationWorkers = LocationWorker::whereHas('locations', function ($query) use ($location) {
            $query->where('id', $location->id);
        })->get();

        if ($forceUpdate) {
            foreach ($locationWorkers as $locationWorker) {
                WorkerStatsGetAction::run([
                    'workerId' => $locationWorker->id,
                    'locationSlug' => $locationSlug,
                    'forceUpdate' => $forceUpdate,
                ]);
            }
        }

        $workerIds = $locationWorkers->pluck('id')->toArray();

        // Calculate statistics by summing up all worker stats for this location
        $totalReservations = 0;
        $confirmedReservationsCount = 0;
        $canceledReservationsCount = 0;
        $costSum = 0;

        // Get all worker stats for this location
        $workerStats = WorkerStat::where('location_id', $location->id)
            ->whereIn('worker_id', $workerIds)
            ->get();

        foreach ($workerStats as $workerStat) {
            $totalReservations += $workerStat->total_reservations;
            $confirmedReservationsCount += $workerStat->confirmed_reservations_count;
            $canceledReservationsCount += $workerStat->canceled_reservations_count;
            $costSum += $workerStat->cost_sum;
        }

        // Count unique workers and clients
        $totalWorkers = $locationWorkers->count();

        $totalClients = Client::whereHas('clientReservations', function ($query) use ($location) {
            $query->where('location_id', $location->id);
        })->distinct()->count();

        return [
            'locationId' => $location->id,
            'data' => [
                'totalReservations' => $totalReservations,
                'confirmedReservationsCount' => $confirmedReservationsCount,
                'canceledReservationsCount' => $canceledReservationsCount,
                'totalWorkers' => $totalWorkers,
                'totalClients' => $totalClients,
                'costSum' => $costSum,
            ],
            'updatedAt' => now(),
        ];
    }
}
