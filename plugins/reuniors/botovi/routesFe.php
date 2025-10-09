<?php

use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use mikp\sanctum\http\middleware\UserFromBearerToken;
use Reuniors\Botovi\Http\ActionsFe\V1\Person\FePersonGetAction;
use Reuniors\Botovi\Http\ActionsFe\V1\Person\FePersonGetOneAction;
use Reuniors\Botovi\Http\ActionsFe\V1\Person\FePersonCreateAction;
use Reuniors\Botovi\Http\ActionsFe\V1\Person\FePersonUpdateAction;
use Reuniors\Botovi\Http\ActionsFe\V1\Person\FePersonLikeAction;
use Reuniors\Botovi\Http\ActionsFe\V1\Person\FePersonCommentCreateAction;
use Reuniors\Botovi\Http\ActionsFe\V1\Person\FePersonFlagCreateAction;
use Reuniors\Botovi\Http\ActionsFe\V1\Person\FePersonReportCreateAction;
use Reuniors\Botovi\Http\ActionsFe\V1\Event\FeEventGetAction;
use Reuniors\Botovi\Http\ActionsFe\V1\Event\FeEventCreateAction;
use Reuniors\Botovi\Http\ActionsFe\V1\Category\FeCategoryGetAction;
use Reuniors\Botovi\Http\ActionsFe\V1\Tag\FeTagGetAction;
use Reuniors\Botovi\Http\Middleware\JsonMiddleware;

Route::group(
    [
        'prefix' => 'api/v1/botovi/fe',
        'middleware' => [
            JsonMiddleware::class,
            EnsureFrontendRequestsAreStateful::class,
            'throttle:60,1',
            'bindings',
        ]
    ],
    function () {
        // Public frontend routes
        Route::get('people', FePersonGetAction::class);
        Route::get('people/{personId}', FePersonGetOneAction::class);
        Route::get('events', FeEventGetAction::class);
        Route::get('categories', FeCategoryGetAction::class);
        Route::get('tags', FeTagGetAction::class);

        // Authenticated frontend routes
        Route::group([
            'middleware' => [
                'api',
                UserFromBearerToken::class,
            ]
        ], function () {
            // Person routes
            Route::group(['prefix' => 'people'], function () {
                Route::post('', FePersonCreateAction::class);
                Route::put('{personId}', FePersonUpdateAction::class);
                Route::post('{personId}/like', FePersonLikeAction::class);
                Route::post('{personId}/comment', FePersonCommentCreateAction::class);
                Route::post('{personId}/flag', FePersonFlagCreateAction::class);
                Route::post('{personId}/report', FePersonReportCreateAction::class);
            });

            // Event routes
            Route::group(['prefix' => 'events'], function () {
                Route::post('', FeEventCreateAction::class);
            });
        });
    }
);
