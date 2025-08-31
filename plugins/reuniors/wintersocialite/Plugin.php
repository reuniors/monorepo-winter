<?php
namespace Reuniors\WinterSocialite;

use Laravel\Sanctum\SanctumServiceProvider;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\SocialiteServiceProvider;
use Lorisleiva\Actions\ActionServiceProvider;
use Reuniors\WinterSocialite\Http\Middlewares\UserHasGroups;
use Reuniors\WinterSocialite\Http\Middlewares\UserHasGroupsOrOwnership;
use Reuniors\WinterSocialite\Http\Middlewares\UserLanguageMiddleware;
use Stevebauman\Purify\PurifyServiceProvider;
use System\Classes\PluginBase;
use Winter\User\Models\User as UserModel;

class Plugin extends PluginBase
{
    public $require = ['Winter.User'];

    public function registerComponents() {}

    public function registerSettings() {}

    public function register()
    {
        parent::register();
        $this->app['router']->aliasMiddleware('userHasGroups', UserHasGroups::class);
        $this->app['router']->aliasMiddleware('userHasGroupsOrOwner', UserHasGroupsOrOwnership::class);
        $this->app['router']->aliasMiddleware('userLanguage', UserLanguageMiddleware::class);

        $this->app->register(PurifyServiceProvider::class);
        $this->app->register(SanctumServiceProvider::class);
        $this->app->register(ActionServiceProvider::class);
        $this->app->register(SocialiteServiceProvider::class);
        $this->app->alias('Socialite', Socialite::class);
    }

    public function boot()
    {
        parent::boot();

        UserModel::extend(function (UserModel $model) {
            $model->addFillable([
                'phone'
            ]);
        });
    }
}
