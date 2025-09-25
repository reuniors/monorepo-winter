<?php namespace Reuniors\UserExtended\Http\Actions\User\Addresses;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\UserExtended\Models\UserAddress;
use Auth;

class UserAddressDeleteAction extends BaseAction {
    public function rules()
    {
        return [
            'ids' => ['required', 'array'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $user = Auth::getUser();
        $ids = $attributes['ids'];
        $addresses = UserAddress::where('user_id', $user->id)
            ->whereIn('id', $ids)
            ->get();

        $addresses->each->delete();

        return true;
    }
}
