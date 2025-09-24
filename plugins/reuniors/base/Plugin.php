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

        // Register console commands
        $this->registerConsoleCommand('reuniors.copy-data', 'Reuniors\Base\Console\CopyDataFromPlugins');
        $this->registerConsoleCommand('reuniors.migrate-table', 'Reuniors\Base\Console\GenericTableMigrator');
        $this->registerConsoleCommand('reuniors.run-migrations', 'Reuniors\Base\Console\RunMigrations');
    }

    public function boot()
    {
        // Register base plugin entity types for translations
        \Reuniors\Base\Classes\TranslationEntityRegistry::registerMany([
            'country' => 'Reuniors\Base\Models\Country',
            'city' => 'Reuniors\Base\Models\City',
            'tag' => 'Reuniors\Base\Models\Tag',
            'tag_group' => 'Reuniors\Base\Models\TagGroup',
            'qa_question' => 'Reuniors\Base\Models\QaQuestion',
        ]);
    }
}
