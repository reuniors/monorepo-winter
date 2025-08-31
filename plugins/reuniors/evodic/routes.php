<?php

require_once 'fe.routes.php';

use Illuminate\Support\Facades\Http;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use mikp\sanctum\http\middleware\UserFromBearerToken;
use Reuniors\Evodic\Http\Actions\V1\City\GetCitiesAction;
use Reuniors\Evodic\Http\Actions\V1\Country\GetCountriesAction;
use Reuniors\Evodic\Http\Actions\V1\Location\CreateLocationAction;
use Reuniors\Evodic\Http\Actions\V1\Location\Images\Single\DeleteLocationImage;
use Reuniors\Evodic\Http\Actions\V1\Location\Images\Single\UploadLocationImage;
use Reuniors\Evodic\Http\Actions\V1\Location\Images\DeleteLocationImages;
use Reuniors\Evodic\Http\Actions\V1\Location\Images\UploadLocationImages;
use Reuniors\Evodic\Http\Actions\V1\Location\Images\ReorderLocationImages;
use reuniors\evodic\Http\Actions\V1\Location\Places\AddLocationPlaceAction;
use reuniors\evodic\Http\Actions\V1\Location\Places\RemoveLocationPlaceAction;
use Reuniors\Evodic\Http\Actions\V1\Place\Images\Single\DeletePlaceImage;
use Reuniors\Evodic\Http\Actions\V1\Place\Images\Single\UploadPlaceImage;
use Reuniors\Evodic\Http\Actions\V1\Place\Images\DeletePlaceImages;
use Reuniors\Evodic\Http\Actions\V1\Place\Images\ReorderPlaceImages;
use Reuniors\Evodic\Http\Actions\V1\Place\Images\UploadPlaceImages;
use Reuniors\Evodic\Http\Actions\V1\Location\Owner\CreateLocationOwnerAction;
use Reuniors\Evodic\Http\Actions\V1\Location\DeleteLocationAction;
use Reuniors\Evodic\Http\Actions\V1\Location\Owner\DeleteLocationOwnerAction;
use Reuniors\Evodic\Http\Actions\V1\Location\GetLocationsAction;
use Reuniors\Evodic\Http\Actions\V1\Location\GetOneLocationAction;
use Reuniors\Evodic\Http\Actions\V1\Location\Owner\GetLocationOwnersAction;
use Reuniors\Evodic\Http\Actions\V1\Location\Owner\GetOneLocationOwnerAction;
use Reuniors\Evodic\Http\Actions\V1\Location\UpdateLocationAction;
use Reuniors\Evodic\Http\Actions\V1\Location\Owner\UpdateLocationOwnerAction;
use Reuniors\Evodic\Http\Actions\V1\Place\CreatePlaceAction;
use reuniors\evodic\Http\Actions\V1\Place\DeletePlaceAction;
use reuniors\evodic\Http\Actions\V1\Place\GetOnePlaceAction;
use Reuniors\Evodic\Http\Actions\V1\Place\GetPlacesAction;
use Reuniors\Evodic\Http\Actions\V1\Place\PlaceType\CreatePlaceTypeAction;
use Reuniors\Evodic\Http\Actions\V1\Place\PlaceType\DeletePlaceTypeAction;
use Reuniors\Evodic\Http\Actions\V1\Place\PlaceType\GetOnePlaceTypeAction;
use Reuniors\Evodic\Http\Actions\V1\Place\PlaceType\GetPlaceTypesAction;
use Reuniors\Evodic\Http\Actions\V1\Place\PlaceType\TagGroups\AddTagGroupToPlaceTypeAction;
use Reuniors\Evodic\Http\Actions\V1\Place\PlaceType\TagGroups\GetPlaceTypeTagGroups;
use Reuniors\Evodic\Http\Actions\V1\Place\PlaceType\TagGroups\RemoveTagGroupFromPlaceTypeAction;
use Reuniors\Evodic\Http\Actions\V1\Place\PlaceType\UpdatePlaceTypeAction;
use Reuniors\Evodic\Http\Actions\V1\Place\Tags\AddTagToPlaceAction;
use Reuniors\Evodic\Http\Actions\V1\Place\Tags\GetPlaceTags;
use Reuniors\Evodic\Http\Actions\V1\Place\Tags\RemoveTagFromPlaceAction;
use reuniors\evodic\Http\Actions\V1\Place\UpdatePlaceAction;
use Reuniors\Evodic\Http\Actions\V1\QA\Answers\CreateQaAnswerAction;
use Reuniors\Evodic\Http\Actions\V1\QA\Answers\DeleteQaAnswerAction;
use Reuniors\Evodic\Http\Actions\V1\QA\Answers\GetOneQaAnswerAction;
use Reuniors\Evodic\Http\Actions\V1\QA\Answers\GetQaAnswersAction;
use Reuniors\Evodic\Http\Actions\V1\QA\Answers\UpdateQaAnswerAction;
use Reuniors\Evodic\Http\Actions\V1\QA\Questions\CreateQaQuestionAction;
use Reuniors\Evodic\Http\Actions\V1\QA\Questions\DeleteQaQuestionAction;
use Reuniors\Evodic\Http\Actions\V1\QA\Questions\GetQaQuestionsAction;
use Reuniors\Evodic\Http\Actions\V1\Tag\CreateTagAction;
use Reuniors\Evodic\Http\Actions\V1\Tag\DeleteTagAction;
use Reuniors\Evodic\Http\Actions\V1\Tag\GetOneTagAction;
use Reuniors\Evodic\Http\Actions\V1\Tag\GetTagsAction;
use Reuniors\Evodic\Http\Actions\V1\Tag\Group\CreateTagGroupAction;
use Reuniors\Evodic\Http\Actions\V1\Tag\Group\DeleteTagGroupAction;
use Reuniors\Evodic\Http\Actions\V1\Tag\Group\GetOneTagGroupAction;
use Reuniors\Evodic\Http\Actions\V1\Tag\Group\GetTagGroupsAction;
use Reuniors\Evodic\Http\Actions\V1\Tag\Group\GetTagGroupTypesAction;
use Reuniors\Evodic\Http\Actions\V1\Tag\Group\UpdateTagGroupAction;
use Reuniors\Evodic\Http\Actions\V1\Tag\UpdateTagAction;
use Reuniors\Evodic\Http\Actions\V1\Translation\TranslationAddAction;
use Reuniors\Evodic\Http\Actions\V1\Translation\TranslationsGetAction;
use Reuniors\Evodic\Http\Actions\V1\User\LoginAction;
use Reuniors\Evodic\Http\Middleware\ClearCacheMiddleware;
use Reuniors\WinterSocialite\Http\Middlewares\JsonMiddleware;

