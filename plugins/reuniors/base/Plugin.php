<?php namespace Reuniors\Base;

use System\Classes\PluginBase;
use Illuminate\Contracts\Debug\ExceptionHandler;

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
        // Register middleware
        $this->app['router']->aliasMiddleware(
            'userFromBearerTokenOptional',
            \Reuniors\Base\Http\Middlewares\UserFromBearerTokenOptional::class
        );

        // Register shared helper classes
        $this->app->singleton('reuniors.base.helpers.reorder', function () {
            return new \Reuniors\Base\Classes\Helpers\ReorderDataHelper();
        });

        $this->app->singleton('reuniors.base.helpers.language', function () {
            return new \Reuniors\Base\Classes\Helpers\LanguageHelpers();
        });

        // Register custom error handler
        $this->app->bind(
            ExceptionHandler::class,
            \Reuniors\Base\Classes\CustomHandler::class
        );

        // Register console commands
        $this->registerConsoleCommand('reuniors.copy-data', 'Reuniors\Base\Console\CopyDataFromPlugins');
        $this->registerConsoleCommand('reuniors.migrate-table', 'Reuniors\Base\Console\GenericTableMigrator');
        $this->registerConsoleCommand('reuniors.run-migrations', 'Reuniors\Base\Console\RunMigrations');
        $this->registerConsoleCommand('reuniors.convert-to-utc', 'Reuniors\Base\Console\ConvertToUtcCommand');
        $this->registerConsoleCommand('reuniors:create-application', 'Reuniors\Base\Console\CreateApplicationCommand');
        $this->registerConsoleCommand('reuniors:clear-storage', 'Reuniors\Base\Console\ClearStorageCommand');
        $this->registerConsoleCommand('reuniors:migrate-connected-devices', 'Reuniors\Base\Console\MigrateConnectedDevicesCommand');
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
