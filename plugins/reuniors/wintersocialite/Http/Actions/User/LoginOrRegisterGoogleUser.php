<?php namespace reuniors\wintersocialite\Http\Actions\User;

use Event;
use Reuniors\Reservations\Classes\Device;
use Validator;
use ValidationException;
use Request;
use Auth;
use Laravel\Socialite\Facades\Socialite;
use Reuniors\Base\Http\Actions\BaseAction;
use Winter\User\Models\User as UserModel;
use Winter\User\Models\UserGroup;

class LoginOrRegisterGoogleUser extends BaseAction
{

    public function rules()
    {
        return [
            'accessToken' => ['required', 'between:2,1255'],
        ];
    }

    protected function responseUserToken(UserModel $user, $name)
    {
        return [
            'user' => $user->only(['name', 'email', 'groups', 'phone', 'id']),
            'token' => $user->createToken($name)->plainTextToken
        ];
    }

    protected function removeDuplicateTokens($user, $name)
    {
        $user->tokens()
            ->where('name', $name)
            ->delete();
    }

    public function handle(array $attributes = [])
    {
        $accessToken = $attributes['accessToken'];
        $googleUser = Socialite::driver('google')->userFromToken(
            $accessToken,
        );
        $existingUser = UserModel::where('email', $googleUser->getEmail())
            ->first();
        if ($existingUser) {
            if ($existingUser->isBanned()) {
                throw new \Exception('User is banned');
            } elseif ($existingUser->isSuspended()) {
                throw new \Exception('User is suspended');
            } elseif ($existingUser->is_activated) {
                $name = Device::getDeviceName();
                $this->removeDuplicateTokens($existingUser, $name);
                return $this->responseUserToken($existingUser, $name);
            } else {
                throw new \Exception('User is not activated');
            }
        }
        $password = $googleUser->id . time();

        $data = [
            'name' => $googleUser->user['given_name'],
            'email' => $googleUser->email,
            'surname' => $googleUser->user['family_name'],
            'is_activated' => true,
            'password' => $password,
            'password_confirmation' => $password,
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
        Event::fire('winter.user.beforeRegisterWithGoogle', [&$data]);

        /** @var UserModel $user */
        $user = Auth::register($data, true);

        $userGroupRegistered = UserGroup::where('code', 'registered')->first();
        $userGroupSocialGoogle = UserGroup::where('code', 'social-google')->first();
        if ($userGroupRegistered) {
            $user->groups()->attach($userGroupRegistered);
        }
        if ($userGroupSocialGoogle) {
            $user->groups()->attach($userGroupSocialGoogle);
        }
        $user->save();

        Event::fire('winter.user.registerWithGoogle', [$user, $data]);

        return $this->responseUserToken($user, $accessToken);
    }

}
