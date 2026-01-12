<?php

require_once 'routesActions.php';

use Illuminate\Support\Facades\Route;
use Reuniors\WinterSocialite\Http\Middlewares\JsonMiddleware;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

/*
|--------------------------------------------------------------------------
| Base Plugin Routes
|--------------------------------------------------------------------------
|
| Here are the API routes for the base plugin shared functionality.
| These routes provide access to countries, cities, tags, translations, etc.
|
*/

Route::group(['prefix' => 'api/v1', 'middleware' => [
        JsonMiddleware::class,
        EnsureFrontendRequestsAreStateful::class,
        // 'throttle:60,1',
        'bindings',
    ]], function () {
    

    // Endpoints that work with or without user (optional auth)
    Route::group(['middleware' => [
        'api',
        'userFromBearerTokenOptional',
        'throttle:360,1',
    ]], function () {
        Route::post('ping', \Reuniors\Base\Http\Actions\V1\PingAction::class);
    });
    // Countries
    Route::get('countries', \Reuniors\Base\Http\Actions\V1\Country\GetCountriesAction::class);
    
    // Cities
    Route::get('cities', \Reuniors\Base\Http\Actions\V1\City\GetCitiesAction::class);
    
    // Tags (GET only - public)
    Route::get('tags', \Reuniors\Base\Http\Actions\V1\Tag\GetTagsAction::class);
    
    // Tag Groups (GET only - public)
    Route::get('tag-groups', \Reuniors\Base\Http\Actions\V1\TagGroup\GetTagGroupsAction::class);
    
    // QA Questions
    Route::get('qa-questions', \Reuniors\Base\Http\Actions\V1\QA\GetQaQuestionsAction::class);
    
    // Translations (GET only - public)
    Route::get('translations', \Reuniors\Base\Http\Actions\V1\Translation\GetTranslationsAction::class);
    Route::get('translations/languages', \Reuniors\Base\Http\Actions\V1\Translation\GetLanguagesAction::class);
    
    // Change Requests (GET and POST for creation - public, approve/reject are protected)
    Route::get('change-requests', \Reuniors\Base\Http\Actions\V1\ChangeRequest\GetChangeRequestsAction::class);
    Route::post('change-requests', \Reuniors\Base\Http\Actions\V1\ChangeRequest\CreateChangeRequestAction::class);
    
    // Connected Devices (requires auth)
    Route::group(['middleware' => [
        'api',
        'userFromBearerToken',
    ]], function () {
        Route::group([
            'prefix' => 'users',
        ], function () {
            Route::group([
                'prefix' => 'connected-devices',
            ], function () {
                Route::post('', \Reuniors\Base\Http\Actions\V1\User\AddConnectedDeviceAction::class);
                Route::delete('', \Reuniors\Base\Http\Actions\V1\User\RemoveConnectedDeviceAction::class);
            });
        });
    });
    
});
