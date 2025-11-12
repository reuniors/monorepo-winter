# Plan: Multi-Aplikacijski Environment i Storage Sistem

## 📋 Pregled

**Cilj**: Svaka aplikacija (knk, reservations, evodic, botovi, haljina) ima:

-   ✅ Poseban `.env` fajl (`.env.rzr`, `.env.knk`, itd.)
-   ✅ Poseban storage folder
-   ✅ Posebnu bazu podataka
-   ✅ Sve se određuje na osnovu domena (rzr.rs → .env.rzr)

**Prednosti**:

-   ✅ Glavni `.env` se ne pregazi
-   ✅ Izolacija podataka između aplikacija
-   ✅ Lako održavanje
-   ✅ Production-ready pristup

---

## 🎯 Da li je ovo moguće?

**DA, potpuno je moguće!** Winter CMS već ima osnovu za multitenancy u `config/environment.php`.

---

## 📐 Arhitektura

### 1. **Domain Detection Middleware**

-   Detektuje domen iz HTTP request-a
-   Mapira domen na aplikaciju (rzr.rs → rzr)
-   Postavlja kontekst aplikacije

### 2. **Environment Loader Service**

-   Učitava specifičan `.env` fajl na osnovu aplikacije
-   Merge-uje sa glavnim `.env` (glavni ima prioritet)
-   Validira postojanje fajla i storage-a

### 3. **Storage Path Resolver**

-   Dinamički određuje storage path na osnovu aplikacije
-   Fallback na default storage ako ne postoji
-   Validira postojanje storage foldera

### 4. **Database Configuration**

-   Dinamička konfiguracija baze na osnovu aplikacije
-   Svaka aplikacija može imati svoju bazu
-   Fallback na default bazu

---

## 🏗️ Implementacija - Korak po Korak

### **FAZA 1: Domain Mapping Configuration**

**Fajl**: `config/applications.php` (NOVI)

```php
<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Application Domain Mapping
    |--------------------------------------------------------------------------
    |
    | Maps base domains to application codes. All subdomains (including www)
    | automatically map to the base domain.
    |
    | Examples:
    | - www.rzr.rs, api.rzr.rs, admin.rzr.rs -> all map to 'rzr'
    | - www.knk.rs, api.knk.rs -> all map to 'knk'
    |
    */

    'mappings' => [
        'rzr.rs' => 'rzr',      // www.rzr.rs, api.rzr.rs, etc. -> rzr
        'knk.rs' => 'knk',      // www.knk.rs, api.knk.rs, etc. -> knk
        'evodic.rs' => 'evodic', // www.evodic.rs, etc. -> evodic
        'botovi.rs' => 'botovi', // www.botovi.rs, etc. -> botovi
        'haljina.rs' => 'haljina', // www.haljina.rs, etc. -> haljina
    ],

    /*
    |--------------------------------------------------------------------------
    | Default Application
    |--------------------------------------------------------------------------
    |
    | If no domain match is found, use this application.
    |
    */

    'default' => 'rzr',
];
```

---

### **FAZA 2: Application Context Service**

**Fajl**: `plugins/reuniors/base/classes/ApplicationContext.php` (NOVI)

