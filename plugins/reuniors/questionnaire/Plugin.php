<?php namespace Reuniors\Questionnaire;

use Reuniors\Questionnaire\Http\Middleware\UserHasGroups;
use reuniors\questionnaire\Http\Middleware\UserHasGroupsOrOwnership;
use Stevebauman\Purify\PurifyServiceProvider;
use System\Classes\PluginBase;

class Plugin extends PluginBase
{
    public $require = ['Winter.User', 'Reuniors.WinterSocialite', 'Reuniors.Base'];

    public function registerComponents()
    {
    }

    public function registerSettings()
    {
    }

    public function register()
    {
        $this->app['router']->aliasMiddleware('userHasGroups', UserHasGroups::class);
        $this->app['router']->aliasMiddleware('userHasGroupsOrOwner', UserHasGroupsOrOwnership::class);

        $this->app->register(PurifyServiceProvider::class);
    }
}
