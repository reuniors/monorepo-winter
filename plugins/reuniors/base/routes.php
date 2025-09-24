<?php

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
//        'throttle:60,1',
        'bindings',
    ]], function () {
    
    // Countries
    Route::get('countries', \Reuniors\Base\Http\Actions\V1\Country\GetCountriesAction::class);
    
    // Cities
    Route::get('cities', \Reuniors\Base\Http\Actions\V1\City\GetCitiesAction::class);
    
    // Tags
    Route::get('tags', \Reuniors\Base\Http\Actions\V1\Tag\GetTagsAction::class);
    Route::post('tags', \Reuniors\Base\Http\Actions\V1\Tag\CreateTagAction::class);
    Route::put('tags/{id}', \Reuniors\Base\Http\Actions\V1\Tag\UpdateTagAction::class);
    Route::delete('tags/{id}', \Reuniors\Base\Http\Actions\V1\Tag\DeleteTagAction::class);
    
    // Tag Groups
    Route::get('tag-groups', \Reuniors\Base\Http\Actions\V1\TagGroup\GetTagGroupsAction::class);
    Route::post('tag-groups', \Reuniors\Base\Http\Actions\V1\TagGroup\CreateTagGroupAction::class);
    
    // QA Questions
    Route::get('qa-questions', \Reuniors\Base\Http\Actions\V1\QA\GetQaQuestionsAction::class);
    
    // Translations
    Route::get('translations', \Reuniors\Base\Http\Actions\V1\Translation\GetTranslationsAction::class);
    Route::post('translations', \Reuniors\Base\Http\Actions\V1\Translation\CreateTranslationAction::class);
    Route::get('translations/languages', \Reuniors\Base\Http\Actions\V1\Translation\GetLanguagesAction::class);
    
    // Change Requests
    Route::get('change-requests', \Reuniors\Base\Http\Actions\V1\ChangeRequest\GetChangeRequestsAction::class);
    Route::post('change-requests', \Reuniors\Base\Http\Actions\V1\ChangeRequest\CreateChangeRequestAction::class);
    Route::post('change-requests/{id}/approve', \Reuniors\Base\Http\Actions\V1\ChangeRequest\ApproveChangeRequestAction::class);
    Route::post('change-requests/{id}/reject', \Reuniors\Base\Http\Actions\V1\ChangeRequest\RejectChangeRequestAction::class);
    
});
