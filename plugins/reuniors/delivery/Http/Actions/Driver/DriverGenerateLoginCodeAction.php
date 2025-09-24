<?php namespace Reuniors\Delivery\Http\Actions\Driver;

use Reuniors\Delivery\Models\Driver;
use Reuniors\Base\Http\Actions\BaseAction;

class DriverGenerateLoginCodeAction extends BaseAction
{
    public function handle(array $attributes = [], Driver $driver = null)
    {
        $driver->login_date_code = now()->addMinutes(rand(5, 10));
        $driver->save();
        $loginDateCodeTimestamp = (string)$driver->login_date_code->timestamp;

        return substr(strrev($loginDateCodeTimestamp), 0, 6);
    }

    public function asController(Driver $driver = null): array
    {
        return parent::asController($driver);
    }
}
