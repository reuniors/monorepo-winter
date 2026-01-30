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
use Reuniors\Reservations\Http\Actions\V1\Admin\Wizards\CreateWizardStepAction;
use Reuniors\Reservations\Http\Actions\V1\Admin\Wizards\UpdateWizardStepAction;
use Reuniors\Reservations\Http\Actions\V1\Admin\Wizards\CreateWizardFieldAction;
use Reuniors\Reservations\Http\Actions\V1\Admin\Wizards\UpdateWizardFieldAction;
use Reuniors\Reservations\Http\Actions\V1\Admin\Wizards\DeleteWizardFieldAction;
use Reuniors\Reservations\Http\Actions\V1\Admin\Wizards\ReorderWizardFieldsAction;
use Reuniors\Reservations\Http\Actions\V1\Admin\Questionnaires\GetAllQuestionnairesAction;
use Reuniors\Questionnaire\Http\Actions\V1\Admin\GetQuestionnaireDetailsAction;
use Reuniors\Questionnaire\Http\Actions\V1\Admin\ReturnWizardForEditAction;

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
        // Routes without parameters first
        Route::get('', GetAllWizardsAction::class);
        Route::post('', CreateWizardAction::class);

        // Wizard step and field routes (more specific than {id})
        Route::post('{wizardId}/steps', CreateWizardStepAction::class);
        Route::patch('steps/{stepId}', UpdateWizardStepAction::class);
        Route::post('steps/{stepId}/fields', CreateWizardFieldAction::class);
        Route::patch('steps/{stepId}/fields/reorder', ReorderWizardFieldsAction::class);
        Route::patch('fields/{fieldId}', UpdateWizardFieldAction::class);
        Route::delete('fields/{fieldId}', DeleteWizardFieldAction::class);

        // Wizard resource routes
        Route::get('{id}', GetWizardDetailsAction::class);
        Route::patch('{id}', UpdateWizardAction::class);
        Route::delete('{id}', DeleteWizardAction::class);
        Route::patch('{id}/toggle-active', ToggleWizardActiveAction::class);
    });
    
    
    // ========================================
    // Questionnaires Management
    // ========================================
    // List all questionnaire registrations with pagination, search, and filters
    Route::get('questionnaires', GetAllQuestionnairesAction::class);
    // Admin: get single questionnaire for view/preview
    Route::get('questionnaires/{registration}', GetQuestionnaireDetailsAction::class);
    // Admin: return questionnaire for edit (user can edit again)
    Route::post('questionnaires/{registration}/return-for-edit', ReturnWizardForEditAction::class);
});
