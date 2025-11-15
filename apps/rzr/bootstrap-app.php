<?php

/**
 * Bootstrap helper for app-specific configuration
 * 
 * This file automatically detects the app name from the directory structure
 * and sets up all necessary constants and environment variables
 */

// Automatically detect app name from directory structure
// This file is in apps/{app}/bootstrap-app.php, so __DIR__ is apps/{app}
// We need to get the current directory name (apps/{app})
$appName = basename(__DIR__);

// Set application-specific storage path (don't change base_path!)
// __DIR__ is apps/{app}, so storage is apps/{app}/storage
define('APP_STORAGE_PATH', __DIR__ . '/storage');

// Set application name
define('APP_NAME', $appName);
// Also set in environment for server.php to detect
putenv('APP_NAME=' . $appName);
$_ENV['APP_NAME'] = $appName;
$_SERVER['APP_NAME'] = $appName;

// Create a marker file in root monorepo so server.php can detect which app is running
// This must be done before ServeCommand starts the server
$rootPath = dirname(__DIR__, 2); // Go up from apps/{app} to monorepo root
$markerFile = $rootPath . '/.app-name';
file_put_contents($markerFile, $appName);

// Load Composer autoloader first (only if not already loaded)
if (!defined('LARAVEL_START')) {
    require __DIR__ . '/../../bootstrap/autoload.php';
}

// Manually load .env from this application folder
// This must be done before the main bootstrap
if (file_exists(__DIR__ . '/.env')) {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->safeLoad(); // safeLoad won't throw if variables are already defined
}

