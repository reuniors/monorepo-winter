<?php
namespace Reuniors\Knk\Http\Actions\V1\User;

use Illuminate\Validation\ValidationException;
use Reuniors\Base\Http\Actions\BaseAction;
use Winter\Storm\Auth\AuthException;
use Winter\User\Models\Settings as UserSettings;
use Winter\User\Models\User;
use Auth;
use Event;
use Exception;
use Request;

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
            'login' => array_get($data, 'login'),
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

    public function handle($attributes = [])
    {
        $deviceName = $attributes['deviceName'] ?? null;
        if ($deviceName) {
            $attributes['name'] = $deviceName;
        }
        
        try {
            $user = $this->tryToAuthenticate($attributes);
            $name = array_get($attributes, 'name', 'web');

            $existingAccessToken = $user
                ->tokens()
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
                'user' => $user->only(['id', 'name', 'email', 'groups']),
                'token' => $user->createToken($name)->plainTextToken
            ];
        } catch (Exception $ex) {
            return response()->json([
                'success' => false,
                'message' => $ex->getMessage()
            ], 403);
        }
    }
}
