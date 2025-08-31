<?php

namespace Reuniors\Reservations\Http\Actions\V1\Statistics;

use Carbon\Carbon;
use Reuniors\Reservations\Http\Actions\BaseAction;
use Reuniors\reservations\Http\Enums\ReservationStatus;
use Reuniors\Reservations\Models\ClientReservation;
use Reuniors\Reservations\Models\ClientStat;
use Reuniors\Reservations\Models\Location;

class ClientStatsGetAction extends BaseAction
{
    public function rules()
    {
        return [
            'clientId' => ['required', 'integer'],
            'locationSlug' => ['required', 'string'],
            'forceUpdate' => ['integer'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $clientId = $attributes['clientId'];
        $locationSlug = $attributes['locationSlug'];
        $forceUpdate = $attributes['forceUpdate'] ?? false;

        $location = Location::where('slug', $locationSlug)->first();
        if (!$location) {
            throw new \Exception('Location not found');
        }

        $stat = ClientStat::where('client_id', $clientId)
            ->where('location_id', $location->id)
            ->first();

        $today = Carbon::today();

        if ($forceUpdate || !$stat || !$stat->updated_at || $stat->updated_at->lt($today)) {
            // Calculate statistics
            $reservations = ClientReservation::where('client_id', $clientId)
                ->where('location_id', $location->id)
                ->get();

            $confirmedReservations = $reservations->where('status', ReservationStatus::CONFIRMED);

            $totalReservations = $reservations->count();
            $confirmedReservationsCount = $confirmedReservations->count();
            $canceledReservationsCount = $reservations->where('status', ReservationStatus::CANCELLED)->count();
            $lastVisit = $confirmedReservations->where('date', '<', $today)->max('date');
            $costSum = $confirmedReservations->sum('services_cost');

            $data = [
                'total_reservations' => $totalReservations,
                'confirmed_reservations_count' => $confirmedReservationsCount,
                'canceled_reservations_count' => $canceledReservationsCount,
                'last_visit' => $lastVisit,
                'cost_sum' => $costSum,
            ];

            if (!$stat) {
                $stat = new ClientStat([
                    'client_id' => $clientId,
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
            'clientId' => $stat->client_id,
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
