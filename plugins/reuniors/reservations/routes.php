<?php

require_once 'routesActions.php';

use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use mikp\sanctum\Http\Middleware\UserFromBearerToken;
use Reuniors\Reservations\Http\Actions\V1\Location\Clients\Notifications\LocationClientNotifications;
use Reuniors\Reservations\Http\Actions\V1\Location\Clients\LocationClientReservationsGetAction;
use Reuniors\Reservations\Http\Actions\V1\Location\Clients\LocationClientsGetAction;
use Reuniors\Reservations\Http\Actions\V1\Location\Clients\LocationClientUpdate;
use Reuniors\Reservations\Http\Actions\V1\Location\PromoCode\LocationPromoCodeFindOneAction;
use Reuniors\Reservations\Http\Actions\V1\Location\Reservations\LocationReservationCreateAction;
use Reuniors\Reservations\Http\Actions\V1\Location\Reservations\LocationReservationGetOneAction;
use Reuniors\Reservations\Http\Actions\V1\Location\Reservations\LocationReservationsGetAction;
use Reuniors\Reservations\Http\Actions\V1\Location\Reservations\LocationReservationUpdateAction;
use Reuniors\Reservations\Http\Actions\V1\Location\Services\Group\LocationServiceGroupsGet;
use Reuniors\Reservations\Http\Actions\V1\Location\Services\Group\ServiceGroupUpdateAction;
use Reuniors\Reservations\Http\Actions\V1\Location\Services\Group\ServiceGroupCreateAction;
use Reuniors\Reservations\Http\Actions\V1\Location\Services\Group\ServiceGroupDeleteAction;
use Reuniors\Reservations\Http\Actions\V1\Location\Workers\Services\LocationWorkerServicesGet;
use Reuniors\Reservations\Http\Actions\V1\Location\Workers\Services\LocationWorkerServicesStore;
use Reuniors\Reservations\Http\Actions\V1\Location\Workers\Services\LocationWorkerServicesUpdate;
use Reuniors\Reservations\Http\Actions\V1\Location\Workers\Services\LocationWorkerServicesDestroy;
use Reuniors\Reservations\Http\Actions\V1\Location\Workers\LocationWorkerGetOneAction;
use Reuniors\Reservations\Http\Actions\V1\Location\Workers\LocationWorkerAvatarUploadAction;
use Reuniors\Reservations\Http\Actions\V1\Location\Workers\LocationWorkerAvatarDeleteAction;
use Reuniors\Reservations\Http\Actions\V1\Location\Services\Service\ServiceUpdateAction;
use Reuniors\Reservations\Http\Actions\V1\Location\Services\Service\ServiceCreateAction;
use Reuniors\Reservations\Http\Actions\V1\Location\Services\Service\ServiceDeleteAction;
use Reuniors\Reservations\Http\Actions\V1\Location\Workers\Shifts\LocationWorkingShiftsAddDayShiftAction;
use Reuniors\Reservations\Http\Actions\V1\Location\Workers\Shifts\LocationWorkingShiftsByDayGetAction;
use Reuniors\Reservations\Http\Actions\V1\Location\Workers\LocationWorkersGetAction;
use Reuniors\Reservations\Http\Actions\V1\Location\Workers\LocationWorkerShiftsByDaysGetAction;
use Reuniors\Reservations\Http\Actions\V1\Location\Workers\LocationWorkerCreateAction;
use Reuniors\Reservations\Http\Actions\V1\Location\Workers\LocationWorkerUpdateAction;
use Reuniors\Reservations\Http\Actions\V1\Location\Workers\LocationWorkerDeleteAction;
use Reuniors\Reservations\Http\Actions\V1\Location\Workers\LocationWorkersGetAllAction;
use Reuniors\Reservations\Http\Actions\V1\Location\PromoCodes\LocationPromoCodesGetAllAction;
use Reuniors\Reservations\Http\Actions\V1\Location\PromoCodes\LocationPromoCodeCreateAction;
use Reuniors\Reservations\Http\Actions\V1\Location\PromoCodes\LocationPromoCodeUpdateAction;
use Reuniors\Reservations\Http\Actions\V1\Location\PromoCodes\LocationPromoCodeDeleteAction;
use Reuniors\Reservations\Http\Actions\V1\Location\LocationGetOneAction;
use Reuniors\Reservations\Http\Actions\V1\Translation\TranslationsGetAction;
use Reuniors\Reservations\Http\Actions\V1\Translation\TranslationsCreateAction;
use Reuniors\Reservations\Http\Actions\V1\Translation\TranslationsGetLanguagesAction;
use Reuniors\Reservations\Http\Actions\V1\Location\LocationSettingsUpdateAction;
use Reuniors\Reservations\Http\Actions\V1\Location\LocationUpdateAction;
use Reuniors\Reservations\Http\Actions\V1\Notification\NotificationUpdateAction;
use Reuniors\reservations\Http\Actions\V1\User\Client\UserClientDataGetOneAction;
use Reuniors\Reservations\Http\Actions\V1\User\Device\SendNotificationToDevicesAction;
use Reuniors\Reservations\Http\Actions\V1\User\AddConnectedDeviceAction;
use Reuniors\Reservations\Http\Actions\V1\User\RemoveConnectedDeviceAction;
use Reuniors\Reservations\Http\Actions\V1\User\UserListAction;
use Reuniors\WinterSocialite\Http\Middlewares\JsonMiddleware;
use Reuniors\Reservations\Http\Actions\V1\ChangeRequest\ChangeRequestExecuteAction;
use Reuniors\Reservations\Http\Actions\V1\ChangeRequest\ChangeRequestGetEntityAction;

