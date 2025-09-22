<?php

use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use mikp\sanctum\http\middleware\UserFromBearerToken;
use Reuniors\Knk\Http\ActionsFe\V1\Category\LocationCategoryGetOneAction;
use Reuniors\Knk\Http\ActionsFe\V1\City\FeGetCitiesAction;
use Reuniors\Knk\Http\ActionsFe\V1\Location\Comment\FeUserGetLocationCommentsAction;
use Reuniors\Knk\Http\ActionsFe\V1\Location\Comment\FeUserLikeCommentAction;
use Reuniors\Knk\Http\ActionsFe\V1\Location\RestaurantMenu\Food\User\FeGetUserFoodsLikesAction;
use Reuniors\Knk\Http\ActionsFe\V1\Location\RestaurantMenu\Food\User\FeUserLikeFoodAction;
use Reuniors\Knk\Http\ActionsFe\V1\Location\RestaurantMenu\Food\FeGetCityFavoriteFoodsAction;
use Reuniors\Knk\Http\ActionsFe\V1\Location\Review\FeGetLocationRatingsAction;
use Reuniors\Knk\Http\ActionsFe\V1\Location\Tag\FeGetLocationBadgesAction;
use Reuniors\Knk\Http\ActionsFe\V1\Location\User\Comment\FeGetUserCommentsLikesAction;
use Reuniors\Knk\Http\ActionsFe\V1\Location\User\Comment\FeUserSetLocationCommentAction;
use Reuniors\Knk\Http\ActionsFe\V1\Location\User\Like\FeGetUserLikesAction;
use Reuniors\Knk\Http\ActionsFe\V1\Location\User\Like\FeUserLikeLocationAction;
use Reuniors\Knk\Http\ActionsFe\V1\Location\User\Review\FeUserGetLocationReviewAction;
use Reuniors\Knk\Http\ActionsFe\V1\Location\User\Review\FeUserSetLocationRatingAction;
use Reuniors\Knk\Http\ActionsFe\V1\Location\User\Tag\FeUserGetLocationBadgesAction;
use Reuniors\Knk\Http\ActionsFe\V1\Location\User\Tag\FeUserSetLocationBadgeAction;
use Reuniors\Knk\Http\ActionsFe\V1\Location\VideoReview\FeGetCityVideoReviews;
use Reuniors\Knk\Http\ActionsFe\V1\Location\VideoReview\FeGetLocationVideoReviewsAction;
use Reuniors\Knk\Http\ActionsFe\V1\Location\FeGetCategoryLocations;
use Reuniors\Knk\Http\ActionsFe\V1\Location\FeGetCitiesCategoriesLocations;
use Reuniors\Knk\Http\ActionsFe\V1\Location\FeGetCitiesTopLocationsAction;
use Reuniors\Knk\Http\ActionsFe\V1\Location\FeGetCityCategoriesLocations;
use Reuniors\Knk\Http\ActionsFe\V1\Location\FeGetCityLocations;
use Reuniors\Knk\Http\ActionsFe\V1\Location\FeGetFollowersLikedLocationsAction;
use Reuniors\Knk\Http\ActionsFe\V1\Location\FeGetLocationsCategories;
use Reuniors\Knk\Http\ActionsFe\V1\Location\FeGetOneLocation;
use Reuniors\Knk\Http\ActionsFe\V1\Story\FeCreateStoryAction;
use Reuniors\Knk\Http\ActionsFe\V1\Story\FeDeleteStoryAction;
use Reuniors\Knk\Http\ActionsFe\V1\Story\FeGetStoriesAction;
use Reuniors\Knk\Http\ActionsFe\V1\Tag\FeGetBadgesAction;
use Reuniors\Knk\Http\ActionsFe\V1\Tag\FeGetTagsAction;
use Reuniors\Knk\Http\ActionsFe\V1\User\FeFollowProfileAction;
use Reuniors\Knk\Http\ActionsFe\V1\User\FeGetProfileAction;
use Reuniors\Knk\Http\ActionsFe\V1\User\FeGetProfileFollowersAction;
use Reuniors\Knk\Http\ActionsFe\V1\User\FeGetProfileLikesAction;
use Reuniors\Knk\Http\ActionsFe\V1\User\FeGetProfileReviewsAction;
use Reuniors\Knk\Http\ActionsFe\V1\User\FeGetProfileVideoReviewsAction;
use Reuniors\Knk\Http\ActionsFe\V1\User\FeUnfollowProfileAction;
use Reuniors\Knk\Http\ActionsFe\V1\User\FeUpdateProfileAction;
use Reuniors\Knk\Http\ActionsFe\V1\User\FeUpdateProfileAvatarAction;
use Reuniors\WinterSocialite\Http\Middlewares\JsonMiddleware;

