<?php

namespace Reuniors\UserExtended\Http\Actions\User\Addresses;

use Lorisleiva\Actions\Concerns\AsAction;
use Auth;
use Reuniors\UserExtended\Models\UserAddress;

class UserAddressGetAllAction
{
    use AsAction;

    public function handle()
    {
        $user = Auth::getUser();

        return UserAddress::where('user_id', $user->id)->get();
    }

    public function asController()
    {
        return [
            'success' => true,
            'data' => $this->handle(),
        ];
    }
}
