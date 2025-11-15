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
        $appDir = $monorepoDir . '/apps/' . $shortname;
        
        $this->info("📁 Monorepo: {$monorepoDir}");
        $this->info("📁 App folder: {$appDir}");
        $this->newLine();

        // Check if app folder exists
        if (is_dir($appDir)) {
            $this->warn("⚠️  Folder {$appDir} already exists");
            $this->info('🔍 Checking what\'s missing and updating...');
        } else {
            $this->info("✅ Creating folder: {$appDir}");
            File::makeDirectory($appDir, 0755, true);
        }

        // Create app/ folder for FE application
        $this->createAppFolder($appDir);

        // Create storage structure
        $this->createStorageStructure($appDir);

        // Generate .env file from template
        $this->generateEnvFile($monorepoDir, $appDir, $shortname);

        // Generate .htaccess file from template
        $this->generateHtaccessFile($monorepoDir, $appDir, $shortname);

        // Create symlinks
        $this->createSymlinks($monorepoDir, $appDir);

        // Final summary
        $this->showSummary($appDir);

        return 0;
    }

    protected function createStorageStructure($appDir)
    {
        $this->info('📦 Setting up storage...');

        $storageDir = $appDir . '/storage';

        if (!is_dir($storageDir)) {
            $this->info('✅ Creating storage structure...');
            
            $directories = [
                $storageDir . '/app/public',
                $storageDir . '/framework/cache',
                $storageDir . '/framework/sessions',
                $storageDir . '/framework/views',
                $storageDir . '/logs',
            ];

            foreach ($directories as $dir) {
                File::makeDirectory($dir, 0755, true);
            }

            // Set permissions (Unix only)
            if (PHP_OS_FAMILY !== 'Windows') {
                chmod($storageDir, 0775);
                $this->execCommand("chmod -R 775 {$storageDir}");
            }

            $this->info('✅ Storage structure created');
        } else {
            $this->line('✓  Storage folder already exists');
        }

        $this->newLine();
    }

    protected function createAppFolder($appDir)
    {
        $appFolder = $appDir . '/app';
        
        if (!is_dir($appFolder)) {
            $this->info('📁 Creating app/ folder for FE application...');
            File::makeDirectory($appFolder, 0755, true);
            $this->info('✅ app/ folder created');
        } else {
            $this->line('✓  app/ folder already exists');
        }
        
        $this->newLine();
    }

    protected function generateEnvFile($monorepoDir, $appDir, $shortname)
    {
        $this->info('📄 Generating .env file from template...');

        $envTemplate = $monorepoDir . '/.env.app';
        $envTarget = $appDir . '/.env';

        if (!file_exists($envTemplate)) {
            $this->error("⚠️  Template file .env.app not found!");
            $this->comment("💡 Please create .env.app template file in monorepo root");
            return;
        }

        if (file_exists($envTarget)) {
            if (!$this->confirm('⚠️  .env file already exists. Overwrite?', false)) {
                $this->line('✓  Keeping existing .env file');
                $this->newLine();
                return;
            }
        }

        // Read template
        $template = file_get_contents($envTemplate);

        // Ask for database credentials
        $this->newLine();
        $this->info('🔐 Database Configuration');
        $this->line('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        $dbHost = $this->ask('Database Host', 'localhost');
        $dbPort = $this->ask('Database Port', '3306');
        $dbDatabase = $this->ask('Database Name', $shortname . '_db');
        $dbUsername = $this->ask('Database Username', $shortname . '_user');
        $dbPassword = $this->secret('Database Password');

        // Ask for app URL
        $this->newLine();
        $appUrl = $this->ask('Application URL', 'https://' . $shortname . '.rs');

        // Replace placeholders
        $content = str_replace('{APP_NAME}', strtoupper($shortname), $template);
        $content = str_replace('{APP_URL}', $appUrl, $content);
        $content = str_replace('{DB_HOST}', $dbHost, $content);
        $content = str_replace('{DB_PORT}', $dbPort, $content);
        $content = str_replace('{DB_DATABASE}', $dbDatabase, $content);
        $content = str_replace('{DB_USERNAME}', $dbUsername, $content);
        $content = str_replace('{DB_PASSWORD}', $dbPassword, $content);

        // Write .env file
        file_put_contents($envTarget, $content);
        $this->info('✅ .env file generated successfully');
        $this->newLine();
    }

    protected function generateHtaccessFile($monorepoDir, $appDir, $shortname)
    {
        $this->info('📄 Generating .htaccess file from template...');

        $htaccessTemplate = $monorepoDir . '/.htaccess.app';
        $htaccessTarget = $appDir . '/.htaccess';

        if (!file_exists($htaccessTemplate)) {
            $this->error("⚠️  Template file .htaccess.app not found!");
            $this->comment("💡 Please create .htaccess.app template file in monorepo root");
            return;
        }

        if (file_exists($htaccessTarget)) {
            if (!$this->confirm('⚠️  .htaccess file already exists. Overwrite?', false)) {
                $this->line('✓  Keeping existing .htaccess file');
                $this->newLine();
                return;
            }
        }

        // Copy template (no placeholders in .htaccess for now)
        copy($htaccessTemplate, $htaccessTarget);
        $this->info('✅ .htaccess file generated successfully');
        $this->newLine();
    }

    protected function createSymlinks($monorepoDir, $appDir)
    {
        $this->info('🔗 Creating symlinks...');

        // Symlink artisan file
        $artisanSource = $monorepoDir . '/artisan';
        $artisanTarget = $appDir . '/artisan';

        if (file_exists($artisanSource)) {
            if (is_link($artisanTarget)) {
                $linkTarget = readlink($artisanTarget);
                $expectedRelative = '../artisan';
                $resolvedTarget = realpath(dirname($artisanTarget) . '/' . $linkTarget);
                $resolvedSource = realpath($artisanSource);
                
                if ($resolvedTarget !== $resolvedSource && $linkTarget !== $expectedRelative) {
                    $this->warn('⚠️  Fixing incorrect symlink: artisan');
                    unlink($artisanTarget);
                    $this->createSymlink($artisanSource, $artisanTarget);
                    $this->info('✅ Fixed symlink: artisan');
                } else {
                    $this->line('✓  Symlink already exists: artisan');
                }
            } elseif (file_exists($artisanTarget)) {
                $this->warn('⚠️  artisan exists but is not a symlink, skipping...');
            } else {
                $this->createSymlink($artisanSource, $artisanTarget);
                $this->info('✅ Created symlink: artisan');
            }
        }

        // Symlink index.php from public folder
        $indexSource = $monorepoDir . '/public/index.php';
        $indexTarget = $appDir . '/index.php';

        if (file_exists($indexSource)) {
            if (is_link($indexTarget)) {
                $linkTarget = readlink($indexTarget);
                $expectedRelative = '../public/index.php';
                $resolvedTarget = realpath(dirname($indexTarget) . '/' . $linkTarget);
                $resolvedSource = realpath($indexSource);
                
                if ($resolvedTarget !== $resolvedSource && $linkTarget !== $expectedRelative) {
                    $this->warn('⚠️  Fixing incorrect symlink: index.php');
                    unlink($indexTarget);
                    $this->createSymlink($indexSource, $indexTarget);
                    $this->info('✅ Fixed symlink: index.php');
                } else {
                    $this->line('✓  Symlink already exists: index.php');
                }
            } elseif (file_exists($indexTarget)) {
                $this->warn('⚠️  index.php exists but is not a symlink, skipping...');
            } else {
                $this->createSymlink($indexSource, $indexTarget);
                $this->info('✅ Created symlink: index.php');
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
        $criticalFolders = ['bootstrap', 'config', 'plugins', 'public'];
        foreach ($criticalFolders as $folder) {
            if (!is_link($appDir . '/' . $folder) && !is_dir($appDir . '/' . $folder)) {
                $missingItems[] = $folder . '/ (symlink)';
            }
        }

        if (empty($missingItems)) {
            $this->info('✅ All required items are in place!');
            $this->newLine();
            $this->info("📁 Application folder: {$appDir}");
            $this->newLine();
            $this->info('🌐 Next steps:');
            $this->line('   1. Configure web server to point to: ' . $appDir);
            $this->line('   2. Edit .env file: ' . $appDir . '/.env');
            $this->line('   3. Run: cd ' . $appDir . ' && php artisan key:generate');
            $this->line('   4. Run: cd ' . $appDir . ' && php artisan migrate');
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
