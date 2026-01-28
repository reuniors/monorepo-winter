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
use Reuniors\Reservations\Http\Actions\V1\Admin\Wizards\GetAllWizardsAction;
use Reuniors\Reservations\Http\Actions\V1\Admin\Wizards\GetWizardDetailsAction;
use Reuniors\Reservations\Http\Actions\V1\Admin\Wizards\CreateWizardAction;
use Reuniors\Reservations\Http\Actions\V1\Admin\Wizards\UpdateWizardAction;
use Reuniors\Reservations\Http\Actions\V1\Admin\Wizards\DeleteWizardAction;
use Reuniors\Reservations\Http\Actions\V1\Admin\Wizards\ToggleWizardActiveAction;
use Reuniors\Reservations\Http\Actions\V1\Admin\Questionnaires\GetAllQuestionnairesAction;

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
    Route::group(['prefix' => 'locations'], function () {
        Route::get('/', GetAllLocationsAction::class);
        Route::get('{id}', GetLocationDetailsAction::class);
        Route::patch('{id}/status', UpdateLocationStatusAction::class);
    });
    
    
    // ========================================
    // Users Management
    // ========================================
    Route::group(['prefix' => 'users'], function () {
        Route::get('/', GetAllUsersAction::class);
        Route::get('{id}', GetUserDetailsAction::class);
    });
    
    
    // ========================================
    // Wizards Management
    // ========================================
    Route::group(['prefix' => 'wizards'], function () {
        // Routes with parameters MUST be defined first (Laravel registers in order)
        Route::get('{id}', GetWizardDetailsAction::class);
        Route::patch('{id}', UpdateWizardAction::class);
        Route::delete('{id}', DeleteWizardAction::class);
        Route::patch('{id}/toggle-active', ToggleWizardActiveAction::class);

        // Routes without parameters
        Route::get('', GetAllWizardsAction::class);
        Route::post('', CreateWizardAction::class);
    });
    
    
    // ========================================
    // Questionnaires Management
    // ========================================
    // List all questionnaire registrations with pagination, search, and filters
    Route::get('questionnaires', GetAllQuestionnairesAction::class);
});
