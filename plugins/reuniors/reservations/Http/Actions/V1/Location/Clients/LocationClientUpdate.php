<?php
namespace Reuniors\Reservations\Http\Actions\V1\Location\Clients;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Client;
use Auth;

class LocationClientUpdate extends BaseAction {
    public function rules()
    {
        return [
            'full_name' => ['string', 'required'],
            'phone_number' => ['string', 'required'],
            'date_of_birth' => ['string'],
        ];
    }

    public function handle(array $attributes)
    {
        $user = Auth::getUser();
        $fullName = $attributes['full_name'];
        $phoneNumber = $attributes['phone_number'];
        $dateOfBirth = $attributes['date_of_birth'] ?? null;
        $client = Client::where('user_id', $user->id)
            ->first();

        if (!$client) {
            $client = new Client();
        }
        $client->user_id = $user->id;
        $client->full_name = $fullName;
        $client->phone_number = $phoneNumber;
        if ($dateOfBirth !== null) {
            $client->date_of_birth = $dateOfBirth;
        }
        $client->save();

        return $client;
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
