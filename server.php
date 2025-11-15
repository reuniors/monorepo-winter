<?php

/**
 * Custom server.php for monorepo applications
 * 
 * This file routes to app-specific index.php by reading a marker file
 * created by apps/{app}/artisan when serve command is run
 */

$publicPath = getcwd();

$uri = urldecode(
    parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? ''
);

// Check for marker file created by apps/{app}/artisan
$markerFile = $publicPath . '/.app-name';
$appName = null;

if (file_exists($markerFile)) {
    $appName = trim(file_get_contents($markerFile));
}

// This file allows us to emulate Apache's "mod_rewrite" functionality from the
// built-in PHP web server. This provides a convenient way to test a Laravel
// application without having installed a "real" web server software here.
// Check if file exists in root path or app-specific path
if ($uri !== '/') {
    // First check root path
    $filePath = $publicPath.$uri;
    if (file_exists($filePath) && is_file($filePath)) {
        return false; // Let PHP server serve it directly
    }
    
    // If app is detected, also check app-specific app/ directory
    if ($appName && !empty($appName)) {
        $appPath = $publicPath . '/apps/' . $appName;
        $appFilePath = $appPath.$uri;
        if (file_exists($appFilePath) && is_file($appFilePath)) {
            // Serve the file directly with correct MIME type
            // Determine MIME type based on extension (more reliable than mime_content_type)
            $ext = strtolower(pathinfo($appFilePath, PATHINFO_EXTENSION));
            $mimeTypes = [
                'css' => 'text/css',
                'js' => 'application/javascript',
                'mjs' => 'application/javascript',
                'json' => 'application/json',
                'png' => 'image/png',
                'jpg' => 'image/jpeg',
                'jpeg' => 'image/jpeg',
                'gif' => 'image/gif',
                'svg' => 'image/svg+xml',
                'webp' => 'image/webp',
                'woff' => 'font/woff',
                'woff2' => 'font/woff2',
                'ttf' => 'font/ttf',
                'otf' => 'font/otf',
                'eot' => 'application/vnd.ms-fontobject',
                'ico' => 'image/x-icon',
                'html' => 'text/html',
                'htm' => 'text/html',
                'xml' => 'application/xml',
                'txt' => 'text/plain',
            ];
            
            $mimeType = $mimeTypes[$ext] ?? 'application/octet-stream';
            
            header('Content-Type: ' . $mimeType);
            header('Content-Length: ' . filesize($appFilePath));
            
            // Add cache headers for static assets
            if (in_array($ext, ['css', 'js', 'mjs', 'png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'woff', 'woff2', 'ttf', 'otf', 'eot', 'ico'])) {
                header('Cache-Control: public, max-age=31536000'); // 1 year
            }
            
            readfile($appFilePath);
            return true;
        }
    }
}

// If APP_NAME is set, use app-specific index.php
if ($appName && !empty($appName)) {
    $appIndexPath = $publicPath . '/apps/' . $appName . '/index.php';
    if (file_exists($appIndexPath)) {
        require_once $appIndexPath;
        return;
    }
}

// Fallback to root index.php
require_once $publicPath.'/index.php';

