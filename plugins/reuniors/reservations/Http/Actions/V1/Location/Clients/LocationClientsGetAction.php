<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\Clients;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Client;

class LocationClientsGetAction extends BaseAction {
    public function rules()
    {
        return [
            'locationSlug' => ['string', 'required'],
        ];
    }

    public function handle(array $attributes = [])
    {
        return Client
            ::feData([
                'locationSlug' => $attributes['locationSlug'],
            ])
            ->get();
    }
}
