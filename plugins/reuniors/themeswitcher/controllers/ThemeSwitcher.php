<?php namespace Reuniors\ThemeSwitcher\Controllers;

use Cms\Classes\Theme as CmsTheme;
use Cms\Classes\ThemeManager;
use Backend\Classes\Controller;
use Winter\Storm\Support\Facades\Flash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Lang;
use Winter\Storm\Exception\ApplicationException;
use System\Models\Parameter;

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
        
        // Check if theme exists and is valid
        if (!CmsTheme::exists($themeName)) {
            Flash::error("Theme '{$themeName}' does not exist");
            return Redirect::to('/');
        }
        
        try {
            // Use the proper Winter CMS method to set the active theme
            CmsTheme::setActiveTheme($themeName);
            
            Flash::success("Theme changed to '{$themeName}' and stored in database");
            
        } catch (ApplicationException $e) {
            Flash::error('Error changing theme: ' . $e->getMessage());
        } catch (\Exception $e) {
            Flash::error('Unexpected error: ' . $e->getMessage());
        }
        
        // Redirect to home page
        return Redirect::to('/');
    }
}
