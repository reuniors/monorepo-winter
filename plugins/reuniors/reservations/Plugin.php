<?php
namespace Reuniors\Reservations;

use Kreait\Laravel\Firebase\ServiceProvider;
use Reuniors\Reservations\Http\Actions\V1\Location\Reservations\LocationReservationPendingStatusAction;
use Reuniors\Reservations\Http\Actions\V1\User\Mail\SendGoogleReviewEmailAction;
use Reuniors\Reservations\Http\Actions\V1\User\Mail\SendPromoCodeToMailAction;
use System\Classes\PluginBase;

class Plugin extends PluginBase
{
    public $require = ['Winter.User', 'Reuniors.WinterSocialite', 'Reuniors.Base'];

    public function registerComponents()
    {
        return [
            'Reuniors\Reservations\Components\LocationComponent' => 'locationComponent',
            'Reuniors\Reservations\Components\LocationsComponent' => 'locationsComponent'
        ];
    }

    public function registerSettings() {}

    public function registerFormWidgets()
    {
        return [
            'Reuniors\Reservations\FormWidgets\ArrayOfStrings' => 'arrayofstrings'  // Register the custom form widget
        ];
    }

    public function register()
    {
        $this->app->register(ServiceProvider::class);
        
        // Register AdminOnly middleware
        $this->app['router']->aliasMiddleware(
            'adminOnly',
            \Reuniors\Reservations\Http\Middleware\AdminOnly::class
        );
        
        parent::register();
    }

    public function registerSchedule($schedule)
    {
        $schedule->job(LocationReservationPendingStatusAction::class)->everyMinute();
        $schedule
            ->job(SendPromoCodeToMailAction::class)
            ->yearlyOn(11, 19, '21:50')
            ->timezone('Europe/Belgrade');
        $schedule
            ->job(SendGoogleReviewEmailAction::class)
            ->yearlyOn(3, 20, '17:00')
            ->timezone('Europe/Belgrade');

        // Daily change request execution at 2:00 AM
        $schedule
            ->job(\Reuniors\Reservations\Http\Actions\V1\ChangeRequest\ChangeRequestScheduledExecuteAction::class)
            ->dailyAt('02:00')
            ->timezone('Europe/Belgrade');

        // Daily cleanup of unverified users at 3:00 AM
        $schedule
            ->job(\Reuniors\Reservations\Http\Actions\V1\User\CleanupUnverifiedUsersAction::class)
            ->dailyAt('03:00')
            ->timezone('Europe/Belgrade');
    }

    public function boot()
    {
        // Register Reservations plugin entity types for translations
        \Reuniors\Base\Classes\TranslationEntityRegistry::registerMany([
            'service' => 'Reuniors\Reservations\Models\Service',
            'service_group' => 'Reuniors\Reservations\Models\ServiceGroup',
            'location' => 'Reuniors\Reservations\Models\Location',
            'location_worker' => 'Reuniors\Reservations\Models\LocationWorker',
            'news' => 'Reuniors\Reservations\Models\News',
        ]);

        // Register image action types for reservations plugin
        \Reuniors\Base\Classes\ImageActionRegistry::registerMany([
            'location' => [
                'modelClass' => 'Reuniors\Reservations\Models\Location',
                'appName' => 'rzr',
                'attachments' => [
                    'logo' => ['relation' => 'attachOne', 'multi' => false],
                    'cover' => ['relation' => 'attachOne', 'multi' => false],
                    'gallery' => ['relation' => 'attachMany', 'multi' => true],
                    'pwa_icon' => ['relation' => 'attachOne', 'multi' => false],
                ],
            ],
            'location_worker' => [
                'modelClass' => 'Reuniors\Reservations\Models\LocationWorker',
                'appName' => 'rzr',
                'attachments' => [
                    'avatar' => ['relation' => 'attachOne', 'multi' => false],
                    'gallery' => ['relation' => 'attachMany', 'multi' => true],
                    'certificates_photos' => ['relation' => 'attachMany', 'multi' => true],
                ],
            ],
        ]);

        // Register event listeners
        \Event::listen(
            \Reuniors\Base\Events\PingCheckRequested::class,
            \Reuniors\Reservations\Listeners\PingCheckListener::class
        );

        // Register Google Calendar sync listener (automatic sync to Google Calendar)
        // \Event::subscribe(\Reuniors\Reservations\Classes\Listeners\GoogleCalendarSyncListener::class);

        // Register console command for change requests
        if ($this->app->runningInConsole()) {
            $this->commands([
                \Reuniors\Reservations\Console\ExecuteChangeRequests::class
            ]);
        }
        
        // Listen to event to filter user groups by location
        \Event::listen('winter.user.groups.before.send', function ($user) {
            // Try to get locationSlug from env variable for local testing, otherwise from request
            $locationSlug = env('BACKUP_LOCATION') ?: null;
            
            // Filter groups by location
            $filteredGroups = \Reuniors\Reservations\Classes\FilterUserGroupsByLocation::filter(
                $user,
                $user->groups,
                $locationSlug // Will fallback to request if null
            );
            
            // Update user groups collection
            $user->setRelation('groups', $filteredGroups);
        });
    }
}