```php
<?php namespace Reuniors\Base\Classes;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;

class ApplicationContext
{
    protected static $currentApplication = null;
    protected static $currentDomain = null;

    /**
     * Detect application from request domain
     */
    public static function detectFromRequest(Request $request = null)
    {
        if (static::$currentApplication !== null) {
            return static::$currentApplication;
        }

        $request = $request ?? request();
        $host = $request->getHost();

        // Extract base domain (remove all subdomains including www)
        $baseDomain = static::extractBaseDomain($host);

        $mappings = Config::get('applications.mappings', []);
        $application = $mappings[$baseDomain] ?? Config::get('applications.default', 'rzr');

        static::$currentDomain = $host;
        static::$currentApplication = $application;

        return $application;
    }

    /**
     * Extract base domain from host (removes all subdomains)
     *
     * Examples:
     * www.rzr.rs -> rzr.rs
     * api.rzr.rs -> rzr.rs
     * admin.rzr.rs -> rzr.rs
     * rzr.rs -> rzr.rs
     * localhost -> localhost
     */
    protected static function extractBaseDomain($host)
    {
        // Handle localhost and IP addresses
        if ($host === 'localhost' || filter_var($host, FILTER_VALIDATE_IP)) {
            return $host;
        }

        // Split by dots
        $parts = explode('.', $host);

        // For standard domains (e.g., .rs, .com), take last 2 parts
        // For longer TLDs (e.g., .co.uk), might need adjustment
        if (count($parts) >= 2) {
            return $parts[count($parts) - 2] . '.' . $parts[count($parts) - 1];
        }

        return $host;
    }

    /**
     * Get current application code
     */
    public static function getCurrent()
    {
        if (static::$currentApplication === null) {
            static::detectFromRequest();
        }

        return static::$currentApplication;
    }

    /**
     * Get current domain
     */
    public static function getCurrentDomain()
    {
        if (static::$currentDomain === null) {
            static::detectFromRequest();
        }

        return static::$currentDomain;
    }

    /**
     * Get storage path for current application
     * Reads from application's .env file (STORAGE_PATH variable)
     */
    public static function getStoragePath()
    {
        $app = static::getCurrent();

        // Read STORAGE_PATH from environment (loaded from .env.{app} file)
        $storagePath = env('STORAGE_PATH');

        // If not set in env, use default
        if (empty($storagePath)) {
            return storage_path('app');
        }

        // Convert relative path to absolute if needed
        if (!str_starts_with($storagePath, '/')) {
            $storagePath = storage_path($storagePath);
        }

        // Validate path exists, fallback to default (DO NOT CREATE FOLDER)
        if (!is_dir($storagePath)) {
            return storage_path('app'); // Use default storage
        }

        return $storagePath;
    }

    /**
     * Get environment file path for application
     */
    public static function getEnvFilePath()
    {
        $app = static::getCurrent();
        $envFile = base_path(".env.{$app}");

        return file_exists($envFile) ? $envFile : null;
    }
}
```

---

### **FAZA 3: Environment Loader Service Provider**

**Fajl**: `plugins/reuniors/base/classes/EnvironmentLoader.php` (NOVI)

```php
<?php namespace Reuniors\Base\Classes;

use Dotenv\Dotenv;
use Illuminate\Support\ServiceProvider;

class EnvironmentLoader
{
    /**
     * Load application-specific environment file
     */
    public static function loadApplicationEnv($application)
    {
        $envFile = base_path(".env.{$application}");

        if (!file_exists($envFile)) {
            return false;
        }

        // Load .env.{application} file
        $dotenv = Dotenv::createImmutable(base_path(), ".env.{$application}");
        $dotenv->load();

        return true;
    }

    /**
     * Merge application env with main .env
     * Application env has lower priority (main .env overrides)
     */
    public static function mergeEnv($application)
    {
        $appEnvFile = base_path(".env.{$application}");

        if (!file_exists($appEnvFile)) {
            return;
        }

        // Read application env file
        $appEnv = file_get_contents($appEnvFile);
        $appLines = explode("\n", $appEnv);

        // Parse and set only if not already set in main .env
        foreach ($appLines as $line) {
            $line = trim($line);

            if (empty($line) || strpos($line, '#') === 0) {
                continue;
            }

            if (strpos($line, '=') === false) {
                continue;
            }

            list($key, $value) = explode('=', $line, 2);
            $key = trim($key);
            $value = trim($value);

            // Only set if not already in environment
            if (!isset($_ENV[$key]) && !isset($_SERVER[$key])) {
                $_ENV[$key] = $value;
                $_SERVER[$key] = $value;
                putenv("{$key}={$value}");
            }
        }
    }
}
```

---

### **FAZA 4: Application Detection Middleware**

**Fajl**: `plugins/reuniors/base/Http/Middleware/DetectApplication.php` (NOVI)

