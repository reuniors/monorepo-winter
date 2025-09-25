<?php namespace Reuniors\reservations\Http\Actions\V1\User\Client;

use Reuniors\Base\Http\Actions\BaseAction;
use Auth;
use Reuniors\Reservations\Models\Client;

class UserClientDataGetOneAction extends BaseAction {
    public function handle(array $attributes = [])
    {
        $user = Auth::getUser();

        $client = Client::where('user_id', $user->id)->first();

        return $client;
    }
}
