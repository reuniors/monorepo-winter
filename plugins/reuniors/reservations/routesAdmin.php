<?php

/**
 * Admin Routes for RZR Platform
 * 
 * These routes manage platform-wide RZR admin functionality:
 * - Statistics and analytics
 * - Location management (all locations)
 * - User management (all users)
 * 
 * Security:
 * - All routes require authentication (UserFromBearerToken)
 * - All routes require 'admin' group membership (AdminOnly middleware)
 */

use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use mikp\sanctum\Http\Middleware\UserFromBearerToken;
use Reuniors\WinterSocialite\Http\Middlewares\JsonMiddleware;
use Reuniors\Reservations\Http\Actions\V1\Admin\Stats\GetAdminStatsAction;
use Reuniors\Reservations\Http\Actions\V1\Admin\Locations\GetAllLocationsAction;
use Reuniors\Reservations\Http\Actions\V1\Admin\Locations\GetLocationDetailsAction;
use Reuniors\Reservations\Http\Actions\V1\Admin\Locations\UpdateLocationStatusAction;
use Reuniors\Reservations\Http\Actions\V1\Admin\Users\GetAllUsersAction;
use Reuniors\Reservations\Http\Actions\V1\Admin\Users\GetUserDetailsAction;

// ========================================
// ADMIN ROUTES (RZR Admin Panel)
// ========================================
/**
 * RZR Admin API Routes
 * 
 * Manages RZR platform-wide data (all locations, users, stats)
 * Only accessible to users with admin role
 * 
 * Base URL: /api/v1/admin
 */
Route::group([
    'prefix' => 'api/v1/admin',
    'middleware' => [
        'api',
        'bindings',
        'userLanguage',
        JsonMiddleware::class,
        EnsureFrontendRequestsAreStateful::class,
        UserFromBearerToken::class,
        'userHasGroups:admin',
    ]
], function () {
    
    // ========================================
    // Statistics
    // ========================================
    Route::get('stats', GetAdminStatsAction::class);
    
    
    // ========================================
    // Locations Management
    // ========================================
    // List all locations with pagination, search, and filters
    Route::get('locations', GetAllLocationsAction::class);
    
    // Get single location details with relations
    Route::get('locations/{id}', GetLocationDetailsAction::class);
    
    // Update location active/inactive status
    Route::patch('locations/{id}/status', UpdateLocationStatusAction::class);
    
    
    // ========================================
    // Users Management
    // ========================================
    // List all users with pagination, search, and filters
    Route::get('users', GetAllUsersAction::class);
    
    // Get single user details with groups and avatar
    Route::get('users/{id}', GetUserDetailsAction::class);
    
    
    // ========================================
    // Future Routes (Planned)
    // ========================================
    // Route::get('wizards', GetAllWizardsAction::class);
    // Route::get('questionnaires', GetAllQuestionnairesAction::class);
    // Route::get('analytics', GetPlatformAnalyticsAction::class);
});
