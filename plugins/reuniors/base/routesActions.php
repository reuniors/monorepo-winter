<?php

use Illuminate\Support\Facades\Route;
use Reuniors\WinterSocialite\Http\Middlewares\JsonMiddleware;
use mikp\sanctum\http\middleware\UserFromBearerToken;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

/*
|--------------------------------------------------------------------------
| Protected API Routes - Base Plugin
|--------------------------------------------------------------------------
|
| These routes require authentication and specific user group permissions.
| Only users with appropriate groups can access these endpoints.
|
*/

Route::group(['prefix' => 'api/v1', 'middleware' => [
    'bindings',
    'userLanguage',
    JsonMiddleware::class,
    EnsureFrontendRequestsAreStateful::class
]], function () {

    // Protected routes - require authentication and admin/owner/manager permissions
    Route::group(['middleware' => [
        'api',
        UserFromBearerToken::class,
        'userHasGroups:owner,admin,manager',
    ]], function () {

        // Tags Management (Admin/Manager only)
        Route::group(['prefix' => 'tags'], function () {
            Route::post('/', \Reuniors\Base\Http\Actions\V1\Tag\CreateTagAction::class);
            Route::put('{id}', \Reuniors\Base\Http\Actions\V1\Tag\UpdateTagAction::class);
            Route::delete('{id}', \Reuniors\Base\Http\Actions\V1\Tag\DeleteTagAction::class);
        });

        // Tag Groups Management (Admin/Manager only)
        Route::group(['prefix' => 'tag-groups'], function () {
            Route::post('/', \Reuniors\Base\Http\Actions\V1\TagGroup\CreateTagGroupAction::class);
        });

        // Translations Management (Admin/Manager only)
        Route::group(['prefix' => 'translations'], function () {
            Route::post('/', \Reuniors\Base\Http\Actions\V1\Translation\CreateTranslationAction::class);
        });

        // Change Requests Management (Admin/Manager only)
        Route::group(['prefix' => 'change-requests'], function () {
            Route::post('{id}/approve', \Reuniors\Base\Http\Actions\V1\ChangeRequest\ApproveChangeRequestAction::class);
            Route::post('{id}/reject', \Reuniors\Base\Http\Actions\V1\ChangeRequest\RejectChangeRequestAction::class);
        });

        // Image Management (Unified routes for all image types)
        Route::group(['prefix' => 'images'], function () {
            Route::post('upload', \Reuniors\Base\Http\Actions\V1\Image\ImageUploadAction::class);
            Route::delete('delete', \Reuniors\Base\Http\Actions\V1\Image\ImageDeleteAction::class);
            Route::delete('bulk-delete', \Reuniors\Base\Http\Actions\V1\Image\ImageBulkDeleteAction::class);
            Route::post('reorder', \Reuniors\Base\Http\Actions\V1\Image\ImageReorderAction::class);
            Route::put('update', \Reuniors\Base\Http\Actions\V1\Image\ImageUpdateAction::class);
        });

    });

});

