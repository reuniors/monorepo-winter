<?php namespace Reuniors\Haljina\Http\Actions\V1\User;

use Lorisleiva\Actions\Concerns\AsAction;
use Winter\User\Models\User;
use Winter\User\Models\User as UserModel;
use Auth;
use Event;
use Request;

class RegisterAction
{
    use AsAction;

    public function rules()
    {
        return [
            'email' => ['required', 'between:2,255'],
            'nickname' => ['required', 'between:4,255'],
            'firstName' => ['required', 'between:2,255'],
            'lastName' => ['required', 'between:2,255'],
            'password' => ['required', 'between:8,255'],
        ];
    }

    public function handle($attributes = [], $deviceName = 'web')
    {
        $data = [
            'name' => $attributes['nickname'],
            'email' => $attributes['email'],
            'surname' => $attributes['lastName'],
            'is_activated' => true,
            'password' => $attributes['password'],
            'password_confirmation' => $attributes['password'],
        ];

        /*
         * Record IP address
         */
        if ($ipAddress = Request::ip()) {
            $data['created_ip_address'] = $data['last_ip_address'] = $ipAddress;
        }

        /*
         * Register user
         */
        Event::fire('winter.user.beforeRegister', [&$data]);

        /** @var UserModel $user */
        $user = Auth::register($data, true);

        return $this->responseUserToken($user, $deviceName);
    }

    protected function responseUserToken(UserModel $user, $name)
    {
        return [
            'success' => true,
            'user' => $user->only(['name', 'email', 'groups']),
            'token' => $user->createToken($name)->plainTextToken
        ];
    }

    public function asController()
    {
        $request = request();
        $deviceName = request()->get('deviceName');
        return $this->handle($request->all(), $deviceName);
    }
}
