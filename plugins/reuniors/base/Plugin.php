<?php namespace Reuniors\Base;

use System\Classes\PluginBase;

class Plugin extends PluginBase
{
    public function registerComponents()
    {
    }

    public function registerSettings()
    {
    }

    public function register()
    {
        // Register shared helper classes
        $this->app->singleton('reuniors.base.helpers.reorder', function () {
            return new \Reuniors\Base\Classes\Helpers\ReorderDataHelper();
        });

        $this->app->singleton('reuniors.base.helpers.language', function () {
            return new \Reuniors\Base\Classes\Helpers\LanguageHelpers();
        });
    }
}
