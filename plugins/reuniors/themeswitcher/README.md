# Theme Switcher Plugin

A development plugin for WinterCMS that allows you to quickly switch between themes AND their corresponding database configurations via URL parameters.

## Usage

To change the active theme and database, simply visit:

```
http://your-domain.com/change-theme?theme={themeName}
```

For example:

-   `http://monorepo/change-theme?theme=rzr`
-   `http://monorepo/change-theme?theme=demo`
-   `http://monorepo/change-theme?theme=kuda-na-klopu`

## Features

-   ✅ **Quick theme switching** via URL parameter
-   ✅ **Database switching** - automatically updates `DB_DATABASE` based on theme
-   ✅ **Theme validation** (checks if theme exists)
-   ✅ **Success/error flash messages**
-   ✅ **Automatic redirect** to home page after theme change
-   ✅ **Logging** - logs all database switches
-   ✅ **Development-only functionality**

## Database Naming Convention

The plugin automatically updates the `DB_DATABASE` environment variable based on the theme:

-   **Default**: `monorepo_winter`
-   **RZR theme**: `monorepo_rzr`
-   **KNK theme** (kuda-na-klopu): `monorepo_knk`
-   **Demo theme**: `monorepo_demo`

## Available Themes

Based on your monorepo-winter setup, the following themes are available:

-   `rzr` → uses database `monorepo_rzr`
-   `demo` → uses database `monorepo_demo`
-   `kuda-na-klopu` → uses database `monorepo_knk`

## How It Works

1. **Theme Validation**: Checks if the requested theme exists
2. **Theme Switch**: Sets the active theme using `CmsTheme::setActiveTheme()`
3. **Database Update**:
    - Reads the current `.env` file
    - Updates the `DB_DATABASE` line based on theme mapping
    - Writes the updated content back to `.env`
    - Clears OPcache if available
4. **Logging**: Logs the database switch for debugging
5. **Redirect**: Redirects to home page with success message

## Theme to Database Mapping

The plugin uses a simple mapping system:

```php
$themeMap = [
    'rzr' => 'rzr',
    'kuda-na-klopu' => 'knk',
    'demo' => 'demo',
];
```

This creates database names in the format: `monorepo_{suffix}`

## Installation

This plugin is automatically loaded when placed in the `plugins/reuniors/themeswitcher/` directory.

## Security Note

This plugin is intended for development use only. Do not use in production environments without proper security considerations.

## Example Usage

1. **Switch to RZR project**: `http://monorepo/change-theme?theme=rzr`

    - Theme: RZR
    - Database: `monorepo_rzr`

2. **Switch to KNK project**: `http://monorepo/change-theme?theme=kuda-na-klopu`

    - Theme: Kuda Na Klopu
    - Database: `monorepo_knk`

3. **Switch to Demo project**: `http://monorepo/change-theme?theme=demo`
    - Theme: Demo
    - Database: `monorepo_demo`

## Benefits

-   **Simple**: Only updates the database name, keeps all other settings intact
-   **Fast**: No file copying or complex operations
-   **Safe**: Preserves all other environment variables
-   **Flexible**: Easy to add new themes by updating the mapping
-   **Clean**: No backup files or complex file management needed
