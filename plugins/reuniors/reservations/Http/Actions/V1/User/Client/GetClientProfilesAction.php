<?php

namespace Reuniors\Reservations\Http\Actions\V1\User\Client;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\reservations\Http\Enums\ReservationStatus;
use Reuniors\Reservations\Models\Client;
use Reuniors\Reservations\Models\ClientReservation;
use Reuniors\Reservations\Models\Location;

class GetClientProfilesAction extends BaseAction
{
    public function rules()
    {
        return [
            'locationSlug' => ['required', 'string'],
            'page' => ['nullable', 'integer', 'min:1'],
            'perPage' => ['nullable', 'integer', 'min:1', 'max:50'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $locationSlug = $attributes['locationSlug'];
        $page = $attributes['page'] ?? 1;
        $perPage = $attributes['perPage'] ?? 10;
        
        // Find location by slug
        $location = Location::where('slug', $locationSlug)->first();
        
        if (!$location) {
            return [
                'data' => [],
                'total' => 0,
                'current_page' => $page,
                'per_page' => $perPage,
            ];
        }

        $clientsTableName = (new Client())->getTable();
        $reservationsTableName = (new ClientReservation())->getTable();
        $confirmedStatus = ReservationStatus::CONFIRMED;

        $query = Client::query()
            ->with('user', function ($query) {
                $query->select('id', 'email');
            })
            ->select([
                "$clientsTableName.*",
                \DB::raw("(SELECT COUNT(*) FROM $reservationsTableName WHERE $reservationsTableName.client_id = $clientsTableName.id AND $reservationsTableName.location_id = {$location->id} AND $reservationsTableName.status = '$confirmedStatus') as confirmed_reservations_count")
            ])
            ->whereHas('clientReservations', function ($query) use ($location) {
                $query->where('location_id', $location->id);
            })
            ->orderByDesc('confirmed_reservations_count');

        return $query->paginate($perPage, $page);
    }
}
