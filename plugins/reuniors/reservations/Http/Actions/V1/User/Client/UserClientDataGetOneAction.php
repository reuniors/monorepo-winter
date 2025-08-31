<?php namespace Reuniors\reservations\Http\Actions\V1\User\Client;

use Lorisleiva\Actions\Concerns\AsAction;
use Auth;
use Reuniors\Reservations\Models\Client;

class UserClientDataGetOneAction
{
    use asAction;

    public function handle(array $attributes)
    {
        $user = Auth::getUser();

        $client = Client::where('user_id', $user->id)->first();

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
