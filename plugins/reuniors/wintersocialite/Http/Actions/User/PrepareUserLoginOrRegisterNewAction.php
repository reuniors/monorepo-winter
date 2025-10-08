<?php namespace reuniors\wintersocialite\Http\Actions\User;

use Auth;
use Event;
use Exception;
use Reuniors\Base\Http\Actions\BaseAction;
use Request;
use reuniors\wintersocialite\Http\Actions\User\Mail\SendUserAuthorizationMail;
use Winter\User\Models\Settings as UserSettings;
use Winter\User\Models\User;

class PrepareUserLoginOrRegisterNewAction extends BaseAction {
    public function rules()
    {
        return [
            'login' => ['required', 'between:2,255'],
        ];
    }

    public function rememberLoginMode()
    {
        return UserSettings::get('remember_login', UserSettings::REMEMBER_ALWAYS);
    }

    protected function createActivationCode($data): User
    {

        if (!array_key_exists('login', $data)) {
            $data['login'] = post('username', post('email'));
        }

        $data['login'] = trim($data['login']);

        $existingUser = User::where('email', $data['login'])
            ->first();

        if ($existingUser) {
            if ($existingUser->isBanned()) {
                throw new \Exception('User is banned');
            } elseif ($existingUser->isSuspended()) {
                throw new \Exception('User is suspended');
            } else {
                $existingUser->activation_code = rand(1000, 9999);
                $existingUser->save();

                return $existingUser;
            }
        }


        $password = time();

        $data = [
            'name' => null,
            'email' => $data['login'],
            'surname' => null,
            'is_activated' => false,
            'password' => $password,
            'password_confirmation' => $password,
        ];

        $user = Auth::register($data, true);

        /*
         * Record IP address
         */
        if ($ipAddress = Request::ip()) {
            $user->touchIpAddress($ipAddress);
        }
        $user->activation_code = rand(1000, 9999);
        $user->save();

        return $user;
    }

    public function handle($data = null): User|Exception
    {
        $user = $this->createActivationCode($data);

        SendUserAuthorizationMail::run([], $user);

        $user->activated_at = now();
        $user->save();

        return $user;
    }
}
