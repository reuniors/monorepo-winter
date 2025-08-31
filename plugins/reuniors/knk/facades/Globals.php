<?php namespace Reuniors\Knk\Facades;

use October\Rain\Support\Facade;

class Globals extends Facade
{
    /**
     * Get the registered name of the component.
     * @return string
     */
    protected static function getFacadeAccessor() { return 'knk.global'; }
}
