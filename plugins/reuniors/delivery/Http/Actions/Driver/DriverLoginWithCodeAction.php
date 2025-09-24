<?php

namespace Reuniors\Delivery\Http\Actions\Driver;

use Carbon\Carbon;
use Exception;
use Reuniors\Delivery\Models\Driver;
use Reuniors\Base\Http\Actions\BaseAction;
use reuniors\wintersocialite\Http\Actions\User\UserRemoveExistingTokenAction;

class DriverLoginWithCodeAction extends BaseAction
{
    public function rules()
    {
        return [
            'code' => ['required', 'string'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $code = strrev($attributes['code']);
        $currentTimestamp = now()->timestamp;
        $timestamp = substr($currentTimestamp, 0, strlen($currentTimestamp) - strlen($code)) . $code;
        $dateFormatted = Carbon::createFromTimestamp($timestamp);

        $driver = Driver::where('login_date_code', $dateFormatted)
            ->with('user')
            ->first();

        if (!$driver || !$driver->user) {
            throw new Exception('Invalid code');
        }

        UserRemoveExistingTokenAction::run(['user' => $driver->user, 'name' => 'code']);

        if ($driver->user->is_guest) {
            $driver->user->is_guest = 0;
            $driver->user->save();
        }

        return [
            'user' => $driver->user,
            'token' => $driver->user->createToken('code')->plainTextToken,
            'success' => true,
        ];
    }
}
