<?php

use Cms\Classes\Controller;
use Illuminate\Support\Facades\Log;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use mikp\sanctum\http\middleware\UserFromBearerToken;
use RainLab\Translate\Models\Message;
use reuniors\knk\Http\Actions\V1\City\GetCities;
use reuniors\knk\Http\Actions\V1\Location\Category\GetCategories;
use reuniors\knk\Http\Actions\V1\Location\GetLocationAction;
use Reuniors\Knk\Http\Actions\V1\Location\GetLocationsAction;
use reuniors\knk\Http\Actions\V1\Location\Images\DeleteLocationImages;
use reuniors\knk\Http\Actions\V1\Location\Images\ReorderLocationImages;
use reuniors\knk\Http\Actions\V1\Location\Images\Single\DeleteLocationImage;
use reuniors\knk\Http\Actions\V1\Location\Images\Single\UploadLocationImage;
use reuniors\knk\Http\Actions\V1\Location\Images\UploadLocationImages;
use reuniors\knk\Http\Actions\V1\Location\Questionnaire\CreateLocationFromQuestionnaire;
use reuniors\knk\Http\Actions\V1\Location\UpdateLocationDataAction;
use Reuniors\Knk\Http\Actions\V1\RestaurantMenu\CreateRestaurantMenuAction;
use Reuniors\Knk\Http\Actions\V1\RestaurantMenu\DeleteRestaurantMenuAction;
use reuniors\knk\Http\Actions\V1\RestaurantMenu\Food\UploadFoodPhoto;
use Reuniors\Knk\Http\Actions\V1\RestaurantMenu\GetRestaurantMenuListAction;
use reuniors\knk\Http\Actions\V1\RestaurantMenu\RelationsUpdatedAction;
use reuniors\knk\Http\Actions\V1\RestaurantMenu\RestaurantMenuActivationAction;
use reuniors\knk\Http\Actions\V1\RestaurantMenu\RestaurantMenuImportFromUrlAction;
use Reuniors\Knk\Http\Actions\V1\User\LoginAction;
use Reuniors\Knk\Http\Actions\V1\User\RegisterAction;
use Reuniors\Knk\Http\Actions\V1\User\Worker\WorkLogAction;
use Reuniors\Knk\Http\Actions\V1\User\Worker\WorkLogsListAction;
use Reuniors\Knk\Http\Controllers\Api\V1\ActionsApiController;
use Reuniors\Knk\Http\Middleware\JsonMiddleware;
use Reuniors\Knk\Models\Category;
use Reuniors\Knk\Models\Location;
use Reuniors\Knk\Models\RegionCity;
use Reuniors\Base\Models\Tag;
use Illuminate\Support\Facades\Cache;

require_once 'routesFe.php';
require_once 'routesActions.php';

