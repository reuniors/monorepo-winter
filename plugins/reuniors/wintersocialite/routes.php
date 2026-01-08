<?php

use mikp\sanctum\http\middleware\UserFromBearerToken;
use reuniors\wintersocialite\Http\Actions\User\CompleteUserRegistration;
use reuniors\wintersocialite\Http\Actions\User\GetCurrentUserAction;
use reuniors\wintersocialite\Http\Actions\User\LoginOrRegisterGoogleUser;
use reuniors\wintersocialite\Http\Actions\User\LoginWithConfirmationCode;
use reuniors\wintersocialite\Http\Actions\User\PrepareUserLoginOrRegisterNewAction;
use Reuniors\WinterSocialite\Http\Middlewares\JsonMiddleware;

Route::group(
    ['prefix' => 'api/v1/', 'middleware' => [
        JsonMiddleware::class,
    ]],
    function () {
        Route::post('login/google', LoginOrRegisterGoogleUser::class);
        Route::post('user/prepare', PrepareUserLoginOrRegisterNewAction::class);
        Route::post('user/login-with-code', LoginWithConfirmationCode::class);
        Route::group(['middleware' => [
            'api',
            UserFromBearerToken::class,
        ]], function () {
            Route::get('user/current', GetCurrentUserAction::class);
            Route::post('user/register/complete', CompleteUserRegistration::class);
        });
    }
);
