<?php namespace Reuniors\Base\Console;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class CreateApplicationCommand extends Command
{
    protected $signature = 'reuniors:create-application 
                            {shortname : Short name of the application (rzr, knk, evodic, etc.)}';

    protected $description = 'Create a new application folder with symlinks to monorepo';

    public function handle()
    {
        $shortname = $this->argument('shortname');
        
        if (empty($shortname)) {
            $this->error('Shortname parameter is required');
            $this->info('Usage: php artisan reuniors:create-application <shortname>');
            $this->info('Example: php artisan reuniors:create-application rzr');
            return 1;
        }

        $this->info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        $this->info("📦 Creating Application: {$shortname}");
        $this->info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        // Get paths
        $monorepoDir = base_path();
        $baseAppDir = $monorepoDir . '/apps/base';
        $appDir = $monorepoDir . '/apps/' . $shortname;
        
        $this->info("📁 Monorepo: {$monorepoDir}");
        $this->info("📁 Base app: {$baseAppDir}");
        $this->info("📁 New app folder: {$appDir}");
        $this->newLine();

        // Check if base app exists
        if (!is_dir($baseAppDir)) {
            $this->error("❌ Base app folder not found: {$baseAppDir}");
            $this->info('💡 Please ensure apps/base exists with all required files');
            return 1;
        }

        // Check if app folder exists
        if (is_dir($appDir)) {
            if (!$this->confirm("⚠️  Folder {$appDir} already exists. Overwrite?", false)) {
                $this->info('❌ Operation cancelled');
                return 1;
            }
            $this->warn("⚠️  Removing existing folder: {$appDir}");
            File::deleteDirectory($appDir);
        }

        // Copy base app to new app
        $this->copyBaseApp($baseAppDir, $appDir);

        // Generate .env file from .env.example
        $this->generateEnvFile($appDir, $shortname);

        // Verify symlinks
        $this->verifySymlinks($appDir);

        // Final summary
        $this->showSummary($appDir);

        return 0;
    }

    protected function copyBaseApp($baseAppDir, $appDir)
    {
        $this->info('📋 Copying base app to new app...');
        
        // Copy entire directory recursively, excluding symlinks
        $this->copyDirectory($baseAppDir, $appDir);
        
        $this->info('✅ Base app copied successfully');
        $this->newLine();
    }

    protected function copyDirectory($source, $destination)
    {
        if (!is_dir($destination)) {
            File::makeDirectory($destination, 0755, true);
        }

        $iterator = new \RecursiveIteratorIterator(
            new \RecursiveDirectoryIterator($source, \RecursiveDirectoryIterator::SKIP_DOTS),
            \RecursiveIteratorIterator::SELF_FIRST
        );

        foreach ($iterator as $item) {
            $target = $destination . DIRECTORY_SEPARATOR . $iterator->getSubPathName();
            
            // Skip symlinks - they will be recreated
            if (is_link($item)) {
                continue;
            }
            
            if ($item->isDir()) {
                if (!is_dir($target)) {
                    File::makeDirectory($target, 0755, true);
                }
            } else {
                File::copy($item, $target);
            }
        }
    }

    protected function generateEnvFile($appDir, $shortname)
    {
        $this->info('📄 Generating .env file from .env.example...');

        $envExample = $appDir . '/.env.example';
        $envTarget = $appDir . '/.env';

        if (!file_exists($envExample)) {
            $this->error("⚠️  .env.example file not found in {$appDir}!");
            return;
        }

        if (file_exists($envTarget)) {
            if (!$this->confirm('⚠️  .env file already exists. Overwrite?', false)) {
                $this->line('✓  Keeping existing .env file');
                $this->newLine();
                return;
            }
        }

        // Copy .env.example to .env
        File::copy($envExample, $envTarget);
        
        // Ask for database credentials
        $this->newLine();
        $this->info('🔐 Database Configuration');
        $this->line('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        $dbHost = $this->ask('Database Host', 'localhost');
        $dbPort = $this->ask('Database Port', '3306');
        $dbDatabase = $this->ask('Database Name', $shortname . '_db');
        $dbUsername = $this->ask('Database Username', $shortname . '_user');
        $dbPassword = $this->secret('Database Password', '');

        // Ask for app URL
        $this->newLine();
        $appUrl = $this->ask('Application URL', 'https://' . $shortname . '.rs');

        // Read .env content and update values
        $content = file_get_contents($envTarget);
        
        // Update database configuration
        $content = preg_replace('/^DB_HOST=.*/m', "DB_HOST={$dbHost}", $content);
        $content = preg_replace('/^DB_PORT=.*/m', "DB_PORT={$dbPort}", $content);
        $content = preg_replace('/^DB_DATABASE=.*/m', "DB_DATABASE={$dbDatabase}", $content);
        $content = preg_replace('/^DB_USERNAME=.*/m', "DB_USERNAME={$dbUsername}", $content);
        $content = preg_replace('/^DB_PASSWORD=.*/m', "DB_PASSWORD={$dbPassword}", $content);
        
        // Update app URL
        $content = preg_replace('/^APP_URL=.*/m', "APP_URL=\"{$appUrl}\"", $content);
        
        // Write updated .env file
        file_put_contents($envTarget, $content);
        $this->info('✅ .env file generated successfully');
        $this->newLine();
    }

    protected function verifySymlinks($appDir)
    {
        $this->info('🔗 Verifying symlinks...');

        $monorepoDir = base_path();
        $symlinks = [
            'modules' => $monorepoDir . '/modules',
            'plugins' => $monorepoDir . '/plugins',
            'themes' => $monorepoDir . '/themes',
        ];

        foreach ($symlinks as $name => $target) {
            $linkPath = $appDir . '/' . $name;
            
            if (is_link($linkPath)) {
                $linkTarget = readlink($linkPath);
                $expectedRelative = '../../' . $name;
                $resolvedTarget = realpath(dirname($linkPath) . '/' . $linkTarget);
                $resolvedSource = realpath($target);
                
                if ($resolvedTarget !== $resolvedSource && $linkTarget !== $expectedRelative) {
                    $this->warn("⚠️  Fixing incorrect symlink: {$name}");
                    unlink($linkPath);
                    $this->createSymlink($target, $linkPath);
                    $this->info("✅ Fixed symlink: {$name}");
                } else {
                    $this->line("✓  Symlink already exists: {$name}");
                }
            } elseif (file_exists($linkPath)) {
                $this->warn("⚠️  {$name} exists but is not a symlink, removing and creating symlink...");
                if (is_dir($linkPath)) {
                    File::deleteDirectory($linkPath);
                } else {
                    File::delete($linkPath);
                }
                $this->createSymlink($target, $linkPath);
                $this->info("✅ Created symlink: {$name}");
            } else {
                $this->createSymlink($target, $linkPath);
                $this->info("✅ Created symlink: {$name}");
            }
        }

        $this->newLine();
    }

    protected function createSymlink($target, $link)
    {
        if (PHP_OS_FAMILY === 'Windows') {
            // Windows uses junction or mklink
            // Determine if target is file or directory
            $isDir = is_dir($target);
            $command = $isDir ? 'mklink /D' : 'mklink';
            $this->execCommand("{$command} \"{$link}\" \"{$target}\"");
        } else {
            // Unix/Linux/Mac - use relative path for better portability
            $linkDir = dirname($link);
            $targetRelative = $this->getRelativePath($linkDir, $target);
            
            // Change to link directory and create symlink
            $originalDir = getcwd();
            chdir($linkDir);
            symlink($targetRelative, basename($link));
            chdir($originalDir);
        }
    }

    protected function getRelativePath($from, $to)
    {
        $from = realpath($from);
        $to = realpath($to);
        
        $fromParts = explode(DIRECTORY_SEPARATOR, $from);
        $toParts = explode(DIRECTORY_SEPARATOR, $to);
        
        // Find common path
        $commonLength = 0;
        $minLength = min(count($fromParts), count($toParts));
        
        for ($i = 0; $i < $minLength; $i++) {
            if ($fromParts[$i] === $toParts[$i]) {
                $commonLength++;
            } else {
                break;
            }
        }
        
        // Calculate relative path
        $upLevels = count($fromParts) - $commonLength;
        $relativeParts = array_merge(
            array_fill(0, $upLevels, '..'),
            array_slice($toParts, $commonLength)
        );
        
        return implode(DIRECTORY_SEPARATOR, $relativeParts);
    }

    protected function execCommand($command)
    {
        exec($command . ' 2>&1', $output, $returnVar);
        if ($returnVar !== 0) {
            $this->warn('Command failed: ' . $command);
            if (!empty($output)) {
                $this->warn('Output: ' . implode("\n", $output));
            }
        }
        return $returnVar === 0;
    }

    protected function showSummary($appDir)
    {
        $this->info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        $this->info('📊 Setup Summary');
        $this->info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        $this->newLine();

        $missingItems = [];

        // Check required items
        if (!is_dir($appDir . '/storage')) {
            $missingItems[] = 'storage/';
        }

        if (!file_exists($appDir . '/.env')) {
            $missingItems[] = '.env';
        }

        if (!file_exists($appDir . '/.htaccess')) {
            $missingItems[] = '.htaccess';
        }

        // Check critical symlinks
        $criticalSymlinks = ['modules', 'plugins', 'themes'];
        foreach ($criticalSymlinks as $symlink) {
            if (!is_link($appDir . '/' . $symlink)) {
                $missingItems[] = $symlink . '/ (symlink)';
            }
        }
        
        // Check required files
        if (!file_exists($appDir . '/bootstrap-app.php')) {
            $missingItems[] = 'bootstrap-app.php';
        }
        
        if (!file_exists($appDir . '/index.php')) {
            $missingItems[] = 'index.php';
        }
        
        if (!file_exists($appDir . '/artisan')) {
            $missingItems[] = 'artisan';
        }

        if (empty($missingItems)) {
            $this->info('✅ All required items are in place!');
            $this->newLine();
            $this->info("📁 Application folder: {$appDir}");
            $this->newLine();
            $this->info('🌐 Next steps:');
            $this->line('   1. Edit .env file: ' . $appDir . '/.env');
            $this->line('   2. Run: cd ' . $appDir . ' && php artisan key:generate');
            $this->line('   3. Run: cd ' . $appDir . ' && php artisan migrate');
            $this->line('   4. Test with: cd ' . $appDir . ' && php artisan serve');
            $this->newLine();
            $this->info('✅ Setup complete!');
        } else {
            $this->warn('⚠️  Some items are missing:');
            foreach ($missingItems as $item) {
                $this->line("   - {$item}");
            }
            $this->newLine();
            $this->comment('💡 Please check the errors above');
            return 1;
        }

        return 0;
    }
}
