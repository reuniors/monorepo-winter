<?php namespace Reuniors\ThemeSwitcher;

use System\Classes\PluginBase;

/**
 * Theme Switcher Plugin
 * 
 * Provides a simple route to switch themes for development purposes.
 * Usage: /change-theme?theme={themeName}
 */
class Plugin extends PluginBase
{
    public function pluginDetails()
    {
        return [
            'name'        => 'Theme Switcher',
            'description' => 'Simple theme switching for development',
            'author'      => 'Dev',
            'icon'        => 'icon-paint-brush'
        ];
    }

    public function register()
    {
        // Register routes
        $this->registerRoutes();
    }

    public function registerRoutes()
    {
        // Routes are defined in routes.php
    }
}
