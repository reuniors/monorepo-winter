<?php namespace Reuniors\ThemeSwitcher\Controllers;

use Cms\Classes\Theme as CmsTheme;
use Cms\Classes\ThemeManager;
use Backend\Classes\Controller;
use Winter\Storm\Support\Facades\Flash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Lang;
use Winter\Storm\Exception\ApplicationException;
use Winter\Storm\Support\Facades\File;

/**
 * Theme Switcher Controller
 * 
 * Handles theme switching for development purposes
 */
class ThemeSwitcher extends Controller
{
    /**
     * Change the active theme
     * 
     * @return \Illuminate\Http\RedirectResponse
     */
    public function changeTheme()
    {
        $themeName = request()->get('theme');
        
        if (!$themeName) {
            Flash::error('Theme parameter is required');
            return Redirect::to('/');
        }
        
        // Check if theme exists
        if (!CmsTheme::load($themeName)) {
            Flash::error("Theme '{$themeName}' does not exist");
            return Redirect::to('/');
        }
        
        try {
            // Set the active theme
            CmsTheme::setActiveTheme($themeName);
            
            // Update database name based on theme
            $this->updateDatabaseName($themeName);
            
            Flash::success("Theme changed to '{$themeName}' and database updated");
            
        } catch (ApplicationException $e) {
            Flash::error('Error changing theme: ' . $e->getMessage());
        } catch (\Exception $e) {
            Flash::error('Unexpected error: ' . $e->getMessage());
        }
        
        // Redirect to home page
        return Redirect::to('/');
    }
    
    /**
     * Update database name based on theme
     * 
     * @param string $themeName
     * @return void
     */
    private function updateDatabaseName($themeName)
    {
        $envFile = base_path('.env');
        
        if (!File::exists($envFile)) {
            \Log::warning("No .env file found");
            return;
        }
        
        // Read current .env file
        $envContent = File::get($envFile);
        
        // Determine database name based on theme
        $dbName = $this->getDatabaseNameForTheme($themeName);
        
        // Update DB_DATABASE line
        $envContent = preg_replace(
            '/^DB_DATABASE=.*$/m',
            "DB_DATABASE=\"{$dbName}\"",
            $envContent
        );
        
        // Write updated content back to .env file
        File::put($envFile, $envContent);
        
        // Clear config cache to reload new environment variables
        if (function_exists('opcache_reset')) {
            opcache_reset();
        }
        
        // Log the database switch
        \Log::info("Database switched to: {$dbName} for theme: {$themeName}");
    }
    
    /**
     * Get database name for theme
     * 
     * @param string $themeName
     * @return string
     */
    private function getDatabaseNameForTheme($themeName)
    {
        // Map theme names to database suffixes
        $themeMap = [
            'rzr' => 'rzr',
            'kuda-na-klopu' => 'knk',
            'demo' => 'demo',
        ];
        
        $suffix = $themeMap[$themeName] ?? 'winter';
        return "monorepo_{$suffix}";
    }
}
