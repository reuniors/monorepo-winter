<?php namespace Reuniors\Delivery\Http\Actions\User;

use Exception;
use Reuniors\Base\Http\Actions\BaseAction;
use Auth;

class UserLoginAction extends BaseAction
{
    public function rules()
    {
        return [
            'email' => 'required',
            'password' => 'required'
        ];
    }

    public function handle(array $attributes = [])
    {
        $credentials = [
            'login' => $attributes['email'],
            'password' => $attributes['password']
        ];

        try {
            Auth::attempt($credentials);
        } catch (Exception $e) {
            throw new Exception('Invalid credentials');
        }

        return [
            'token' => Auth::user()->createToken('auth_token')->plainTextToken,
            'user' => Auth::user(),
            'success' => true
        ];
    }
}
