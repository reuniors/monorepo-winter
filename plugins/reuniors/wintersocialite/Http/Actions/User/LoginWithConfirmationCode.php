<?php namespace reuniors\wintersocialite\Http\Actions\User;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Reservations\Classes\Device;
use Winter\User\Models\User;
use Auth;

class LoginWithConfirmationCode
{
    use AsAction;

    public function rules()
    {
        return [
            'login' => ['required', 'between:2,255'],
            'code' => ['required', 'min:4'],
            'name' => 'string'
        ];
    }

    public function handle($data)
    {
        $user = User::where('email', $data['login'])
            ->where('activation_code', $data['code'])
            ->first();
        $now = now();

        if (!$user) {
            throw new \Exception('Invalid code');
        }

        $activatedAt = $user->activated_at;
        $diff = $now->diffInMinutes($activatedAt);

        if ($diff > 5) {
            throw new \Exception('Code has expired');
        }

        return $user;
    }

    public function asController()
    {
        try {
            $requestData = request()->all();
            $user = $this->handle($requestData);
            $name = array_get($requestData, 'name', Device::getDeviceName());

            $existingAccessToken = $user->tokens()
                ->where('name', $name)
                ->first();

            if ($existingAccessToken) {
                $existingAccessToken->delete();
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        }

        return [
            'success' => true,
            'user' => $user->only(['name', 'email', 'groups', 'id']),
            'token' => $user->createToken($name)->plainTextToken
        ];
    }
}
