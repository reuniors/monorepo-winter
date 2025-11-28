<?php

use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use mikp\sanctum\Http\Middleware\UserFromBearerToken;
use Reuniors\WinterSocialite\Http\Middlewares\JsonMiddleware;
use Reuniors\Calendar\Http\Actions\V1\CalendarConnectAction;
use Reuniors\Calendar\Http\Actions\V1\CalendarCallbackAction;
use Reuniors\Calendar\Http\Actions\V1\CalendarWebhookAction;
use Reuniors\Calendar\Http\Actions\V1\CalendarConnectionGetAction;
use Reuniors\Calendar\Http\Actions\V1\CalendarConnectionUpdateAction;
use Reuniors\Calendar\Http\Actions\V1\CalendarConnectionDeleteAction;

Route::group(
    ['prefix' => 'api/v1/rzr', 'middleware' => [
        'bindings',
        'userLanguage',
        JsonMiddleware::class,
        EnsureFrontendRequestsAreStateful::class
    ]],
    function () {
        // Calendar routes
        Route::group([
            'prefix' => 'calendar',
        ], function () {
            // Public webhook endpoint (no auth required)
            Route::post('webhook', CalendarWebhookAction::class);
            
            // OAuth flow (no auth required for initial connect)
            Route::get('connect', CalendarConnectAction::class);
            Route::get('callback', CalendarCallbackAction::class);
            
            // Connection management (requires auth)
            Route::group(['middleware' => [
                'api',
                UserFromBearerToken::class,
            ]], function () {
                Route::get('connection', CalendarConnectionGetAction::class);
                Route::put('connection', CalendarConnectionUpdateAction::class);
                Route::delete('connection', CalendarConnectionDeleteAction::class);
            });
        });
    }
);

