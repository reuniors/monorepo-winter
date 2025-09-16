<?php namespace Reuniors\Evodic;

use Illuminate\Support\Facades\Cache;
use Laravel\Sanctum\SanctumServiceProvider;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\SocialiteServiceProvider;
use Lorisleiva\Actions\ActionServiceProvider;
use System\Classes\PluginBase;
use App;

class Plugin extends PluginBase
{
    public $require = ['Winter.User', 'Reuniors.Base'];
    public function registerComponents()
    {
        return [
            'Reuniors\Evodic\Components\LocationDataComponent' => 'locationData'
        ];
    }

    public function registerSettings()
    {
    }

    public function register()
    {
        parent::register();
        App::register(SanctumServiceProvider::class);
        App::register(ActionServiceProvider::class);
        App::register(SocialiteServiceProvider::class);
        App::alias('Socialite', Socialite::class);
    }

    public function registerSchedule($schedule)
    {
        $schedule->command('cache:clear')->everyMinute()->when(function () {
            return Cache::has('scheduleCacheClear');
        });
    }
}
