<?php namespace reuniors\wintersocialite\Http\Actions\User;

use Auth;
use Reuniors\Base\Http\Actions\BaseAction;

class CompleteUserRegistration extends BaseAction {
    public function rules()
    {
        return [
            'name' => ['required', 'string'],
            'phone' => ['required', 'string'],
        ];
    }

    public function handle(array $data = [])
    {
        $user = Auth::user();

        $user->update([
            'name' => $data['name'],
            'phone' => $data['phone'],
            'is_activated' => true,
        ]);

        return $user;
    }
}
