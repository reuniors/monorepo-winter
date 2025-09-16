<?php

use Reuniors\ThemeSwitcher\Controllers\ThemeSwitcher;

/*
|--------------------------------------------------------------------------
| Theme Switcher Routes
|--------------------------------------------------------------------------
|
| Routes for development theme switching functionality
|
*/

Route::get('change-theme', [ThemeSwitcher::class, 'changeTheme']);