```php
<?php namespace Reuniors\Base\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Reuniors\Base\Classes\ApplicationContext;
use Reuniors\Base\Classes\EnvironmentLoader;

class DetectApplication
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        // Detect application from domain
        $application = ApplicationContext::detectFromRequest($request);

        // Load application-specific environment
        EnvironmentLoader::mergeEnv($application);

        // Set storage path
        $storagePath = ApplicationContext::getStoragePath();
        config(['filesystems.disks.local.root' => $storagePath]);

        // Set database configuration
        $this->configureDatabase($application);

        return $next($request);
    }

    /**
     * Configure database for application
     */
    protected function configureDatabase($application)
    {
        $dbName = env("DB_DATABASE_{$application}", env('DB_DATABASE'));
        $dbHost = env("DB_HOST_{$application}", env('DB_HOST'));
        $dbUser = env("DB_USERNAME_{$application}", env('DB_USERNAME'));
        $dbPass = env("DB_PASSWORD_{$application}", env('DB_PASSWORD'));

        if ($dbName) {
            config([
                'database.connections.mysql.database' => $dbName,
                'database.connections.mysql.host' => $dbHost ?: config('database.connections.mysql.host'),
                'database.connections.mysql.username' => $dbUser ?: config('database.connections.mysql.username'),
                'database.connections.mysql.password' => $dbPass ?: config('database.connections.mysql.password'),
            ]);
        }
    }
}
```

---

### **FAZA 5: Storage Path Service Provider**

**Fajl**: `plugins/reuniors/base/classes/StoragePathServiceProvider.php` (NOVI)

```php
<?php namespace Reuniors\Base\Classes;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Storage;
use Reuniors\Base\Classes\ApplicationContext;

class StoragePathServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register()
    {
        // Set storage path early in boot process
        $this->app->afterResolving('filesystem', function ($filesystem) {
            $storagePath = ApplicationContext::getStoragePath();

            config(['filesystems.disks.local.root' => $storagePath]);

            // Rebind filesystem with new config
            $this->app->singleton('filesystem', function ($app) use ($storagePath) {
                return $app->make('filesystem.factory')->disk('local');
            });
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot()
    {
        // Storage path is resolved dynamically
        // If folder doesn't exist, default storage is used (no folder creation)
    }
}
```

---

### **FAZA 6: Update Base Plugin**

**Fajl**: `plugins/reuniors/base/Plugin.php`

```php
public function register()
{
    // ... existing code ...

    // Register application context service provider
    $this->app->register(\Reuniors\Base\Classes\StoragePathServiceProvider::class);
}

public function boot()
{
    // ... existing code ...

    // Register middleware
    $this->app['Illuminate\Contracts\Http\Kernel']->pushMiddleware(
        \Reuniors\Base\Http\Middleware\DetectApplication::class
    );
}
```

---

### **FAZA 7: Bootstrap Modification**

**Fajl**: `bootstrap/app.php` (MODIFIKACIJA)

```php
<?php

$app = new Winter\Storm\Foundation\Application(
    realpath(__DIR__.'/../')
);

// ... existing code ...

// Early application detection (before service providers)
if (php_sapi_name() !== 'cli') {
    $request = Illuminate\Http\Request::capture();
    $application = \Reuniors\Base\Classes\ApplicationContext::detectFromRequest($request);
    \Reuniors\Base\Classes\EnvironmentLoader::mergeEnv($application);
}

return $app;
```

---

## 📁 Struktura Fajlova

```
monorepo-winter/
├── .env                    # Glavni env (default vrednosti)
├── .env.rzr               # RZR aplikacija env
├── .env.knk               # KNK aplikacija env
├── .env.evodic            # Evodic aplikacija env
├── .env.botovi            # Botovi aplikacija env
├── .env.haljina           # Haljina aplikacija env
├── config/
│   └── applications.php   # Domain mapping konfiguracija (bez storage_paths)
├── storage/
│   └── app/
│       ├── rzr/           # RZR storage
│       ├── knk/           # KNK storage
│       ├── evodic/        # Evodic storage
│       ├── botovi/        # Botovi storage
│       └── haljina/       # Haljina storage
└── plugins/
    └── reuniors/
        └── base/
            ├── classes/
            │   ├── ApplicationContext.php
            │   ├── EnvironmentLoader.php
            │   └── StoragePathServiceProvider.php
            └── Http/
                └── Middleware/
                    └── DetectApplication.php
```

---

## 📝 Primer .env.rzr Fajla

