<?php

/**
 * Application entry point for rzr
 * 
 * This file sets up application-specific paths before including the main index.php
 */

// Set application-specific storage path (don't change base_path!)
define('APP_STORAGE_PATH', __DIR__ . '/storage');

// Set application name
define('APP_NAME', 'rzr');
// Also set in environment for server.php to detect
putenv('APP_NAME=rzr');
$_ENV['APP_NAME'] = 'rzr';
$_SERVER['APP_NAME'] = 'rzr';

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

// Include the main index.php from monorepo root
require __DIR__ . '/../../index.php';