Route::group(
    [
        'prefix' => 'api/v1/knk/fe',
        'middleware' => [
            JsonMiddleware::class,
            EnsureFrontendRequestsAreStateful::class,
            'throttle:60,1',
            'bindings',
        ]
    ],
    function () {
        Route::group(['prefix' => 'cities'], function () {
            Route::get('', FeGetCitiesAction::class);
            Route::get('categories/locations', FeGetCitiesCategoriesLocations::class);
            Route::get('top-locations', FeGetCitiesTopLocationsAction::class);
        });
        Route::group(['prefix' => 'city'], function () {
            Route::get('categories/locations', FeGetCityCategoriesLocations::class);
            Route::get('category/locations', FeGetCategoryLocations::class);
            Route::get('locations', FeGetCityLocations::class);
            Route::get('location', FeGetOneLocation::class);
            Route::get('video-reviews', FeGetCityVideoReviews::class);
        });
        Route::group(['prefix' => 'category'], function () {
            Route::get('', LocationCategoryGetOneAction::class);
        });
        Route::group(['prefix' => 'tags'], function () {
            Route::get('', FeGetTagsAction::class);
            Route::get('badges', FeGetBadgesAction::class);
        });
        Route::group(['prefix' => 'video-reviews'], function () {
            Route::get('', FeGetLocationVideoReviewsAction::class);
        });

        Route::group(['prefix' => 'location'], function () {
            Route::get('comments', FeUserGetLocationCommentsAction::class);
            Route::get('ratings', FeGetLocationRatingsAction::class);
            Route::get('badges', FeGetLocationBadgesAction::class);
        });

        Route::group(['prefix' => 'locations'], function () {
            Route::get('categories', FeGetLocationsCategories::class);
        });

        // Authenticated routes
        Route::group([
            'middleware' => [
                'api',
                UserFromBearerToken::class,
            ]
        ], function () {
            // Profile routes
            Route::group(['prefix' => 'profile'], function () {
                Route::get('', FeGetProfileAction::class);
                Route::put('', FeUpdateProfileAction::class);
                Route::post('avatar', FeUpdateProfileAvatarAction::class);
                Route::post('follow', FeFollowProfileAction::class);
                Route::post('unfollow', FeUnfollowProfileAction::class);
                Route::get('video-reviews', FeGetProfileVideoReviewsAction::class);
                Route::get('reviews', FeGetProfileReviewsAction::class);
                Route::get('likes', FeGetProfileLikesAction::class);
                Route::get('followers', FeGetProfileFollowersAction::class);
            });

            Route::group(['prefix' => 'location'], function () {
                Route::post('like', FeUserLikeLocationAction::class);
                Route::get('likes', FeGetUserLikesAction::class);

                Route::group(['prefix' => 'user'], function () {
                    // Rating
                    Route::group(['prefix' => 'ratings'], function () {
                        Route::post('', FeUserSetLocationRatingAction::class);
                    });
                    Route::group(['prefix' => 'review'], function () {
                        Route::get('', FeUserGetLocationReviewAction::class);
                    });

                    // Comment
                    Route::group(['prefix' => 'comment'], function () {
                        Route::post('', FeUserSetLocationCommentAction::class);
                        Route::post('like', FeUserLikeCommentAction::class);
                        Route::get('likes', FeGetUserCommentsLikesAction::class);
                    });

                    Route::group(['prefix' => 'tag'], function () {
                        Route::post('badge', FeUserSetLocationBadgeAction::class);
                        Route::get('badges', FeUserGetLocationBadgesAction::class);
                    });
                });

                Route::group(['prefix' => 'restaurant-menu'], function () {
                    Route::group(['prefix' => 'food'], function () {
                        Route::post('like', FeUserLikeFoodAction::class);
                        Route::get('likes', FeGetUserFoodsLikesAction::class);
                        Route::get('city-favorite-foods', FeGetCityFavoriteFoodsAction::class);
                    });
                });

                Route::get('followers-liked-locations', FeGetFollowersLikedLocationsAction::class);

                // PROTECTED ROUTES FOR SPECIFIC USER GROUPS
                Route::group([
                    'middleware' => [
                        'userHasGroups:admin,worker',
                    ],
                ], function () {
                    // Story routes
                    Route::group([
                        'prefix' => 'story',
                    ], function () {
                        Route::post('', FeCreateStoryAction::class);
                        Route::get('', FeGetStoriesAction::class);
                        Route::delete('', FeDeleteStoryAction::class);
                    });
                    // end story routes
                });
                // END PROTECTED ROUTES
            });
        });
        // End of authenticated routes
    }
);

Route::group(['prefix' => 'api/v1'], function () {
    // Profile sections routes
    Route::get('profile/{username}/likes', 'Reuniors\Knk\Http\Controllers\ProfileController@getLikedLocations');
    Route::get('profile/{username}/reviews', 'Reuniors\Knk\Http\Controllers\ProfileController@getProfileReviews');
    Route::get('profile/{username}/followers', 'Reuniors\Knk\Http\Controllers\ProfileController@getProfileFollowers');
});
