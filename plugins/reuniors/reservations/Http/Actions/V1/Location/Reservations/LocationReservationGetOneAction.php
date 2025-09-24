<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\Reservations;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\ClientReservation;
use Reuniors\Reservations\Models\Location;

class LocationReservationGetOneAction extends BaseAction {
    public function rules()
    {
        return [
            'locationSlug' => ['string', 'required'],
            'reservationHash' => ['string', 'required'],
        ];
    }

    public function handle(array $attributes)
    {
        return ClientReservation
            ::getFeData([
                'locationSlug' => $attributes['locationSlug'],
                'hash' => $attributes['reservationHash'],
            ])
            ->firstOrFail();
    }

    public function asController()
    {
        $requestData = request()->all();

        return [
            'data' => $this->handle($requestData),
            'success' => true,
        ];
    }
}
