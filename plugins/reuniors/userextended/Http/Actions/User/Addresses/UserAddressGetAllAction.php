<?php

namespace Reuniors\UserExtended\Http\Actions\User\Addresses;

use Reuniors\Base\Http\Actions\BaseAction;
use Auth;
use Reuniors\UserExtended\Models\UserAddress;

class UserAddressGetAllAction extends BaseAction {
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
