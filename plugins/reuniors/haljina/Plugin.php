<?php namespace Reuniors\Haljina;

use Laravel\Sanctum\SanctumServiceProvider;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\SocialiteServiceProvider;
use Lorisleiva\Actions\ActionServiceProvider;
use Reuniors\Haljina\Jobs\GenerateCategoriesJson;
use System\Classes\PluginBase;
use App;

class Plugin extends PluginBase
{
    public $require = ['Winter.User'];

    public function registerComponents()
    {
    }

    public function registerSettings()
    {
    }

    public function register()
    {
        parent::register();
        $this->app->register(SanctumServiceProvider::class);
        $this->app->register(ActionServiceProvider::class);
        $this->app->register(SocialiteServiceProvider::class);
        $this->registerConsoleCommand('haljina.importsample', 'Reuniors\Haljina\Console\ImportSample');
        $this->app->alias('Socialite', Socialite::class);
    }

    public function registerSchedule($schedule)
    {
        $schedule->job(new GenerateCategoriesJson())->everyMinute();
    }
}
