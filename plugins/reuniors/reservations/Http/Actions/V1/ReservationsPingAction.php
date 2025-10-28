<?php

namespace Reuniors\Reservations\Http\Actions\V1;

use Reuniors\Base\Http\Actions\V1\BasePingAction;
use Reuniors\Reservations\Models\ClientReservation;
use Reuniors\Reservations\Models\Location;
use Reuniors\reservations\Http\Enums\ReservationStatus;

class ReservationsPingAction extends BasePingAction
{
    public function rules()
    {
        return [
            'locationSlug' => ['required', 'string'],
        ];
    }

    protected function getCacheKeyPrefix(): string
    {
        return 'ping_reservations';
    }

    protected function generateCacheData(array $attributes): array
    {
        $locationSlug = $attributes['locationSlug'] ?? null;

        // Pronađi location po slug-u
        $location = Location::where('slug', $locationSlug)->first();

        if (!$location) {
            return $this->buildCacheData('no_location', 0);
        }

        $query = ClientReservation::where('location_id', $location->id);

        return $this->buildCacheDataFromQuery($query, function($query) {
            return $query->whereIn('status', [ReservationStatus::CONFIRMED, ReservationStatus::PENDING])->count();
        });
    }
}
