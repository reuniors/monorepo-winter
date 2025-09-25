<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\Reservations;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;

class LocationReservationsGetAction extends BaseAction {
    public function rules()
    {
        return [
            'locationSlug' => ['string', 'required'],
            'locationWorkerId' => ['integer'],
            'date' => ['date'],
            'perPage' => ['integer'],
            'withClient' => 'boolean',
        ];
    }

    public function handle(array $attributes = [])
    {
        $location = Location::where('slug', $attributes['locationSlug'])
            ->firstOrFail();
        $locationWorkerId = $attributes['locationWorkerId'] ?? null;
        $date = $attributes['date'] ?? null;
        $perPage = $attributes['perPage'] ?? 10000;
        $withClient = $attributes['withClient'] ?? true;
        $dateFrom = $date ? null : now()->toDateString();


        $reservationQuery = $location->reservations();

        if ($locationWorkerId) {
            $reservationQuery->where('location_worker_id', $locationWorkerId);
        }
        if ($date) {
            $reservationQuery->whereDate('date', $date);
        } elseif ($dateFrom) {
            $reservationQuery->where('date', '>=', $dateFrom);
        }
        if ($withClient) {
            $reservationQuery->with('client');
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
                'discount',
            ])
            ->where('status', '!=', 3)
            ->paginate($perPage);
    }
}
