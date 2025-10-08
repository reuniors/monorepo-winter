<?php

use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use mikp\sanctum\http\middleware\UserFromBearerToken;
use Reuniors\Reservations\Http\Actions\V1\Location\LocationWorkingHours\LocationWorkingHoursCreateAction;
use Reuniors\Reservations\Http\Actions\V1\Location\LocationWorkingHours\LocationWorkingHoursDeleteAction;
use Reuniors\Reservations\Http\Actions\V1\Location\LocationWorkingHours\LocationWorkingHoursGetAction as LocationWorkingHoursGetActionNew;
use Reuniors\Reservations\Http\Actions\V1\Location\LocationWorkingHours\LocationWorkingHoursUpdateAction;
use Reuniors\Reservations\Http\Actions\V1\Location\Workers\LocationWorkingHoursGetAction;
use Reuniors\Reservations\Http\Actions\V1\Location\WorkerWorkingHours\WorkerWorkingHoursCreateAction;
use Reuniors\Reservations\Http\Actions\V1\Location\WorkerWorkingHours\WorkerWorkingHoursDeleteAction;
use Reuniors\Reservations\Http\Actions\V1\Location\WorkerWorkingHours\WorkerWorkingHoursGetAction;
use Reuniors\Reservations\Http\Actions\V1\Location\WorkerWorkingHours\WorkerWorkingHoursUpdateAction;
use Reuniors\Reservations\Http\Actions\V1\News\NewsCreateAction;
use Reuniors\Reservations\Http\Actions\V1\News\NewsDeleteAction;
use Reuniors\Reservations\Http\Actions\V1\News\NewsGetAction;
use Reuniors\Reservations\Http\Actions\V1\News\NewsGetOneAction;
use Reuniors\Reservations\Http\Actions\V1\News\NewsUpdateAction;
use Reuniors\Reservations\Http\Actions\V1\Statistics\ClientStatsGetAction;
use Reuniors\Reservations\Http\Actions\V1\Statistics\LocationStatsGetAction;
use Reuniors\Reservations\Http\Actions\V1\Statistics\WorkerStatsGetAction;
use Reuniors\Reservations\Http\Actions\V1\User\Client\GetClientProfilesAction;
use Reuniors\Reservations\Http\Actions\V1\User\Client\WorkerClientDataGetOneAction;
use Reuniors\Reservations\Http\ActionsFe\FeGetActiveNewsAction;
use Reuniors\WinterSocialite\Http\Middlewares\JsonMiddleware;

Route::group(['prefix' => 'api/v1/rzr', 'middleware' => [
    'bindings',
    'userLanguage',
    JsonMiddleware::class,
    EnsureFrontendRequestsAreStateful::class
]], function () {
    Route::get('location/working-hours', LocationWorkingHoursGetAction::class);
    Route::get('client', ClientStatsGetAction::class);
    Route::get('news/active', FeGetActiveNewsAction::class);
    Route::group(['prefix' => 'statistics'], function () {
        Route::get('client', ClientStatsGetAction::class);
    });

    Route::group(['middleware' => [
        'api',
        UserFromBearerToken::class,
        'userHasGroups:owner,admin,worker',
    ]], function () {
        // statistics routes
        Route::group(['prefix' => 'statistics'], function () {
            Route::get('worker', WorkerStatsGetAction::class);
            Route::get('location', LocationStatsGetAction::class);
        });

        Route::group(['prefix' => 'worker'], function () {
            Route::get('clients', GetClientProfilesAction::class);
            Route::get('client', WorkerClientDataGetOneAction::class);
        });

        Route::group(['prefix' => 'worker-admin'], function () {
            Route::group(['prefix' => 'working-hours'], function () {
                Route::get('/', WorkerWorkingHoursGetAction::class);
                Route::post('/', WorkerWorkingHoursCreateAction::class);
                Route::put('{id}', WorkerWorkingHoursUpdateAction::class);
                Route::delete('{id}', WorkerWorkingHoursDeleteAction::class);
            });
        });

        // news routes
        Route::group(['prefix' => 'news'], function () {
            Route::get('/', NewsGetAction::class);
            Route::get('{id}', NewsGetOneAction::class);
            Route::post('/', NewsCreateAction::class);
            Route::put('{id}', NewsUpdateAction::class);
            Route::delete('{id}', NewsDeleteAction::class);
        });

        // location working hours routes
        Route::group(['prefix' => 'location-admin'], function () {
            Route::group(['prefix' => 'working-hours'], function () {
                Route::get('/', LocationWorkingHoursGetActionNew::class);
                Route::post('/', LocationWorkingHoursCreateAction::class);
                Route::put('{id}', LocationWorkingHoursUpdateAction::class);
                Route::delete('{id}', LocationWorkingHoursDeleteAction::class);
            });
        });
    });
});
