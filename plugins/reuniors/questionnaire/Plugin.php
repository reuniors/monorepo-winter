<?php namespace Reuniors\Questionnaire;

use Backend;
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

    public function registerNavigation()
    {
        return [
            'questionnaire' => [
                'label' => 'Questionnaire',
                'url' => Backend::url('reuniors/questionnaire/questionnaireregistrations'),
                'icon' => 'icon-list-alt',
                'permissions' => ['reuniors.questionnaire.*'],
                'order' => 500,
                
                'sideMenu' => [
                    'registrations' => [
                        'label' => 'Registrations',
                        'icon' => 'icon-file-text',
                        'url' => Backend::url('reuniors/questionnaire/questionnaireregistrations'),
                        'permissions' => ['reuniors.questionnaire.access_registrations'],
                    ],
                    'wizards' => [
                        'label' => 'Wizard Management',
                        'icon' => 'icon-magic',
                        'url' => Backend::url('reuniors/questionnaire/wizarddefinitions'),
                        'permissions' => ['reuniors.questionnaire.access_wizards'],
                    ],
                ],
            ],
        ];
    }

    public function registerPermissions()
    {
        return [
            'reuniors.questionnaire.access_registrations' => [
                'label' => 'Access Questionnaire Registrations',
                'tab' => 'Questionnaire',
            ],
            'reuniors.questionnaire.access_wizards' => [
                'label' => 'Access Wizard Management',
                'tab' => 'Questionnaire',
            ],
            'reuniors.questionnaire.create_wizards' => [
                'label' => 'Create Wizards',
                'tab' => 'Questionnaire',
            ],
            'reuniors.questionnaire.edit_wizards' => [
                'label' => 'Edit Wizards',
                'tab' => 'Questionnaire',
            ],
            'reuniors.questionnaire.delete_wizards' => [
                'label' => 'Delete Wizards',
                'tab' => 'Questionnaire',
            ],
        ];
    }

    public function register()
    {
        $this->app['router']->aliasMiddleware('userHasGroups', UserHasGroups::class);
        $this->app['router']->aliasMiddleware('userHasGroupsOrOwner', UserHasGroupsOrOwnership::class);

        $this->app->register(PurifyServiceProvider::class);
    }
}