Route::group(
    ['prefix' => 'api/v1', 'middleware' => [
//        \Barryvdh\Cors\HandleCors::class,
        'bindings',
        JsonMiddleware::class,
        EnsureFrontendRequestsAreStateful::class
    ]],
    function () {
        // public routes
        Route::post('login', LoginAction::class);
        Route::get('cities', GetCitiesAction::class);
        Route::get('countries', GetCountriesAction::class);
        Route::get('locations', GetLocationsAction::class);
        Route::get('places', GetPlacesAction::class);
        Route::get('places/types', GetPlaceTypesAction::class);
        Route::get('location-owners', GetLocationOwnersAction::class);
        Route::get('tags', GetTagsAction::class);
        Route::get('tags/groups', GetTagGroupsAction::class);
        Route::get('tags/groups/types', GetTagGroupTypesAction::class);
        Route::get('qa/questions', GetQaQuestionsAction::class);
        Route::get('translations_free', TranslationsGetAction::class);


        // protected routes
        Route::group(['middleware' => [
            'api',
            UserFromBearerToken::class,
            ClearCacheMiddleware::class,
        ]], function () {
            Route::group([
                'middleware' => [
                    'userHasGroups:admin',
                ],
            ],
            function () {
                Route::group([
                    'prefix' => 'translations',
                ], function () {
                    Route::get('', TranslationsGetAction::class);
                    Route::post('', TranslationAddAction::class);
                });

                Route::delete('places/{place}//images', DeletePlaceImages::class); // TODO temporary fix

                Route::group([
                    'prefix' => 'places',
                ], function () {
                    Route::post('', CreatePlaceAction::class);
                    Route::group([
                        'prefix' => '{place}',
                    ], function () {
                        Route::put('', UpdatePlaceAction::class);
                        Route::get('', GetOnePlaceAction::class);
                        Route::delete('', DeletePlaceAction::class);

                        Route::group([
                            'prefix' => 'images',
                        ], function () {
                            Route::post('upload', UploadPlaceImages::class);
                            Route::post('reorder', ReorderPlaceImages::class);
                            Route::delete('', DeletePlaceImages::class);
                        });

                        Route::group([
                            'prefix' => 'image',
                        ], function () {
                            Route::post('upload', UploadPlaceImage::class);
                            Route::delete('', DeletePlaceImage::class);
                        });

                        // place tags
                        Route::group([
                            'prefix' => 'tags',
                        ], function () {
                            Route::get('', GetPlaceTags::class);

                            Route::group([
                                'prefix' => '{tag}',
                            ], function () {
                                Route::post('', AddTagToPlaceAction::class);
                                Route::delete('', RemoveTagFromPlaceAction::class);
                            });
                        });
                    });


                    // type
                    Route::group([
                        'prefix' => 'types',
                    ], function () {
                        Route::post('', CreatePlaceTypeAction::class);
                        Route::group([
                            'prefix' => '{placeType}',
                        ], function () {
                            Route::put('', UpdatePlaceTypeAction::class);
                            Route::get('', GetOnePlaceTypeAction::class);
                            Route::delete('', DeletePlaceTypeAction::class);

                            Route::group([
                                'prefix' => 'tag-groups',
                            ], function () {
                                Route::get('', GetPlaceTypeTagGroups::class);

                                Route::group([
                                    'prefix' => '{tagGroup}',
                                ], function () {
                                    Route::post('', AddTagGroupToPlaceTypeAction::class);
                                    Route::delete('', RemoveTagGroupFromPlaceTypeAction::class);
                                });
                            });
                        });
                    });
                });


                Route::group([
                    'prefix' => 'locations',
                ], function () {
                    Route::post('', CreateLocationAction::class);
                    Route::group([
                        'prefix' => '{location}',
                    ], function () {
                        Route::put('', UpdateLocationAction::class);
                        Route::get('', GetOneLocationAction::class);
                        Route::delete('', DeleteLocationAction::class);

                        Route::group([
                            'prefix' => 'images',
                        ], function () {
                            Route::post('upload', UploadLocationImages::class);
                            Route::post('reorder', ReorderLocationImages::class);
                            Route::delete('', DeleteLocationImages::class);
                        });

                        Route::group([
                            'prefix' => 'image',
                        ], function () {
                            Route::post('upload', UploadLocationImage::class);
                            Route::delete('', DeleteLocationImage::class);
                        });

                        Route::group([
                            'prefix'=> 'places'
                        ], function () {
                            Route::group([
                                'prefix' => '{place}',
                            ], function () {
                                Route::post('', AddLocationPlaceAction::class);
                                Route::delete('', RemoveLocationPlaceAction::class);
                            });
                        });

                        Route::group([
                            'prefix' => 'qa/answers',
                        ], function () {
                            Route::get('', GetQaAnswersAction::class);
                        });

                        Route::group([
                            'prefix' => 'qa/answers',
                        ], function () {
                            Route::post('', CreateQaAnswerAction::class);
                            Route::group([
                                'prefix' => '{qaAnswer}',
                            ], function () {
                                Route::put('', UpdateQaAnswerAction::class);
                                Route::get('', GetOneQaAnswerAction::class);
                                Route::delete('', DeleteQaAnswerAction::class);
                            });
                        });
                    });
                });


                Route::group([
                    'prefix' => 'location-owners',
                ], function () {
                    Route::post('', CreateLocationOwnerAction::class);
                    Route::group([
                        'prefix' => '{locationOwner}',
                    ], function () {
                        Route::put('', UpdateLocationOwnerAction::class);
                        Route::get('', GetOneLocationOwnerAction::class);
                        Route::delete('', DeleteLocationOwnerAction::class);
                    });
                });


                Route::group([
                    'prefix' => 'tags',
                ], function () {
                    Route::post('', CreateTagAction::class);
                    Route::group([
                        'prefix' => '{tag}',
                    ], function () {
                        Route::put('', UpdateTagAction::class);
                        Route::get('', GetOneTagAction::class);
                        Route::delete('', DeleteTagAction::class);
                    });
                    Route::group([
                        'prefix' => 'groups',
                    ], function () {
                        Route::post('', CreateTagGroupAction::class);
                        Route::group([
                            'prefix' => '{tagGroup}',
                        ], function () {
                            Route::put('', UpdateTagGroupAction::class);
                            Route::get('', GetOneTagGroupAction::class);
                            Route::delete('', DeleteTagGroupAction::class);
                        });
                    });
                });

                Route::group([
                    'prefix' => 'qa/questions',
                ], function () {
                    Route::post('', CreateQaQuestionAction::class);

                    Route::group([
                        'prefix' => '{qaQuestion}',
                    ], function () {
                        Route::delete('', DeleteQaQuestionAction::class);
                    });
                });
                // Route::resource('locations', \Reuniors\Evodic\Http\Controllers\Api\v1\LocationsApiController::class);
            });
        });
    },
);
