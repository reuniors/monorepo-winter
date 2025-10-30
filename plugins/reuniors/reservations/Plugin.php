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

        // Register event listeners
        \Event::listen(
            \Reuniors\Base\Events\PingCheckRequested::class,
            \Reuniors\Reservations\Listeners\PingCheckListener::class
        );
        
        // Register console command for change requests
        if ($this->app->runningInConsole()) {
            $this->commands([
                \Reuniors\Reservations\Console\ExecuteChangeRequests::class
            ]);
        }
    }
}
