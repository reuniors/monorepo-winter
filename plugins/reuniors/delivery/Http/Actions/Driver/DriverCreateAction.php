<?php

namespace Reuniors\Delivery\Http\Actions\Driver;

use Reuniors\Delivery\Models\Driver;
use Reuniors\Knk\Http\Actions\BaseAction;
use Winter\User\Models\User;
use Winter\User\Models\UserGroup;

class DriverCreateAction extends BaseAction
{
    public function rules()
    {
        return [
            'first_name' => ['required', 'string'],
            'last_name' => ['required', 'string'],
            'phone_number' => ['required', 'string'],
            'working_city_id' => ['required', 'numeric'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $existingDriversCount = Driver::count();
        $username = 'driver.' . ($existingDriversCount + 1) . rand(1000, 9999);

        $newUser = new User();
        $newUser->name = $attributes['first_name'];
        $newUser->surname = $attributes['last_name'];
        $newUser->email = $username . '@kudanaklopu.com';
        $newUser->is_guest = 1;
        $newUser->username = $username;
        $newUser->is_activated = 1;
        $newUser->city_id = $attributes['working_city_id'];
        $newUser->save();

        $userGroupDelivery = UserGroup::where('code', 'delivery')->first();
        if ($userGroupDelivery) {
            $newUser->groups()->attach($userGroupDelivery);
        }

        $driver = new Driver();
        $driver->first_name = $attributes['first_name'];
        $driver->last_name = $attributes['last_name'];
        $driver->phone_number = $attributes['phone_number'];
        $driver->working_city_id = $attributes['working_city_id'];
        $driver->status = 'active';
        $driver->user_id = $newUser->id;
        $driver->is_active = true;
        $driver->save();

        return $driver;
    }
}
