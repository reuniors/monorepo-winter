<?php

use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use mikp\sanctum\http\middleware\UserFromBearerToken;
use Reuniors\Haljina\Http\Actions\V1\Product\AddProductAction;
use Reuniors\Haljina\Http\Actions\V1\Product\Draft\CreateDraftProductAction;
use Reuniors\Haljina\Http\Actions\V1\Product\Draft\GetDraftProductAction;
use Reuniors\Haljina\Http\Actions\V1\Product\Draft\RemoveDraftProductAction;
use Reuniors\Haljina\Http\Actions\V1\Product\Draft\UpdateDraftProductAction;
use Reuniors\Haljina\Http\Actions\V1\Product\Images\RemoveProductImagesAction;
use Reuniors\Haljina\Http\Actions\V1\Product\Images\ReorderProductImagesAction;
use Reuniors\Haljina\Http\Actions\V1\Product\Images\UploadProductImageAction;
use Reuniors\Haljina\Http\Actions\V1\Product\profile\GetProfileProductsAction;
use Reuniors\Haljina\Http\Actions\V1\Product\RemoveProductAction;
use Reuniors\Haljina\Http\Actions\V1\ProductSize\GetProductSizes;
use Reuniors\Haljina\Http\Actions\V1\User\LoginAction;
use Reuniors\Haljina\Http\Actions\V1\User\RegisterAction;
use Reuniors\Haljina\Http\Middlewares\HasEditorRole;
use Reuniors\Haljina\Http\Middlewares\JsonMiddleware;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

Route::group(
    ['prefix' => 'api/v1/haljina', 'middleware' => [
        JsonMiddleware::class,
        EnsureFrontendRequestsAreStateful::class
    ]],
    function () {
        // public routes
        Route::post('login', LoginAction::class);
        Route::post('register', RegisterAction::class);

        // protected routes
        Route::group(['middleware' => [
            'api',
            UserFromBearerToken::class,
        ]], function () {
            Route::group(
                ['middleware' => [
                    HasEditorRole::class,
                ]],
                function () {
                    Route::post('product/create', AddProductAction::class);
                    Route::post('product/upload-image', UploadProductImageAction::class);
                    Route::delete('product/delete', RemoveProductAction::class);

                    Route::get('product/draft/get', CreateDraftProductAction::class);
                    Route::put('product/draft/update', UpdateDraftProductAction::class);
                    Route::delete('product/draft/delete', RemoveDraftProductAction::class);
                    Route::get('product/draft', GetDraftProductAction::class);

                    Route::post('product/reorder-images', ReorderProductImagesAction ::class);
                    Route::delete('product/delete-images', RemoveProductImagesAction::class);

                }
            );
        });

        Route::get('product/profile/{profileUsername}', GetProfileProductsAction::class);
        Route::get('product/sizes', GetProductSizes::class);

//        Route::any('{any}', function () {
//            throw new NotFoundHttpException('Not found!');
//        })->where('any', '.*');
    },
);
