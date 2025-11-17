<?php

define('LARAVEL_START', microtime(true));

/*
|--------------------------------------------------------------------------
| Register Core Helpers
|--------------------------------------------------------------------------
|
| We cannot rely on Composer's load order when calculating the weight of
| each package. This line ensures that the core global helpers are
| always given priority one status.
|
*/

$helperPath = __DIR__.'/../vendor/winter/storm/src/Support/helpers.php';

if (!file_exists($helperPath)) {
    echo 'Missing vendor files, try running "composer install" or use the Wizard installer.'.PHP_EOL;
    exit(1);
}

require $helperPath;

/*
|--------------------------------------------------------------------------
| Load SensitiveParameter Polyfill (for PHP < 8.2)
|--------------------------------------------------------------------------
|
| Firebase 7.21+ uses SensitiveParameter attribute (PHP 8.2+) via valinor.
| This polyfill allows it to work on PHP 8.0 and 8.1.
|
*/

if (!class_exists('SensitiveParameter', false)) {
    if (PHP_VERSION_ID >= 80000 && class_exists('Attribute', false)) {
        // PHP 8.0+ with Attribute support
        #[Attribute(Attribute::TARGET_PARAMETER)]
        final class SensitiveParameter
        {
        }
    } else {
        // PHP < 8.0 or if Attribute class doesn't exist
        // Define without attribute (won't work perfectly but prevents fatal error)
        final class SensitiveParameter
        {
        }
    }
}

/*
|--------------------------------------------------------------------------
| Register The Composer Auto Loader
|--------------------------------------------------------------------------
|
| Composer provides a convenient, automatically generated class loader
| for our application. We just need to utilize it! We'll require it
| into the script here so that we do not have to worry about the
| loading of any our classes "manually". Feels great to relax.
|
*/

require __DIR__.'/../vendor/autoload.php';
