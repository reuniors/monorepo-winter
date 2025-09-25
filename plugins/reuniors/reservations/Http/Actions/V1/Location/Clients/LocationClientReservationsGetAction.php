<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\Clients;

use Auth;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\reservations\Http\Enums\ReservationStatus;
use Reuniors\Reservations\Models\Location;

class LocationClientReservationsGetAction extends BaseAction {
    public function rules()
    {
        return [
            'locationSlug' => ['string', 'required'],
            'perPage' => ['integer'],
            'withClient' => 'boolean',
            'archive' => 'boolean',
        ];
    }

    public function handle(array $attributes = [])
    {
        $locationSlug = $attributes['locationSlug'];
        $archive = $attributes['archive'] ?? false;
        $location = Location::where('slug', $locationSlug)
            ->first();
        $perPage = $attributes['perPage'] ?? 10000;
        $withClient = $attributes['withClient'] ?? true;
        $dateFrom = $archive ? null : now()->toDateString();
        $dateTo = $archive ? now()->toDateString() : null;
        $statusNot = $archive ? null : ReservationStatus::CANCELLED;
        $user = Auth::getUser();

        $reservationQuery = $location->reservations();

        if ($dateTo) {
            if ($statusNot !== null) {
                $reservationQuery->whereDate('date', '<=', $dateTo);
            } else {
                $reservationQuery->where(function ($query) use ($dateTo) {
                    $query->where('date', '<=', $dateTo)
                        ->orWhere('status', ReservationStatus::CANCELLED);
                });
            }
            $reservationQuery->whereDate('date', '<=', $dateTo);
        }
        if ($dateFrom) {
            $reservationQuery->where('date', '>=', $dateFrom);
        }
        if ($withClient) {
            $reservationQuery->with('client');
        }
        if ($statusNot) {
            $reservationQuery->where('status', '!=', $statusNot);
        }

        return $reservationQuery
            ->select([
                'id',
                'hash',
                'date',
                'services_duration',
                'location_id',
                'location_worker_id',
                'status',
                'client_id',
                'created_by'
            ])
            ->where('created_by', $user->id)
            ->orderBy('date', 'desc')
            ->paginate($perPage);
    }
}
