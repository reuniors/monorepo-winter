<?php

namespace Reuniors\Rzr;

use Backend\Facades\Backend;
use Backend\Models\UserRole;
use System\Classes\PluginBase;

/**
 * rzr Plugin Information File
 */
class Plugin extends PluginBase
{
    /**
     * Returns information about this plugin.
     */
    public function pluginDetails(): array
    {
        return [
            'name'        => 'reuniors.rzr::lang.plugin.name',
            'description' => 'reuniors.rzr::lang.plugin.description',
            'author'      => 'Reuniors',
            'icon'        => 'icon-leaf'
        ];
    }

    /**
     * Register method, called when the plugin is first registered.
     */
    public function register(): void
    {

    }

    /**
     * Boot method, called right before the request route.
     */
    public function boot(): void
    {

    }

    /**
     * Registers any frontend components implemented in this plugin.
     */
    public function registerComponents(): array
    {
        return []; // Remove this line to activate

        return [
            \Reuniors\Rzr\Components\MyComponent::class => 'myComponent',
        ];
    }

    /**
     * Registers any backend permissions used by this plugin.
     */
    public function registerPermissions(): array
    {
        return []; // Remove this line to activate

        return [
            'reuniors.rzr.some_permission' => [
                'tab' => 'reuniors.rzr::lang.plugin.name',
                'label' => 'reuniors.rzr::lang.permissions.some_permission',
                'roles' => [UserRole::CODE_DEVELOPER, UserRole::CODE_PUBLISHER],
            ],
        ];
    }

    /**
     * Registers backend navigation items for this plugin.
     */
    public function registerNavigation(): array
    {
        return []; // Remove this line to activate

        return [
            'rzr' => [
                'label'       => 'reuniors.rzr::lang.plugin.name',
                'url'         => Backend::url('reuniors/rzr/mycontroller'),
                'icon'        => 'icon-leaf',
                'permissions' => ['reuniors.rzr.*'],
                'order'       => 500,
            ],
        ];
    }
}
