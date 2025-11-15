<?php

/**
 * Application entry point
 * 
 * This file sets up application-specific paths before including the main index.php
 */

// Include bootstrap helper that auto-detects app name
require __DIR__ . '/bootstrap-app.php';

// Include the main index.php from monorepo root
require __DIR__ . '/../../index.php';

