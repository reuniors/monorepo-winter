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

        // Filter by user: either created_by OR client.user_id
        $reservationQuery->where(function ($query) use ($user) {
            $query->where('created_by', $user->id)
                ->orWhereHas('client', function ($q) use ($user) {
                    $q->where('user_id', $user->id);
                });
        });

        if ($dateTo) {
            if ($statusNot !== null) {
                $reservationQuery->whereDate('date_utc', '<=', $dateTo);
            } else {
                $reservationQuery->where(function ($query) use ($dateTo) {
                    $query->whereDate('date_utc', '<=', $dateTo)
                        ->orWhere('status', ReservationStatus::CANCELLED);
                });
            }
        }
        if ($dateFrom) {
            $reservationQuery->whereDate('date_utc', '>=', $dateFrom);
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
                'date_utc',
                'services_duration',
                'location_id',
                'location_worker_id',
                'status',
                'client_id',
                'created_by'
            ])
            ->orderBy('date_utc', 'desc')
            ->paginate($perPage);
    }
}
