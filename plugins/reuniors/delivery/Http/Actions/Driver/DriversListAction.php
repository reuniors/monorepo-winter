<?php

namespace Reuniors\Delivery\Http\Actions\Driver;

use Reuniors\Delivery\Models\Driver;
use Reuniors\Base\Http\Actions\BaseAction;

class DriversListAction extends BaseAction
{
    public function handle(array $attributes = [])
    {
        $drivers = Driver::with('user')
            ->get();

        return $drivers;
    }
}