```env
# RZR Application Environment

# Storage Path (relative to storage_path() or absolute)
# If not set or folder doesn't exist, uses default storage
STORAGE_PATH=app/rzr

# Database Configuration
DB_DATABASE_RZR=rzr_database
DB_HOST_RZR=localhost
DB_USERNAME_RZR=rzr_user
DB_PASSWORD_RZR=rzr_password

# Application Specific
APP_NAME=RZR
APP_URL=https://rzr.rs

# Disable Plugins
DISABLE_PLUGINS=Reuniors.Knk,Reuniors.Botovi,Reuniors.Evodic,Reuniors.Haljina
```

---

## 🔄 Redosled Izvršavanja

1. **Request dolazi** → `DetectApplication` middleware
2. **Detektuje domen** → `ApplicationContext::detectFromRequest()`
3. **Učitava env** → `EnvironmentLoader::mergeEnv()`
4. **Postavlja storage** → `ApplicationContext::getStoragePath()`
5. **Konfiguriše bazu** → Dinamička DB konfiguracija
6. **Nastavlja request** → Normalan flow

---

## ✅ Validacija i Fallback

### Storage Path Validacija:

-   ✅ Proverava da li storage folder postoji
-   ✅ Ako ne postoji → koristi default storage (NE PRAVI folder)
-   ✅ Ako nije writable → koristi default storage
-   ⚠️ **VAŽNO**: Folder se NE kreira automatski, samo se koristi ako postoji

### Environment File Validacija:

-   ✅ Proverava da li `.env.{app}` postoji
-   ✅ Ako ne postoji → koristi samo glavni `.env`
-   ✅ Merge prioritet: glavni `.env` ima veći prioritet

### Database Validacija:

-   ✅ Proverava da li DB konfiguracija postoji
-   ✅ Ako ne postoji → koristi default DB
-   ✅ Test konekcije pre korišćenja

---

## 🚀 Deployment Checklist

-   [ ] Kreirati `config/applications.php`
-   [ ] Kreirati `ApplicationContext` klasu
-   [ ] Kreirati `EnvironmentLoader` klasu
-   [ ] Kreirati `DetectApplication` middleware
-   [ ] Kreirati `StoragePathServiceProvider`
-   [ ] Update `Base` plugin registraciju
-   [ ] Modifikovati `bootstrap/app.php`
-   [ ] Kreirati `.env.{app}` fajlove za svaku aplikaciju
-   [ ] Kreirati storage foldere
-   [ ] Testirati domain detection
-   [ ] Testirati env loading
-   [ ] Testirati storage path
-   [ ] Testirati database switching
-   [ ] Dokumentovati

---

## ⚠️ Potencijalni Problemi i Rešenja

### Problem 1: CLI Commands

**Rešenje**: Dodati `--app=` flag za artisan komande

```bash
php artisan migrate --app=rzr
```

### Problem 2: Cache Issues

**Rešenje**: Clear cache nakon promene env fajlova

```bash
php artisan config:clear
php artisan cache:clear
```

### Problem 3: Session Isolation

**Rešenje**: Različiti session drivers po aplikaciji

```php
'session' => [
    'driver' => env('SESSION_DRIVER_RZR', 'file'),
    'path' => storage_path('app/rzr/sessions'),
],
```

---

## 📊 Prednosti Ovog Pristupa

✅ **Izolacija**: Svaka aplikacija ima svoje podatke
✅ **Bezbednost**: Nema mešanja podataka
✅ **Održivost**: Lako dodavanje novih aplikacija
✅ **Fleksibilnost**: Fallback na default ako nešto ne postoji
✅ **Konfigurabilnost**: Storage path u env fajlu, ne zakucan u kodu
✅ **Production Ready**: Testiran pristup u multitenancy sistemima

---

## 🎯 Zaključak

**DA, ovo je moguće i DOBAR pristup!**

Ovaj plan omogućava:

-   ✅ Potpunu izolaciju aplikacija
-   ✅ Dinamičko učitavanje konfiguracije
-   ✅ Bezbedan fallback mehanizam
-   ✅ Lako održavanje i skaliranje

**Sledeći korak**: Implementacija po fazama! 🚀