Route::group(
    ['prefix' => 'api/v1/knk', 'middleware' => [
        JsonMiddleware::class,
        EnsureFrontendRequestsAreStateful::class,
//        'throttle:60,1',
        'bindings',
    ]],
    function () {
        Route::resource('location', Reuniors\Knk\Http\Controllers\Api\V1\LocationsApiController::class);
        Route::resource('category', Reuniors\Knk\Http\Controllers\Api\V1\CategoriesApiController::class);
        Route::resource('restaurantMenu', Reuniors\Knk\Http\Controllers\Api\V1\RestaurantMenuApiController::class);
        Route::resource(
            'restaurantMenu.foodCategory',
            Reuniors\Knk\Http\Controllers\Api\V1\FoodCategoriesApiController::class
        );
        Route::post(
            'restaurantMenu/{restaurantMenuId}/foodCategory/sort',
            'Reuniors\Knk\Http\Controllers\Api\V1\FoodCategoriesApiController@multiSort'
        );
        Route::resource(
            'restaurantMenu.foodCategory.food',
            Reuniors\Knk\Http\Controllers\Api\V1\FoodsApiController::class
        );
        Route::post(
            'restaurantMenu/{restaurantMenuId}/foodCategory/{foodCategoryId}/food/sort',
            'Reuniors\Knk\Http\Controllers\Api\V1\FoodsApiController@multiSort'
        );
        Route::get(
            'location/{slug}/restaurantMenu',
            'Reuniors\Knk\Http\Controllers\Api\V1\RestaurantMenuApiController@indexByLocationSlug'
        );

        Route::get('generate-slug/{title}', 'Reuniors\Knk\Http\Controllers\Api\V1\CommonApiController@generateSlug');
        Route::get('generate-name/{title}', 'Reuniors\Knk\Http\Controllers\Api\V1\CommonApiController@generateName');
        Route::get(
            'generate-slug-name/{title}',
            'Reuniors\Knk\Http\Controllers\Api\V1\CommonApiController@generateSlugAndName'
        );
        // Food Addons Group roots
        Route::resource(
            'restaurantMenu.foodCategory.food.foodAddonGroup',
            Reuniors\Knk\Http\Controllers\Api\V1\FoodAddonGroupsApiController::class
        );
        Route::post(
            'restaurantMenu/{restaurantMenuId}/foodCategory/{foodCategoryId}/food/{foodId}/foodAddonGroup/add',
            'Reuniors\Knk\Http\Controllers\Api\V1\FoodAddonGroupsApiController@addExisting'
        );
        Route::post(
            'restaurantMenu/{restaurantMenuId}/foodCategory/{foodCategoryId}/food/{foodId}/foodAddonGroup/sort',
            'Reuniors\Knk\Http\Controllers\Api\V1\FoodAddonGroupsApiController@multiSort'
        );
        Route::get(
            'restaurantMenu/{restaurantMenuId}/foodAddonGroup',
            'Reuniors\Knk\Http\Controllers\Api\V1\FoodAddonGroupsApiController@indexByRestaurantMenu'
        );
        // Food Addons Group roots
        Route::resource(
            'restaurantMenu.foodCategory.food.foodAddonGroup.foodAddon',
            Reuniors\Knk\Http\Controllers\Api\V1\FoodAddonsApiController::class
        );
        $foodCategoryUrlPart = 'restaurantMenu/{restaurantMenuId}/foodCategory/{foodCategoryId}';
        Route::post(
            $foodCategoryUrlPart . '/food/{foodId}/foodAddonGroup/{foodAddonGroupId}/foodAddon/sort',
            'Reuniors\Knk\Http\Controllers\Api\V1\FoodAddonsApiController@multiSort'
        );

        // FE App
        Route::get('locations/categories', GetCategories::class);

        Route::get('cities', GetCities::class);

        // User Login and Register
        Route::post('login', LoginAction::class);
        Route::post('register', RegisterAction::class);

        // Location actions
        Route::get('locations/list', GetLocationsAction::class);
        Route::get('locations/{location}', GetLocationAction::class);

        Route::group(['middleware' => [
            'api',
            UserFromBearerToken::class,
        ]], function () {
            Route::group(
                [],
                function () {
                    Route::resource(
                        'location.action',
                        ActionsApiController::class
                    );
                    Route::get('restaurantMenu/{restaurantMenuId}/action', ActionsApiController::class . '@indexByRestaurantMenu');
                    Route::post(
                        'location/{locationId}/actions/execute',
                        'Reuniors\Knk\Http\Controllers\Api\V1\ActionsApiController@executeActions'
                    );
                    Route::delete(
                        'location/{locationId}/actions',
                        'Reuniors\Knk\Http\Controllers\Api\V1\ActionsApiController@deleteActions'
                    );

                    // User Working Time
                    Route::post('user/work-log', WorkLogAction::class);
                    Route::get('user/work-log/list', WorkLogsListAction::class);

                    // Restaurant menu
                    Route::group(['prefix' => 'locations/restaurant-menu'], function () {
                        Route::post('list', GetRestaurantMenuListAction::class);
                        Route::post('create', CreateRestaurantMenuAction::class);
                    });

                    // Protected locations routes owners
                    Route::group([
                        'prefix' => 'locations/{location}',
                        'middleware' => ['userHasGroupsOrOwner:location,admin,worker']
                    ], function () {
                        // Protected location routes
                        Route::post('update', UpdateLocationDataAction::class);

                        // Images
                        Route::post('upload-images', UploadLocationImages::class);
                        Route::post('reorder-images', ReorderLocationImages::class);
                        Route::delete('delete-images', DeleteLocationImages::class);

                        // One image
                        Route::post('upload-image', UploadLocationImage::class);
                        Route::delete('delete-image', DeleteLocationImage::class);

                        // Restaurant menu
                        Route::group(['prefix' => 'restaurant-menu'], function () {
                            Route::group(['prefix' => '{id}'], function () {
                                Route::delete('delete', DeleteRestaurantMenuAction::class);

                                Route::post('relations-updated', RelationsUpdatedAction::class);

                                Route::post('activate', RestaurantMenuActivationAction::class);
                            });
                            Route::post('import-from-url', RestaurantMenuImportFromUrlAction::class);
                        });
                    });

                    Route::group(['middleware' => ['userHasGroups:admin,worker']], function () {
                        Route::post('restaurant-menu/{restaurantMenu}/food/{food}/upload-image', UploadFoodPhoto::class);

                        Route::post('questionnaire/create-location', CreateLocationFromQuestionnaire::class);
                    });
//                    Route::post('posts/create', AddProductAction::class);
//                    Route::post('posts/upload-image', UploadProductImageAction::class);
//                    Route::delete('posts/delete', RemoveProductAction::class);
//
//                    Route::post('posts/draft/create', CreateDraftProductAction::class);
//                    Route::delete('posts/draft/delete', RemoveDraftProductAction::class);
//                    Route::get('posts/draft', GetDraftProductAction::class);
//
//                    Route::post('posts/reorder-images', ReorderProductImagesAction ::class);
//                    Route::delete('posts/delete-images', RemoveProductImagesAction::class);

                }
            );
        });



//        Route::any('{any}', function () {
//            return response()->json(['message' => 'Not Found'], 404);
//        })->where('any', '.*');
    }
);



