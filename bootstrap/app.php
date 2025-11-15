<?php

/*
|--------------------------------------------------------------------------
| Create The Application
|--------------------------------------------------------------------------
|
| The first thing we will do is create a new Laravel application instance
| which serves as the "glue" for all the components of Laravel, and is
| the IoC container for the system binding all of the various parts.
|
*/

// Always use monorepo root as base path
$app = new Winter\Storm\Foundation\Application(
    realpath(__DIR__.'/../')
);

// Override storage path if APP_STORAGE_PATH is defined (for apps/{app} structure)
// This must be done BEFORE any service providers are registered
if (defined('APP_STORAGE_PATH') && is_dir(APP_STORAGE_PATH)) {
    $storagePath = realpath(APP_STORAGE_PATH);
    $app->useStoragePath($storagePath);
    
    // Update filesystems config immediately to ensure Storage facade uses correct path
    // We need to do this before config is loaded/cached
    $app->bind('path.storage', function() use ($storagePath) {
        return $storagePath;
    });
    
    // Log for debugging (only in CLI mode)
    if (php_sapi_name() === 'cli') {
        error_log("[APP_BOOTSTRAP] Overriding storage_path() to: {$storagePath} (APP_NAME: " . (defined('APP_NAME') ? APP_NAME : 'not set') . ")");
    }
    
    // Note: We don't override public_path() globally because Winter CMS Combiner
    // uses it as root directory for assets, and assets are in root monorepo, not apps/{app}
    // Instead, we use server.php to route to apps/{app}/index.php
}

/*
|--------------------------------------------------------------------------
| Bind Important Interfaces
|--------------------------------------------------------------------------
|
| Next, we need to bind some important interfaces into the container so
| we will be able to resolve them when needed. The kernels serve the
| incoming requests to this application from both the web and CLI.
|
*/

$app->singleton(
    Illuminate\Contracts\Http\Kernel::class,
    Winter\Storm\Foundation\Http\Kernel::class
);

$app->singleton(
    Illuminate\Contracts\Console\Kernel::class,
    Winter\Storm\Foundation\Console\Kernel::class
);

$app->singleton(
    Illuminate\Contracts\Debug\ExceptionHandler::class,
    Winter\Storm\Foundation\Exception\Handler::class
);

/*
|--------------------------------------------------------------------------
| Return The Application
|--------------------------------------------------------------------------
|
| This script returns the application instance. The instance is given to
| the calling script so we can separate the building of the instances
| from the actual running of the application and sending responses.
|
*/

return $app;
