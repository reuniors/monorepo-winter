<?php

/**
 * Wizard Routes
 * 
 * API routes for dynamic wizard system
 * Manages wizard definitions, steps, and user progress
 * 
 * Base URL: /api/v1/wizard
 */

use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use mikp\sanctum\Http\Middleware\UserFromBearerToken;
use Reuniors\WinterSocialite\Http\Middlewares\JsonMiddleware;
use Reuniors\Questionnaire\Http\Actions\V1\Wizard\GetWizardDefinitionAction;
use Reuniors\Questionnaire\Http\Actions\V1\Wizard\StartWizardAction;
use Reuniors\Questionnaire\Http\Actions\V1\Wizard\SaveWizardStepAction;
use Reuniors\Questionnaire\Http\Actions\V1\Wizard\CompleteWizardAction;
use Reuniors\Questionnaire\Http\Actions\V1\Wizard\GetWizardProgressAction;
use Reuniors\Questionnaire\Http\Actions\V1\Wizard\SkipWizardStepAction;

// ========================================
// WIZARD ROUTES
// ========================================
/**
 * Wizard API Routes
 * 
 * Handles dynamic wizard system for multi-step forms
 * Can be accessed by authenticated or unauthenticated users (depending on wizard config)
 */
Route::group([
    'prefix' => 'api/v1/wizard',
    'middleware' => [
        'api',
        'bindings',
        'userLanguage',
        JsonMiddleware::class,
        EnsureFrontendRequestsAreStateful::class,
    ]
], function () {
    
    // Public routes - Get wizard definition (no auth required initially)
    Route::get('{slug}', GetWizardDefinitionAction::class);
    
    // Wizard session routes (may require auth depending on wizard config)
    Route::group([
        'middleware' => [
            // UserFromBearerToken is optional - checked in action based on wizard config
        ]
    ], function () {
        
        // Start new wizard session
        Route::post('start', StartWizardAction::class);
        
        // Get progress (resume wizard)
        Route::get('progress/{registration_id}', GetWizardProgressAction::class);
        Route::post('progress', GetWizardProgressAction::class);
        
        // Save step data
        Route::post('step/save', SaveWizardStepAction::class);
        
        // Skip optional step
        Route::post('step/skip', SkipWizardStepAction::class);
        
        // Complete wizard
        Route::post('complete', CompleteWizardAction::class);
    });
});