Route::get('/search-tags', function () {
    $tagsLimit = 10;
    $q = input('term');
    $filters = input('filters');
    $filters = $filters ? $filters : [];
    $filters = is_array($filters) ? $filters : [$filters];
    $q = $q ? $q : '';
    $citySlug = input('citySlug');
    $responseData = [];
    if (empty($filters) || in_array('tags', $filters)) {
        $tags = Tag::select('slug as id', 'title as text', 'slug')
            ->where('title', 'like', "%$q%")
            ->whereHas('tag_group', function ($query) {
                $query->where('slug', 'izdvojeno');
            })
            ->limit($tagsLimit)
            ->get();
        $responseData = $tags->toArray();
    }
    $countTags = count($responseData);
    if ($citySlug && $countTags < $tagsLimit && empty($filters) || in_array('categories', $filters)) {
        $controller = new Controller;
        $categories = Category::select('id', 'title as text', 'slug', DB::raw('1 as is_category'))
            ->where('title', 'like', "%$q%")
            ->limit($tagsLimit)
            ->orderByDesc('priority')
            ->get()
            ->each(function ($category) use ($controller, $citySlug) {
                $category->url = $controller->pageUrl('location/p20-locations-list', [
                    'citySlug' => $citySlug,
                    'categorySlug' => $category->slug,
                ]);
            });
        if ($categories->isNotEmpty()) {
            $responseData = array_merge(
                $responseData,
                $categories->toArray()
            );
            $countTags += $categories->count();
        }
    }
    if ($citySlug && $countTags < $tagsLimit && (empty($filters) || in_array('locations', $filters))) {
        Location::$overrideCitySlug = $citySlug;
        $locations = Location
            ::select('id', 'title as text', 'slug', DB::raw('1 as is_link'), 'city_id', 'main_category_id')
            ->with('main_category')
            ->with(['city', 'city.parent_city'])
            ->where('title', 'like', "%$q%")
            ->whereHas('city', function ($city) use ($citySlug) {
                $city
                    ->where('slug', 'like', $citySlug)
                    ->orWhereHas('parent_city', function ($parentCity) use ($citySlug) {
                        $parentCity->where('slug', 'like', $citySlug);
                    });
            })
            ->limit($tagsLimit - $countTags)
            ->get();
        if ($locations->isNotEmpty()) {
            $responseData = array_merge(
                $responseData,
                $locations->toArray()
            );
            $countTags += $locations->count();
        }
        Location::$overrideCitySlug = null;
    }
    if ($countTags < $tagsLimit && empty($filters) || in_array('tags', $filters)) {
        $loadedTagsSlugs = isset($tags) && $tags->isNotEmpty()
            ? $tags->pluck('slug')->toArray()
            : [];
        $otherTags = Tag::select('slug as id', 'title as text', 'slug')
            ->where('title', 'like', "%$q%")
            ->whereNotIn('slug', $loadedTagsSlugs)
            ->limit($tagsLimit)
            ->orderByDesc('priority')
            ->orderBy('number_of_words')
            ->get();
        if ($otherTags->isNotEmpty()) {
            $responseData = array_merge(
                $responseData,
                $otherTags->toArray()
            );
            $countTags += $otherTags->count();
        }
    }
    return response()->json([
        'items' => $responseData
    ]);
});

