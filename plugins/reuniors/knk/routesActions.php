<?php

use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use mikp\sanctum\http\middleware\UserFromBearerToken;
use Reuniors\Knk\Http\Actions\V1\Location\Tags\AddTagToLocationAction;
use Reuniors\Knk\Http\Actions\V1\Location\Tags\GetLocationTags;
use Reuniors\Knk\Http\Actions\V1\Location\Tags\RemoveTagFromLocationAction;
use reuniors\knk\Http\Actions\V1\Location\VideoReview\CreateVideoReviewAction;
use reuniors\knk\Http\Actions\V1\Location\VideoReview\DeleteVideoReviewAction;
use reuniors\knk\Http\Actions\V1\Location\VideoReview\GetVideoReviewsAction;
use Reuniors\Knk\Http\Actions\V1\Scraper\GetInstagramPostDataAction;
use Reuniors\Knk\Http\Actions\V1\Scraper\GetTiktokPostDataAction;
use Reuniors\Knk\Http\Actions\V1\Tag\CreateTagAction;
use Reuniors\Knk\Http\Actions\V1\Tag\DeleteTagAction;
use Reuniors\Knk\Http\Actions\V1\Tag\GetOneTagAction;
use Reuniors\Knk\Http\Actions\V1\Tag\GetTagsAction;
use Reuniors\Knk\Http\Actions\V1\Tag\Group\CreateTagGroupAction;
use Reuniors\Knk\Http\Actions\V1\Tag\Group\DeleteTagGroupAction;
use Reuniors\Knk\Http\Actions\V1\Tag\Group\GetOneTagGroupAction;
use Reuniors\Knk\Http\Actions\V1\Tag\Group\GetTagGroupsAction;
use Reuniors\Knk\Http\Actions\V1\Tag\Group\GetTagGroupTypesAction;
use Reuniors\Knk\Http\Actions\V1\Tag\Group\UpdateTagGroupAction;
use Reuniors\Knk\Http\Actions\V1\Tag\UpdateTagAction;
use Reuniors\Knk\Http\ActionsFe\V1\Location\VideoReview\FeGetLocationVideoReviewImageAction;
use Reuniors\WinterSocialite\Http\Middlewares\JsonMiddleware;

Route::get('proxy/video-review/image', FeGetLocationVideoReviewImageAction::class);

Route::group(
    ['prefix' => 'api/v1/knk', 'middleware' => [
        JsonMiddleware::class,
        EnsureFrontendRequestsAreStateful::class,
        'throttle:60,1',
        'bindings',
    ]],
    function () {
        Route::group(['prefix' => 'scraper'], function () {
            Route::get('instagram', GetInstagramPostDataAction::class);
            Route::get('tiktok', GetTiktokPostDataAction::class);
            Route::get('', GetTiktokPostDataAction::class);
        });

        Route::group(['prefix' => 'tags'], function () {
            Route::get('', GetTagsAction::class);
            Route::get('groups', GetTagGroupsAction::class);
            Route::get('groups/types', GetTagGroupTypesAction::class);
        });

        Route::group(['middleware' => [
            'api',
            UserFromBearerToken::class,
        ]], function () {
            Route::group([
                'middleware' => [
                    'userHasGroups:admin,worker',
                ],
            ], function () {
                Route::group(['prefix' => 'locations/{location}'], function () {
                    Route::group([
                        'prefix' => 'video-reviews',
                    ], function () {
                        Route::get('', GetVideoReviewsAction::class);
                        Route::post('', CreateVideoReviewAction::class);
                        Route::group([
                            'prefix' => '{locationVideoReview}',
                        ], function () {
                            Route::delete('', DeleteVideoReviewAction::class);
                        });
                    });
                    Route::group([
                        'prefix' => 'tags',
                    ], function () {
                        Route::get('', GetLocationTags::class);

                        Route::group([
                            'prefix' => '{tag}',
                        ], function () {
                            Route::post('', AddTagToLocationAction::class);
                            Route::delete('', RemoveTagFromLocationAction::class);
                        });
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
            });
        });
    }
);
