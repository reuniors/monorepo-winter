<?php

use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use mikp\sanctum\http\middleware\UserFromBearerToken;
use Reuniors\UserExtended\Http\Actions\User\Addresses\UserAddressCreateNewAction;
use Reuniors\UserExtended\Http\Actions\User\Addresses\UserAddressDeleteAction;
use Reuniors\UserExtended\Http\Actions\User\Addresses\UserAddressGetAllAction;
use Reuniors\WinterSocialite\Http\Middlewares\JsonMiddleware;

Route::group(
    ['prefix' => 'api/v1/user', 'middleware' => [
        JsonMiddleware::class,
        EnsureFrontendRequestsAreStateful::class,
        'throttle:60,1',
        'bindings',
    ]],
    function () {
        Route::group(['middleware' => [
            'api',
            UserFromBearerToken::class,
        ]], function () {
            Route::group(['prefix' => 'addresses'], function () {
                Route::post('', UserAddressCreateNewAction::class);
                Route::get('', UserAddressGetAllAction::class);
                Route::delete('', UserAddressDeleteAction::class);
            });
        });
    }
);
