<?php namespace Reuniors\Knk\Classes;

use Jenssegers\Agent\Agent;

class Device
{
    protected static $agent;

    public static function getAgent(): Agent
    {
        if (self::$agent === null) {
            self::$agent = new Agent();
        }
        return self::$agent;
    }

    public static function isMobile(): bool
    {
        return self::getAgent()->isMobile();
    }

    public static function isDesktop(): bool
    {
        return self::getAgent()->isDesktop();
    }

    public static function isTablet(): bool
    {
        return self::getAgent()->isTablet();
    }

    public static function isRobot(): bool
    {
        return self::getAgent()->isRobot();
    }

    public static function getDeviceName(): string
    {
        return self::getAgent()->device();
    }
}
