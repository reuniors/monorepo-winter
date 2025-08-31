<?php

use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use mikp\sanctum\http\middleware\UserFromBearerToken;
use Reuniors\Delivery\Http\Actions\Driver\DriverCreateAction;
use Reuniors\Delivery\Http\Actions\Driver\DriverGenerateLoginCodeAction;
use Reuniors\Delivery\Http\Actions\Driver\DriverLoginWithCodeAction;
use Reuniors\Delivery\Http\Actions\Driver\DriversListAction;
use Reuniors\Delivery\Http\Actions\Order\Draft\OrderEditDraftItemAction;
use Reuniors\Delivery\Http\Actions\Order\Draft\OrderFindDraftAction;
use Reuniors\Delivery\Http\Actions\Order\Draft\OrderRemoveDraftAction;
use Reuniors\Delivery\Http\Actions\User\UserLoginAction;
use Reuniors\WinterSocialite\Http\Middlewares\JsonMiddleware;

Route::group(
    ['prefix' => 'api/v1/delivery', 'middleware' => [
        JsonMiddleware::class,
        EnsureFrontendRequestsAreStateful::class,
        'throttle:60,1',
        'bindings',
    ]],
    function () {
        Route::group(['prefix' => 'user'], function () {
            Route::post('login', UserLoginAction::class);
        });

        Route::group(['prefix' => 'driver'], function () {
            Route::post('login', DriverLoginWithCodeAction::class);
        });

        // Authenticated routes
        Route::group(['middleware' => [
            'api',
            UserFromBearerToken::class,
        ]], function () {
            Route::group(['middleware' => ['userHasGroups:admin,dispatcher']], function () {
                Route::group(['prefix' => 'driver'], function () {
                    Route::post('', DriverCreateAction::class);
                    Route::get('', DriversListAction::class);
                    Route::group(['prefix' => '{driver}'], function () {
                        Route::get('login-code', DriverGenerateLoginCodeAction::class);
                    });
                });
            });
            Route::group(['prefix' => 'order'], function () {
                Route::group(['prefix' => 'draft'], function () {
                    Route::post('item', OrderEditDraftItemAction::class);
                    Route::get('', OrderFindDraftAction::class);
                    Route::delete('', OrderRemoveDraftAction::class);
                });
            });
        });
        // End of authenticated routes
    }
);
