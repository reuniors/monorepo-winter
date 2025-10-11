<?php

use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use mikp\sanctum\http\middleware\UserFromBearerToken;
use Reuniors\Botovi\Http\Actions\V1\Person\PersonCreateAction;
use Reuniors\Botovi\Http\Actions\V1\Person\PersonUpdateAction;
use Reuniors\Botovi\Http\Actions\V1\Person\PersonDeleteAction;
use Reuniors\Botovi\Http\Actions\V1\Person\PersonApproveAction;
use Reuniors\Botovi\Http\Actions\V1\Person\PersonRejectAction;
use Reuniors\Botovi\Http\Actions\V1\Person\PersonDeactivateAction;
use Reuniors\Botovi\Http\Actions\V1\PersonComment\PersonCommentApproveAction;
use Reuniors\Botovi\Http\Actions\V1\PersonComment\PersonCommentRejectAction;
use Reuniors\Botovi\Http\Actions\V1\PersonReview\PersonReviewApproveAction;
use Reuniors\Botovi\Http\Actions\V1\PersonReview\PersonReviewRejectAction;
use Reuniors\Botovi\Http\Actions\V1\PersonFlag\PersonFlagResolveAction;
use Reuniors\Botovi\Http\Actions\V1\PersonReport\PersonReportResolveAction;
use Reuniors\Botovi\Http\Actions\V1\ChangeRequest\ChangeRequestExecuteAction;
use Reuniors\Botovi\Http\Actions\V1\ChangeRequest\PersonChangeRequestCreateAction;
use Reuniors\Botovi\Http\Actions\V1\ChangeRequest\PersonChangeRequestUpdateAction;
use Reuniors\Botovi\Http\Actions\V1\ChangeRequest\PersonChangeRequestDeleteAction;
use Reuniors\Botovi\Http\Actions\V1\Category\CategoryCreateAction;
use Reuniors\Botovi\Http\Actions\V1\Category\CategoryUpdateAction;
use Reuniors\Botovi\Http\Actions\V1\Category\CategoryDeleteAction;
use Reuniors\Botovi\Http\Actions\V1\Category\CategoryGetAction;
use Reuniors\Botovi\Http\Actions\V1\Category\CategoryGetOneAction;
use Reuniors\Botovi\Http\Actions\V1\Category\CategoryGetTreeAction;
use Reuniors\Botovi\Http\Middleware\JsonMiddleware;

Route::group(
    ['prefix' => 'api/v1/botovi', 'middleware' => [
        JsonMiddleware::class,
        EnsureFrontendRequestsAreStateful::class,
        'throttle:60,1',
        'bindings',
    ]],
    function () {
        // Admin/Worker only routes
        Route::group(['middleware' => [
            'api',
            UserFromBearerToken::class,
            'userHasGroups:admin,worker'
        ]], function () {
            // Person management routes
            Route::group(['prefix' => 'admin/people'], function () {
                Route::post('', PersonCreateAction::class);
                Route::put('{person}', PersonUpdateAction::class);
                Route::delete('{person}', PersonDeleteAction::class);
                Route::post('{person}/approve', PersonApproveAction::class);
                Route::post('{person}/reject', PersonRejectAction::class);
                Route::post('{person}/deactivate', PersonDeactivateAction::class);
            });

            // Category management routes
            Route::group(['prefix' => 'admin/categories'], function () {
                Route::get('', CategoryGetAction::class);
                Route::get('tree', CategoryGetTreeAction::class);
                Route::get('{category}', CategoryGetOneAction::class);
                Route::post('', CategoryCreateAction::class);
                Route::put('{category}', CategoryUpdateAction::class);
                Route::delete('{category}', CategoryDeleteAction::class);
            });

            // Comment management routes
            Route::group(['prefix' => 'admin/comments'], function () {
                Route::post('{comment}/approve', PersonCommentApproveAction::class);
                Route::post('{comment}/reject', PersonCommentRejectAction::class);
            });

            // Review management routes
            Route::group(['prefix' => 'admin/reviews'], function () {
                Route::post('{review}/approve', PersonReviewApproveAction::class);
                Route::post('{review}/reject', PersonReviewRejectAction::class);
            });

            // Flag management routes
            Route::group(['prefix' => 'admin/flags'], function () {
                Route::post('{flag}/resolve', PersonFlagResolveAction::class);
            });

            // Report management routes
            Route::group(['prefix' => 'admin/reports'], function () {
                Route::post('{report}/resolve', PersonReportResolveAction::class);
            });

            // Change request routes
            Route::group(['prefix' => 'change-requests'], function () {
                Route::post('person/create', PersonChangeRequestCreateAction::class);
                Route::post('person/update', PersonChangeRequestUpdateAction::class);
                Route::post('person/delete', PersonChangeRequestDeleteAction::class);
                Route::post('execute', ChangeRequestExecuteAction::class);
            });
        });
    }
);
