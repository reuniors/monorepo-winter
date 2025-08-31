<?php


use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use Reuniors\Evodic\Http\Actions\V1\Language\ChangeLanguageAction;
use Reuniors\Evodic\Http\Actions\V1\Language\GetLanguagesAction;
use Reuniors\Evodic\Http\ActionsOnFe\V1\Location\GetLocationDataAction;
use Reuniors\Evodic\Http\ActionsOnFe\V1\Location\GetLocationPlacesAction;
use Reuniors\Evodic\Http\ActionsOnFe\V1\Location\GetLocationPlaceTypesAction;
use Reuniors\Evodic\Http\ActionsOnFe\V1\Location\GetOnePlaceDataAction;
use Reuniors\WinterSocialite\Http\Middlewares\JsonMiddleware;

Route::group(
    ['prefix' => 'api/v1', 'middleware' => [
//        \Barryvdh\Cors\HandleCors::class,
        'bindings',
        'userLanguage',
        JsonMiddleware::class,
        EnsureFrontendRequestsAreStateful::class
    ]],
    function () {
        Route::get('languages', GetLanguagesAction::class);
        Route::get('languages/set', ChangeLanguageAction::class);

        Route::group(
            ['prefix' => 'fe/location'],
            function () {
                Route::get('', GetLocationDataAction::class);
                Route::get('places', GetLocationPlacesAction::class);
                Route::get('place-types', GetLocationPlaceTypesAction::class);
        });

        Route::group(
            ['prefix' => 'fe/place'],
            function () {
                Route::get('', GetOnePlaceDataAction::class);
            });
    }
);
