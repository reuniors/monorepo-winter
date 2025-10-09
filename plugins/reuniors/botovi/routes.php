<?php

use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use mikp\sanctum\http\middleware\UserFromBearerToken;
use Reuniors\Botovi\Http\Actions\V1\Person\PersonCreateAction;
use Reuniors\Botovi\Http\Actions\V1\Person\PersonUpdateAction;
use Reuniors\Botovi\Http\Actions\V1\Person\PersonGetAction;
use Reuniors\Botovi\Http\Actions\V1\Person\PersonGetOneAction;
use Reuniors\Botovi\Http\Actions\V1\Person\PersonDeleteAction;
use Reuniors\Botovi\Http\Actions\V1\PersonReview\PersonReviewCreateAction;
use Reuniors\Botovi\Http\Actions\V1\PersonReview\PersonReviewApproveAction;
use Reuniors\Botovi\Http\Actions\V1\PersonReview\PersonReviewRejectAction;
use Reuniors\Botovi\Http\Actions\V1\Person\PersonApproveAction;
use Reuniors\Botovi\Http\Actions\V1\Person\PersonRejectAction;
use Reuniors\Botovi\Http\Actions\V1\Person\PersonDeactivateAction;
use Reuniors\Botovi\Http\Actions\V1\PersonComment\PersonCommentCreateAction;
use Reuniors\Botovi\Http\Actions\V1\PersonComment\PersonCommentApproveAction;
use Reuniors\Botovi\Http\Actions\V1\PersonComment\PersonCommentRejectAction;
use Reuniors\Botovi\Http\Actions\V1\PersonFlag\PersonFlagCreateAction;
use Reuniors\Botovi\Http\Actions\V1\PersonFlag\PersonFlagResolveAction;
use Reuniors\Botovi\Http\Actions\V1\PersonReport\PersonReportCreateAction;
use Reuniors\Botovi\Http\Actions\V1\PersonReport\PersonReportResolveAction;
use Reuniors\Botovi\Http\Actions\V1\Event\EventCreateAction;
use Reuniors\Botovi\Http\Actions\V1\Event\EventUpdateAction;
use Reuniors\Botovi\Http\Actions\V1\Event\EventGetAction;
use Reuniors\Botovi\Http\Actions\V1\Event\EventDeleteAction;
use Reuniors\Botovi\Http\Actions\V1\ChangeRequest\ChangeRequestExecuteAction;
use Reuniors\Botovi\Http\Actions\V1\ChangeRequest\PersonChangeRequestCreateAction;
use Reuniors\Botovi\Http\Actions\V1\ChangeRequest\PersonChangeRequestUpdateAction;
use Reuniors\Botovi\Http\Actions\V1\ChangeRequest\PersonChangeRequestDeleteAction;
use Reuniors\Botovi\Http\Actions\V1\Statistics\PersonStatisticsGetAction;
use Reuniors\Botovi\Http\Actions\V1\Statistics\PersonSearchLogGetAction;
use Reuniors\Botovi\Http\Actions\V1\Export\PersonExportAction;
use Reuniors\Botovi\Http\Actions\V1\Export\PersonExportStatusAction;
use Reuniors\Botovi\Http\Middleware\JsonMiddleware;

require_once 'routesFe.php';
require_once 'routesActions.php';

Route::group(
    ['prefix' => 'api/v1/botovi', 'middleware' => [
        JsonMiddleware::class,
        EnsureFrontendRequestsAreStateful::class,
        'throttle:60,1',
        'bindings',
    ]],
    function () {
        // Public routes
        Route::get('people', PersonGetAction::class);
        Route::get('people/{personId}', PersonGetOneAction::class);
        Route::get('events', EventGetAction::class);

        // Authenticated routes
        Route::group(['middleware' => [
            'api',
            UserFromBearerToken::class,
        ]], function () {
            // Person routes
            Route::group(['prefix' => 'people'], function () {
                Route::post('', PersonCreateAction::class);
                Route::put('{personId}', PersonUpdateAction::class);
                Route::delete('{personId}', PersonDeleteAction::class);
                Route::post('{personId}/review', PersonReviewCreateAction::class);
            });

            // Comment routes
            Route::group(['prefix' => 'comments'], function () {
                Route::post('', PersonCommentCreateAction::class);
            });

            // Flag routes
            Route::group(['prefix' => 'flags'], function () {
                Route::post('', PersonFlagCreateAction::class);
            });

            // Report routes
            Route::group(['prefix' => 'reports'], function () {
                Route::post('', PersonReportCreateAction::class);
            });

            // Event routes
            Route::group(['prefix' => 'events'], function () {
                Route::post('', EventCreateAction::class);
                Route::put('{eventId}', EventUpdateAction::class);
                Route::delete('{eventId}', EventDeleteAction::class);
            });

            // Change request routes
            Route::group(['prefix' => 'change-requests'], function () {
                Route::post('person/create', PersonChangeRequestCreateAction::class);
                Route::post('person/update', PersonChangeRequestUpdateAction::class);
                Route::post('person/delete', PersonChangeRequestDeleteAction::class);
            });

            // Statistics routes
            Route::group(['prefix' => 'statistics'], function () {
                Route::get('person/{personId}', PersonStatisticsGetAction::class);
                Route::get('search-log', PersonSearchLogGetAction::class);
            });

            // Export routes
            Route::group(['prefix' => 'export'], function () {
                Route::post('person', PersonExportAction::class);
                Route::get('person/{exportLogId}/status', PersonExportStatusAction::class);
            });

            // Admin routes
            Route::group(['middleware' => ['userHasGroups:admin,worker']], function () {
                // Person admin routes
                Route::group(['prefix' => 'admin/people'], function () {
                    Route::post('{personId}/approve', PersonApproveAction::class);
                    Route::post('{personId}/reject', PersonRejectAction::class);
                    Route::post('{personId}/deactivate', PersonDeactivateAction::class);
                });

            // Comment admin routes
            Route::group(['prefix' => 'admin/comments'], function () {
                Route::post('{commentId}/approve', PersonCommentApproveAction::class);
                Route::post('{commentId}/reject', PersonCommentRejectAction::class);
            });

            // Review admin routes
            Route::group(['prefix' => 'admin/reviews'], function () {
                Route::post('{reviewId}/approve', PersonReviewApproveAction::class);
                Route::post('{reviewId}/reject', PersonReviewRejectAction::class);
            });

                // Flag admin routes
                Route::group(['prefix' => 'admin/flags'], function () {
                    Route::post('{flagId}/resolve', PersonFlagResolveAction::class);
                });

                // Report admin routes
                Route::group(['prefix' => 'admin/reports'], function () {
                    Route::post('{reportId}/resolve', PersonReportResolveAction::class);
                });

                // Change request execution
                Route::post('change-requests/execute', ChangeRequestExecuteAction::class);
            });
        });
    }
);
