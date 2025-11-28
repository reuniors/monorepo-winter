<?php namespace Reuniors\Calendar;

use System\Classes\PluginBase;

class Plugin extends PluginBase
{
    public $require = ['Reuniors.Base', 'Reuniors.WinterSocialite'];

    public function registerComponents()
    {
    }

    public function registerSettings()
    {
    }

    public function boot()
    {
        // Register routes
        $this->loadRoutes();
    }

    protected function loadRoutes()
    {
        require __DIR__ . '/routes.php';
    }
}