Route::get('/search-cities', function () {
    $q = input('q');
    $citiesQuery = RegionCity::select('slug as id', 'title as text', 'slug')
        ->where('active', 1)
        ->orderBy('sort_order');
    if (empty($q)) {
        $citiesQuery->where('parent_city_id', null);
    } else {
        $citiesQuery
            ->where('title', 'like', "%$q%")
            ->orWhereHas('parent_city', function ($parentCity) use ($q) {
                $parentCity->where('name', 'like', "%$q%");
            });
    }
    $cities = $citiesQuery->get();
    return response()->json([
        'items' => $cities->toArray()
    ]);
});

Route::get('/default', function () {
    $q = Request::getQueryString();
    $q = $q ? '?' . $q : '';
    return Redirect::to('/' . $q);
});

Route::post('/api/map', function () {
    $reqInput = input();
    $locations = Location::mapData($reqInput);
});

Route::group(['middleware' => 'web'], function () {
    Route::get('/get-admin-tutorial', function () {
        return File::get(storage_path() . '/app/admin-tutorial.html');
    })->middleware('RainLab\User\Classes\AuthMiddleware');
    // Legacy route removed - DataMigrationsController no longer exists
    // Route::post('/other-source-migrations', 'Reuniors\Knk\Http\Controllers\DataMigrationsController@index')
    //     ->middleware('RainLab\User\Classes\AuthMiddleware');
});


Route::get('{lang?}/labels.json', function ($lang) {
    $query = Message::orderBy('code', 'asc');
    $defaultLangKey = 'x';
    $allMessages = $query->get();
    $responseData = [];
    foreach ($allMessages as $message) {
        $messageData = $message['message_data'];
        $responseData[$messageData[$defaultLangKey]] = isset($messageData[$lang])
            ? $messageData[$lang]
            : $messageData[$defaultLangKey];
    }
    return Response::json($responseData);
})->middleware('Reuniors\Knk\Middlewares\ETagMiddleware');

Route::get('resizer/{identifier}/{encodedUrl}', function ($identifier, $encodedUrl) {
    $maxConcurrentRequests = 100;
    $lockKey = 'image_resizer_concurrent_count';
    $maxRetries = 10;
    $waitSeconds = 1;

    for ($i = 0; $i < $maxRetries; $i++) {
        $count = Cache::get($lockKey, 0);

        if ($count < $maxConcurrentRequests) {
            Cache::increment($lockKey);

            try {
                return app()->call(
                    'System\Classes\SystemController@resizer',
                    ['identifier' => $identifier, 'encodedUrl' => $encodedUrl]
                );
            } finally {
                Cache::decrement($lockKey);
            }
        } else {
            sleep($waitSeconds);
        }
    }

    $errorMessage = 'Too many concurrent image resizer requests. Try again shortly.';
    Log::warning($errorMessage);
    abort(429, $errorMessage);
});