Route::group(
    ['prefix' => 'api/v1/rzr', 'middleware' => [
        'bindings',
        'userLanguage',
        JsonMiddleware::class,
        EnsureFrontendRequestsAreStateful::class
    ]],
    function () {
        Route::group([
            'prefix' => 'locations',
        ], function () {
            Route::get('data', LocationGetOneAction::class);
            Route::get('services-groups', LocationServiceGroupsGet::class);
            Route::get('working-shifts-days', LocationWorkingShiftsByDayGetAction::class);
            Route::get('clients', LocationClientsGetAction::class);
            Route::get('reservations', LocationReservationsGetAction::class);
            Route::post('service-groups/create', ServiceGroupCreateAction::class);
            Route::post('services/create', ServiceCreateAction::class);
            Route::delete('services/delete/{service}', ServiceDeleteAction::class);
            Route::delete('service-groups/delete/{serviceGroup}', ServiceGroupDeleteAction::class);

            Route::group(['middleware' => [
                'api',
                UserFromBearerToken::class,
            ]], function () {
                Route::group([
                    'middleware' => [
                        'userHasGroups:admin,worker,owner',
                    ],
                ], function () {
                    Route::post('set-working-day-shift', LocationWorkingShiftsAddDayShiftAction::class);
                    Route::post('notification/send-to-devices', SendNotificationToDevicesAction::class);
                    Route::put('settings', LocationSettingsUpdateAction::class);
                    Route::put('update', LocationUpdateAction::class);
                    Route::put('service-groups/update', ServiceGroupUpdateAction::class);
                    Route::put('services/update', ServiceUpdateAction::class);
                });

                Route::group([
                    'prefix' => 'reservations',
                ], function () {
                    Route::post('create-new', LocationReservationCreateAction::class);
                    Route::get('get-one', LocationReservationGetOneAction::class);
                    Route::put('update', LocationReservationUpdateAction::class);
                    Route::get('client', LocationClientReservationsGetAction::class);
                });
                Route::group([
                    'prefix' => 'promo-codes'
                ], function () {
                    Route::get('find', LocationPromoCodeFindOneAction::class);
                });
            });

            Route::group([
'prefix' => 'workers',
            ], function () {
                Route::get('', LocationWorkersGetAction::class);
                Route::get('shifts-by-days', LocationWorkerShiftsByDaysGetAction::class);
                Route::post('create', LocationWorkerCreateAction::class);
                Route::post('update', LocationWorkerUpdateAction::class);
                Route::post('delete', LocationWorkerDeleteAction::class);
                Route::get('all', LocationWorkersGetAllAction::class);
            });

            Route::group([
                'prefix' => 'worker/{worker}',
            ], function () {
                Route::get('', LocationWorkerGetOneAction::class);
            
                // Worker avatar routes
                Route::group([
                    'prefix' => 'avatar',
                ], function () {
                    Route::post('', LocationWorkerAvatarUploadAction::class);
                    Route::delete('', LocationWorkerAvatarDeleteAction::class);
                });
                
                // Worker-Service management routes
                Route::group([
                    'prefix' => 'services',
                ], function () {
                    Route::get('', LocationWorkerServicesGet::class);
                    Route::post('', LocationWorkerServicesStore::class);
                    Route::put('{service}', LocationWorkerServicesUpdate::class);
                    Route::delete('{service}', LocationWorkerServicesDestroy::class);
                });
            });

            Route::group([
                'prefix' => 'promo-codes',
            ], function () {
                Route::get('all', LocationPromoCodesGetAllAction::class);
                Route::post('create', LocationPromoCodeCreateAction::class);
                Route::post('update', LocationPromoCodeUpdateAction::class);
                Route::post('delete', LocationPromoCodeDeleteAction::class);
            });
        });

        // Translation routes
        Route::group([
            'prefix' => 'translations',
            'middleware' => [
                'api',
                UserFromBearerToken::class,
                'userHasGroups:admin,worker,owner',
            ],
        ], function () {
            Route::get('languages', TranslationsGetLanguagesAction::class);
            Route::get('', TranslationsGetAction::class);
            Route::post('', TranslationsCreateAction::class);
        });

        // Change request routes
        Route::group([
            'prefix' => 'change-requests',
            'middleware' => [
                'api',
                UserFromBearerToken::class,
                'userHasGroups:admin,owner',
            ],
        ], function () {
            Route::post('execute', ChangeRequestExecuteAction::class);
            Route::get('get-entity', ChangeRequestGetEntityAction::class);
        });

        Route::group(['middleware' => [
            'api',
            UserFromBearerToken::class,
        ]], function () {
            Route::post('notification/update-status', NotificationUpdateAction::class);

            Route::group([
                'prefix' => 'users',
            ], function () {
                Route::get('client-data', UserClientDataGetOneAction::class);
                Route::post('client', LocationClientUpdate::class);
                Route::get('notifications', LocationClientNotifications::class);
                Route::get('list', UserListAction::class);

                Route::group([
                    'prefix' => 'connected-devices',
                ], function () {
                    Route::post('', AddConnectedDeviceAction::class);
                    Route::delete('', RemoveConnectedDeviceAction::class);
                });
            });
        });
    }
);
