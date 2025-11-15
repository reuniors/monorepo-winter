<?php namespace Reuniors\Base\Console;

use File;
use Config;
use Illuminate\Console\Command;
use System\Helpers\Cache;

/**
 * Clear Storage Command
 * 
 * Clears all cached data from a specific application's storage directory,
 * effectively resetting the application to its initial state.
 * 
 * This command clears:
 * - Framework cache, sessions, views, and testing files
 * - CMS cache, combiner, and Twig cache
 * - Application logs
 * - Compiled config, routes, and views
 * 
 * Usage: php artisan reuniors:clear-storage {app}
 * Example: php artisan reuniors:clear-storage rzr
 */
class ClearStorageCommand extends Command
{
    /**
     * @var string The console command name.
     */
    protected $name = 'reuniors:clear-storage';

    /**
     * @var string The console command signature.
     */
    protected $signature = 'reuniors:clear-storage 
                            {app : The application name (e.g., rzr, bot, knk)}';

    /**
     * @var string The console command description.
     */
    protected $description = 'Clear all cached data from a specific application\'s storage directory (cache, sessions, views, logs, etc.)';

    /**
     * @var string The application directory path
     */
    protected $appPath;

    /**
     * @var string The storage directory path for the application
     */
    protected $storagePath;

    /**
     * Execute the console command.
     * @return void
     */
    public function handle()
    {
        $appName = $this->argument('app');
        
        if (empty($appName)) {
            $this->error('Application name is required.');
            $this->info('Usage: php artisan reuniors:clear-storage {app}');
            $this->info('Example: php artisan reuniors:clear-storage rzr');
            return 1;
        }

        // Determine paths
        $monorepoRoot = base_path();
        $this->appPath = $monorepoRoot . '/apps/' . $appName;
        $this->storagePath = $this->appPath . '/storage';

        // Validate that app directory exists
        if (!File::isDirectory($this->appPath)) {
            $this->error("Application directory does not exist: {$this->appPath}");
            return 1;
        }

        // Validate that storage directory exists
        if (!File::isDirectory($this->storagePath)) {
            $this->error("Storage directory does not exist: {$this->storagePath}");
            return 1;
        }

        if (!$this->confirm("This will clear all cached data from storage for '{$appName}'. Continue?", true)) {
            $this->info('Operation cancelled.');
            return 0;
        }

        $this->info("🧹 Clearing storage for application: {$appName}");
        $this->info("📁 Storage path: {$this->storagePath}");
        $this->newLine();

        // Framework directories
        $this->clearDirectory('framework/cache', 'Framework cache', true);
        $this->clearDirectory('framework/sessions', 'Framework sessions', true);
        $this->clearDirectory('framework/views', 'Framework views', true);
        
        // CMS directories
        $this->clearDirectory('cms/cache', 'CMS cache', true);
        $this->clearDirectory('cms/combiner', 'CMS combiner', true);
        $this->clearDirectory('cms/twig', 'CMS Twig cache', true);
        
        // Logs
        $this->clearDirectory('logs', 'Application logs', true);
        
        // App directories (keep media, uploads, resized structure but clear contents)
        if (File::isDirectory($this->storagePath . '/app')) {
            $this->clearDirectory('app/media', 'App media', true);
            $this->clearDirectory('app/resized', 'App resized', true);
            $this->clearDirectory('app/uploads', 'App uploads', true);
            $this->clearDirectory('app/public', 'App public', true);
        }
        
        // Temp directories
        if (File::isDirectory($this->storagePath . '/temp')) {
            $this->clearDirectory('temp/public', 'Temp public', true);
            $this->clearDirectory('temp/resizer', 'Temp resizer', true);
        }

        $this->newLine();
        $this->info('✅ Storage cleared successfully!');
        $this->info('   Application has been reset to initial state.');
    }


    /**
     * Clear a directory in storage, keeping .gitignore files
     * 
     * @param string $path Relative path from storage/
     * @param string $label Label for output
     * @param bool $keepGitignore Whether to keep .gitignore files
     */
    protected function clearDirectory($path, $label, $keepGitignore = false)
    {
        $fullPath = $this->storagePath . '/' . $path;
        
        if (!File::isDirectory($fullPath)) {
            $this->line("  ⊘ {$label}: Directory does not exist");
            return;
        }

        $count = 0;
        $gitignorePath = $fullPath . '/.gitignore';
        $hasGitignore = File::isFile($gitignorePath);
        $gitignoreContent = $hasGitignore ? File::get($gitignorePath) : null;

        // Get all files and directories
        $items = File::allFiles($fullPath);
        $directories = File::directories($fullPath);

        // Delete files (except .gitignore if we want to keep it)
        foreach ($items as $file) {
            $filePath = $file->getPathname();
            if ($keepGitignore && basename($filePath) === '.gitignore') {
                continue;
            }
            File::delete($filePath);
            $count++;
        }

        // Delete directories
        foreach ($directories as $directory) {
            File::deleteDirectory($directory);
            $count++;
        }

        // Restore .gitignore if we kept it
        if ($keepGitignore && $hasGitignore && $gitignoreContent) {
            File::put($gitignorePath, $gitignoreContent);
        }

        if ($count > 0) {
            $this->info("  ✓ {$label}: Removed {$count} item(s)");
        } else {
            $this->line("  ⊘ {$label}: Already empty");
        }
    }
}

