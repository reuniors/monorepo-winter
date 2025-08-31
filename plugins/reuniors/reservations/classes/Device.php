<?php namespace Reuniors\Reservations\Classes;

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

    public static function is($device): bool
    {
        return self::getAgent()->is($device);
    }

    public static function getDeviceName(): string
    {
        return self::getAgent()->device();
//        if (self::isDesktop()) {
//            if (self::is('Chrome')) {
//                return 'Desktop-Chrome';
//            }
//            if (self::is('Safari')) {
//                return 'Desktop-Safari';
//            }
//            if (self::is('Firefox')) {
//                return 'Desktop-Firefox';
//            }
//            return 'Desktop';
//        }
//        if (self::isTablet()) {
//            if (self::is('iOS')) {
//                return 'Tablet-iOS';
//            }
//            if (self::is('Android')) {
//                return 'Tablet-Android';
//            }
//            return 'Tablet';
//        }
//        if (self::isMobile()) {
//            if (self::is('iOS')) {
//                return 'iPhone';
//            }
//            if (self::is('Android')) {
//                return 'Android';
//            }
//            return 'Mobile';
//        }
//        return 'Unknown';
    }
}
