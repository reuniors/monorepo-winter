<?php

namespace Reuniors\Reservations\Http\Actions\V1\User\Client;

use Reuniors\Reservations\Http\Actions\BaseAction;
use Reuniors\reservations\Http\Enums\ReservationStatus;
use Reuniors\Reservations\Models\Client;
use Reuniors\Reservations\Models\ClientReservation;

class GetClientProfilesAction extends BaseAction
{
    public function rules()
    {
        return [
            'page' => ['nullable', 'integer', 'min:1'],
            'perPage' => ['nullable', 'integer', 'min:1', 'max:50'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $page = $attributes['page'] ?? 1;
        $perPage = $attributes['perPage'] ?? 10;
        $clientsTableName = (new Client())->getTable();
        $reservationsTableName = (new ClientReservation())->getTable();
        $confirmedStatus = ReservationStatus::CONFIRMED;

        $query = Client::query()
            ->with('user', function ($query) {
                $query->select('id', 'email');
            })
            ->select([
                "$clientsTableName.*",
                \DB::raw("(SELECT COUNT(*) FROM $reservationsTableName WHERE $reservationsTableName.client_id = $clientsTableName.id AND $reservationsTableName.status = '$confirmedStatus') as confirmed_reservations_count")
            ])
            ->orderByDesc('confirmed_reservations_count');

        return $query->paginate($perPage, $page);
    }
}
