<?php namespace Reuniors\Haljina\Http\Actions\V1\User;

use Reuniors\Base\Http\Actions\BaseAction;
use Auth;
use Request;
use Exception;
use Event;
use Winter\Storm\Auth\AuthException;
use Winter\User\Models\Settings as UserSettings;
use Winter\User\Models\User;
use Illuminate\Validation\ValidationException;

class LoginAction extends BaseAction {
    public function rules()
    {
        return [
            'login' => ['required', 'between:2,255'],
            'password' => ['required', 'between:6,255'],
        ];
    }

    public function rememberLoginMode()
    {
        return UserSettings::get('remember_login', UserSettings::REMEMBER_ALWAYS);
    }

    protected function tryToAuthenticate($data): User
    {
        /*
         * Validate input
         */
        $rules = [];

        if (!array_key_exists('login', $data)) {
            $data['login'] = post('username', post('email'));
        }

        $data['login'] = trim($data['login']);

        /*
         * Authenticate user
         */
        $credentials = [
            'login'    => array_get($data, 'login'),
            'password' => array_get($data, 'password')
        ];

        /*
        * Login remember mode
        */
        switch ($this->rememberLoginMode()) {
            case UserSettings::REMEMBER_ALWAYS:
                $remember = true;
                break;
            case UserSettings::REMEMBER_NEVER:
                $remember = false;
                break;
            case UserSettings::REMEMBER_ASK:
                $remember = (bool) array_get($data, 'remember', false);
                break;
        }

        Event::fire('winter.user.beforeAuthenticate', [$this, $credentials]);

        $user = Auth::authenticate($credentials, $remember);
        if ($user->isBanned()) {
            Auth::logout();
            throw new AuthException('winter.user::lang.account.banned');
        }

        /*
         * Record IP address
         */
        if ($ipAddress = Request::ip()) {
            $user->touchIpAddress($ipAddress);
        }

        return $user;
    }

    public function handle($attributes = [], $data = null)
    {
        try {
            $user = $this->tryToAuthenticate($data);
            $name = array_get($attributes, 'name', 'web');

            $existingAccessToken = $user->tokens()
                ->where('name', $name)
                ->first();

            if ($existingAccessToken) {
                $existingAccessToken->delete();
            }
            $user->load(['groups' => function ($query) {
                $query->select('name', 'code');
            }]);
            if ($user->groups) {
                $user->groups->makeHidden('pivot');
            }
            return [
                'success' => true,
                'user' => $user->only(['name', 'email', 'groups']),
                'token' => $user->createToken($name)->plainTextToken
            ];
        } catch (Exception $ex) {
            return response()->json([
                'success' => false,
                'message' => $ex->getMessage()
            ], 403);
        }
    }

    public function asController()
    {
        $deviceName = request()->get('deviceName');

        $attributes = [];
        if ($deviceName) {
            $attributes['name'] = $deviceName;
        }

        return $this->handle($attributes, post());
    }
}
