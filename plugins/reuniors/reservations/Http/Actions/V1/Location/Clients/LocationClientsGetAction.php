<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\Clients;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Reservations\Models\Client;

class LocationClientsGetAction
{
    use asAction;

    public function rules()
    {
        return [
            'locationSlug' => ['string', 'required'],
        ];
    }

    public function handle(array $attributes)
    {
        return Client
            ::feData([
                'locationSlug' => $attributes['locationSlug'],
            ])
            ->get();
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
