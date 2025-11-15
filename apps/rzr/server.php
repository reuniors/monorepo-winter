<?php

/**
 * Custom server.php for rzr application
 * 
 * This file ensures that the PHP built-in server uses apps/rzr/index.php
 * while maintaining root monorepo as the working directory for asset resolution
 * 
 * Note: ServeCommand uses public_path() as working directory, but we need root
 * monorepo for assets. This server.php uses root as base but routes to apps/rzr/index.php
 */

// Use root monorepo as base path (for modules, plugins, themes, etc.)
// This is what getcwd() returns when ServeCommand runs with public_path() = root
$rootPath = dirname(__DIR__, 2); // Go up from apps/rzr to monorepo root

// App-specific index.php path
$appIndexPath = __DIR__ . '/index.php';

$uri = urldecode(
    parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? ''
);

// This file allows us to emulate Apache's "mod_rewrite" functionality from the
// built-in PHP web server. This provides a convenient way to test a Laravel
// application without having installed a "real" web server software here.
// Check if file exists in root path (for static assets like modules/backend/assets/)
if ($uri !== '/' && file_exists($rootPath.$uri)) {
    return false;
}

// Use app-specific index.php for routing
require_once $appIndexPath;

