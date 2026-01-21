<?php

require_once 'routesWizard.php';

use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use mikp\sanctum\http\middleware\UserFromBearerToken;
use Reuniors\Questionnaire\Http\Actions\V1\Questionnaire\CreateQuestionnaireRegistration;
use reuniors\questionnaire\Http\Actions\V1\Questionnaire\Data\DeleteQuestionnaireData;
use reuniors\questionnaire\Http\Actions\V1\Questionnaire\Data\GetOrCreateQuestionnaireRegistrationDataDraft;
use reuniors\questionnaire\Http\Actions\V1\Questionnaire\Data\GetQuestionnaireRegistrationData;
use reuniors\questionnaire\Http\Actions\V1\Questionnaire\Data\Images\DeleteQuestionnaireDataPhotos;
use reuniors\questionnaire\Http\Actions\V1\Questionnaire\Data\Images\ReorderQuestionnaireDataPhotos;
use reuniors\questionnaire\Http\Actions\V1\Questionnaire\Data\Images\Single\DeleteQuestionnaireDataPhoto;
use reuniors\questionnaire\Http\Actions\V1\Questionnaire\Data\Images\Single\UploadQuestionnaireDataPhoto;
use reuniors\questionnaire\Http\Actions\V1\Questionnaire\Data\Images\UploadQuestionnaireDataPhotos;
use reuniors\questionnaire\Http\Actions\V1\Questionnaire\Data\List\GetQuestionnairesDataList;
use reuniors\questionnaire\Http\Actions\V1\Questionnaire\Data\RestaurantMenu\CreateRestaurantMenuAction;
use reuniors\questionnaire\Http\Actions\V1\Questionnaire\Data\RestaurantMenu\DeleteRestaurantMenuAction;
use reuniors\questionnaire\Http\Actions\V1\Questionnaire\Data\RestaurantMenu\GetRestaurantMenuListAction;
use reuniors\questionnaire\Http\Actions\V1\Questionnaire\Data\UpdateQuestionnaireData;
use reuniors\questionnaire\Http\Actions\V1\Questionnaire\DeleteQuestionnaireRegistration;
use reuniors\questionnaire\Http\Actions\V1\Questionnaire\Email\SendEmailQuestionnaireCode;
use reuniors\questionnaire\Http\Actions\V1\Questionnaire\List\GetQuestionnairesList;
use Reuniors\Questionnaire\Http\Middleware\QuestionnaireToken;
use Reuniors\WinterSocialite\Http\Middlewares\JsonMiddleware;

Route::group(
    ['prefix' => 'api/v1/questionnaire', 'middleware' => [
        JsonMiddleware::class,
        EnsureFrontendRequestsAreStateful::class
    ]],
    function () {
        Route::group(['middleware' => [
            'api',
            UserFromBearerToken::class,
        ]], function () {
            Route::group([
                'prefix' => 'questionnaire',
                'middleware' => ['userHasGroups:admin']
            ], function () {
                Route::post('create', CreateQuestionnaireRegistration::class);
                Route::delete('delete', DeleteQuestionnaireRegistration::class);

                Route::post('send-email', SendEmailQuestionnaireCode::class);

                Route::get('list', GetQuestionnairesList::class);
            });
        });

        Route::group([
            'prefix' => 'questionnaire/{type}',
            'middleware' => [QuestionnaireToken::class]
        ], function () {

            Route::get('data', GetQuestionnaireRegistrationData ::class);
            Route::post('draft', GetOrCreateQuestionnaireRegistrationDataDraft::class);
            Route::delete('delete', DeleteQuestionnaireData ::class);

            Route::post('update', UpdateQuestionnaireData::class);

            // Images multiple
            Route::post('upload-images', UploadQuestionnaireDataPhotos::class);
            Route::delete('delete-images', DeleteQuestionnaireDataPhotos::class);
            Route::post('reorder-images', ReorderQuestionnaireDataPhotos::class);
            // Image single
            Route::post('upload-image', UploadQuestionnaireDataPhoto::class);
            Route::delete('delete-image', DeleteQuestionnaireDataPhoto::class);

            Route::get('list', GetQuestionnairesDataList::class);

            // Restaurant menu
            Route::group(['prefix' => 'restaurant-menu'], function () {
                Route::post('list', GetRestaurantMenuListAction::class);
                Route::post('create', CreateRestaurantMenuAction::class);
                Route::delete('delete', DeleteRestaurantMenuAction::class);
            });
        })->where('type','menu|location');
    }
);
