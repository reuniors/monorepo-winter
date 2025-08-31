# Monorepo Winter CMS - Project Planning

## Project Overview

This project aims to consolidate multiple existing Winter CMS projects (rzr, knk8, and future projects) into a single monorepo structure. The goal is to maintain separate project instances in production while enabling local development with a unified codebase and single database.

## Architecture Goals

-   **Single Codebase**: All projects share the same core Winter CMS installation
-   **Plugin-Based Separation**: Project-specific functionality isolated in `plugins/reuniors/*` plugins
-   **Theme-Based Separation**: Different themes for different projects
-   **Production**: Multiple instances with separate databases
-   **Development**: Single instance with single database, theme switching via URL

## Current Project Analysis

### Existing Projects

1. **RZR Project** (`rzr/`)

    - Custom theme: `themes/rzr/`
    - Key plugins: `mikp.sanctum`, `norotaro.cors`, `winter.user`, `winter.translate`
    - Features: Reservation system, contact forms, user management

2. **KNK8 Project** (`knk8/`)

    - Custom theme: `themes/kuda-na-klopu/`
    - Key plugins: `winter.location`, `winter.blog`, `winter.pages`
    - Features: Restaurant listings, location management, content management

3. **Evodic-BE Project** (`evodic-be/`)

    - Custom theme: `themes/evodic/`
    - Key plugins: `winter.user`, `winter.translate`
    - Features: Social media integration, content management

4. **Haljinars Project** (`haljinars/`)
    - Custom theme: `themes/haljina/`
    - Key plugins: `winter.user`, `winter.translate`
    - Features: Content management, social features

### Common Infrastructure

-   All use Winter CMS 1.2.x
-   Laravel 9.x framework
-   Similar plugin dependencies (sanctum, cors, etc.)

## Proposed Monorepo Structure

```
monorepo-winter/
├── plugins/
│   ├── reuniors/
│   │   ├── base/           # Common functionality for all projects
│   │   ├── rzr/            # RZR-specific functionality
│   │   ├── knk/            # KNK8-specific functionality
│   │   ├── evodic/         # Evodic-BE-specific functionality
│   │   ├── haljina/        # Haljinars-specific functionality
│   │   ├── wintersocialite/ # Social media integration (shared)
│   │   ├── reservations/   # Reservation system (RZR)
│   │   ├── delivery/       # Delivery system (KNK8)
│   │   ├── userextended/   # Extended user features (KNK8)
│   │   ├── questionnaire/  # Questionnaire system (KNK8)
│   │   ├── reorder/        # Reordering system (KNK8)
│   │   ├── comments/       # Comments system (KNK8)
│   │   └── [future]/       # Future project plugins
│   ├── winter/             # Core Winter CMS plugins
│   ├── mikp/               # Third-party plugins
│   ├── norotaro/           # Third-party plugins
│   └── [other]/            # Other third-party plugins
├── themes/
│   ├── rzr/                # RZR project theme
│   ├── kuda-na-klopu/      # KNK8 project theme
│   ├── evodic/             # Evodic-BE project theme
│   ├── haljina/            # Haljinars project theme
│   └── [future]/           # Future project themes
├── config/                  # Shared configuration
├── database/                # Shared database migrations
└── public/                  # Single public directory
```

## Complete Reuniors Plugins Inventory

### From RZR Project

-   **`reuniors.reservations`** - Reservation system functionality
-   **`reuniors.wintersocialite`** - Social media integration

### From KNK8 Project

-   **`reuniors.knk`** - KNK8-specific core functionality
-   **`reuniors.delivery`** - Delivery system functionality
-   **`reuniors.wintersocialite`** - Social media integration
-   **`reuniors.userextended`** - Extended user management features
-   **`reuniors.questionnaire`** - Questionnaire/survey system
-   **`reuniors.reorder`** - Reordering functionality
-   **`reuniors.comments`** - Comments system

### From Evodic-BE Project

-   **`reuniors.evodic`** - Evodic-specific functionality
-   **`reuniors.wintersocialite`** - Social media integration

### From Haljinars Project

-   **`reuniors.haljina`** - Haljinars-specific functionality
-   **`reuniors.wintersocialite`** - Social media integration

### Shared Plugins Across Projects

-   **`reuniors.wintersocialite`** - Used in all 4 projects (social media integration)

## Implementation Plan

### Phase 1: Foundation Setup

#### 1.1 Create Base Plugin (`plugins/reuniors/base/`)

-   **Purpose**: Common functionality shared across all projects
-   **Components**:
    -   Common models (User, Settings, etc.)
    -   Shared traits and behaviors
    -   Common components (navigation, footer, etc.)
    -   Utility classes and helpers
    -   Database migrations for shared tables

#### 1.2 Create Project-Specific Plugins

-   **`plugins/reuniors/rzr/`**

    -   RZR-specific models, controllers, components
    -   Reservation system logic
    -   Contact form functionality
    -   RZR-specific settings and configurations

-   **`plugins/reuniors/knk/`**

    -   KNK8-specific models, controllers, components
    -   Restaurant listing functionality
    -   Location management
    -   Content management features

-   **`plugins/reuniors/evodic/`**

    -   Evodic-BE-specific models, controllers, components
    -   Content management functionality
    -   Evodic-specific features and settings

-   **`plugins/reuniors/haljina/`**
    -   Haljinars-specific models, controllers, components
    -   Content management functionality
    -   Haljina-specific features and settings

#### 1.3 Create Shared Feature Plugins

-   **`plugins/reuniors/wintersocialite/`**

    -   Social media integration functionality
    -   Shared across all projects
    -   Social login, sharing, and API integration

-   **`plugins/reuniors/reservations/`**

    -   Reservation system (currently RZR-specific, could be shared)
    -   Booking functionality
    -   Calendar and scheduling features

-   **`plugins/reuniors/delivery/`**

    -   Delivery system (KNK8-specific)
    -   Order tracking and delivery management

-   **`plugins/reuniors/userextended/`**

    -   Extended user features (KNK8-specific)
    -   User profiles, preferences, and extended attributes

-   **`plugins/reuniors/questionnaire/`**

    -   Questionnaire system (KNK8-specific)
    -   Survey creation and management

-   **`plugins/reuniors/reorder/`**

    -   Reordering functionality (KNK8-specific)
    -   Order management and reordering

-   **`plugins/reuniors/comments/`**
    -   Comments system (KNK8-specific)
    -   User comments and feedback system

### Phase 2: Database Migration Strategy

#### 2.1 Database Schema Analysis

-   **Audit existing databases**:
    -   Compare table structures between rzr and knk8
    -   Identify common tables (users, settings, etc.)
    -   Identify project-specific tables
    -   Document relationships and dependencies

#### 2.2 Migration Scripts

-   **Create unified migration files**:
    -   Base migrations for common tables
    -   Project-specific migrations with proper namespacing
    -   Data migration scripts for existing data
    -   Rollback procedures

#### 2.3 Data Consolidation Strategy

-   **Common tables**: Merge and deduplicate where possible
-   **Project-specific tables**: Add project identifier columns
-   **Settings**: Consolidate into unified configuration system
-   **Users**: Implement project-based user isolation or sharing

### Phase 3: URL-Based Theme Switching (Development)

#### 3.1 Development Environment Configuration

-   **Single database instance** for local development
-   **URL-based theme detection**:
    -   `rzr.localhost` → RZR theme
    -   `knk8.localhost` → KNK8 theme
    -   `localhost` → Default theme (configurable)

#### 3.2 Theme Detection Middleware

-   **Create custom middleware** for theme switching
-   **URL parsing logic** to determine project context
-   **Theme activation** based on detected project
-   **Fallback handling** for invalid URLs

#### 3.3 Configuration Management

-   **Environment-based settings** for development vs production
-   **Project-specific configurations** loaded dynamically
-   **Theme-specific asset paths** and configurations

### Phase 4: Production Deployment

#### 4.1 Instance Configuration

-   **Separate database instances** for each project
-   **Environment-specific configurations**:
    -   Database connections
    -   Theme settings
    -   Plugin configurations
    -   Asset paths

#### 4.2 Deployment Strategy

-   **Single codebase deployment** to multiple servers
-   **Environment-specific configuration files**
-   **Database migration scripts** for each instance
-   **Asset compilation** for each theme

## Technical Implementation Details

### Plugin Architecture

#### Base Plugin Structure

```php
// plugins/reuniors/base/Plugin.php
class Plugin extends PluginBase
{
    public function registerComponents()
    {
        return [
            'Reuniors\Base\Components\Navigation' => 'navigation',
            'Reuniors\Base\Components\Footer' => 'footer',
            // Common components
        ];
    }

    public function registerSettings()
    {
        return [
            'base' => [
                'label' => 'Base Settings',
                'description' => 'Common settings for all projects',
                'category' => 'Reuniors',
                'icon' => 'icon-cog',
                'class' => 'Reuniors\Base\Models\Settings',
            ],
        ];
    }
}
```

#### Project-Specific Plugin Structure

```php
// plugins/reuniors/rzr/Plugin.php
class Plugin extends PluginBase
{
    public function registerComponents()
    {
        return [
            'Reuniors\Rzr\Components\ReservationForm' => 'reservationForm',
            'Reuniors\Rzr\Components\ContactForm' => 'contactForm',
            // RZR-specific components
        ];
    }
}
```

### Theme Detection Middleware

```php
// plugins/reuniors/base/classes/Middleware/ThemeDetectionMiddleware.php
class ThemeDetectionMiddleware
{
    public function handle($request, Closure $next)
    {
        $host = $request->getHost();
        $project = $this->detectProject($host);

        if ($project && app()->environment('local')) {
            $this->switchTheme($project);
        }

        return $next($request);
    }

    private function detectProject($host)
    {
        if (str_contains($host, 'rzr')) return 'rzr';
        if (str_contains($host, 'knk8')) return 'knk8';
        return null;
    }

    private function switchTheme($project)
    {
        // Theme switching logic
    }
}
```

### Database Migration Strategy

#### Base Migrations

```php
// plugins/reuniors/base/database/migrations/create_base_tables.php
Schema::create('reuniors_base_settings', function (Blueprint $table) {
    $table->id();
    $table->string('project')->index(); // Project identifier
    $table->string('key');
    $table->text('value');
    $table->timestamps();
});
```

#### Project-Specific Migrations

```php
// plugins/reuniors/rzr/database/migrations/create_rzr_tables.php
Schema::create('reuniors_rzr_reservations', function (Blueprint $table) {
    $table->id();
    $table->string('project')->index(); // Project identifier
    $table->string('name');
    $table->string('email');
    $table->datetime('reservation_date');
    $table->timestamps();
});
```

## Migration Steps

### Step 1: Setup Base Plugin

1. Create `plugins/reuniors/base/` directory structure
2. Implement common models and components
3. Create base database migrations
4. Test base functionality

### Step 2: Migrate RZR Project

1. Create `plugins/reuniors/rzr/` plugin
2. Move RZR-specific code from existing project
3. Update theme to use new plugin structure
4. Test RZR functionality

### Step 3: Migrate KNK8 Project

1. Create `plugins/reuniors/knk8/` plugin
2. Move KNK8-specific code from existing project
3. Update theme to use new plugin structure
4. Test KNK8 functionality

### Step 4: Implement Theme Switching

1. Create theme detection middleware
2. Implement URL-based theme switching
3. Test local development workflow
4. Document development procedures

### Step 5: Production Deployment

1. Create environment-specific configurations
2. Set up separate database instances
3. Deploy to production servers
4. Monitor and validate functionality

## Benefits of This Approach

1. **Code Reusability**: Common functionality shared across projects
2. **Maintenance Efficiency**: Single codebase to maintain and update
3. **Consistent Architecture**: Unified patterns and standards
4. **Scalability**: Easy to add new projects
5. **Development Efficiency**: Single development environment
6. **Cost Reduction**: Shared hosting and infrastructure

## Risks and Mitigation

### Risks

1. **Complexity**: More complex architecture than separate projects
2. **Dependencies**: Tight coupling between projects
3. **Testing**: More complex testing scenarios
4. **Deployment**: More complex deployment process

### Mitigation

1. **Clear Separation**: Strict plugin boundaries and namespacing
2. **Comprehensive Testing**: Automated testing for all scenarios
3. **Documentation**: Clear documentation and procedures
4. **Gradual Migration**: Phased approach to reduce risk

## Timeline Estimate

-   **Phase 1 (Foundation)**: 2-3 weeks
-   **Phase 2 (Database)**: 1-2 weeks
-   **Phase 3 (Theme Switching)**: 1 week
-   **Phase 4 (Production)**: 1-2 weeks
-   **Total**: 5-8 weeks

## Next Steps

1. **Review and approve** this planning document
2. **Set up development environment** for monorepo
3. **Begin Phase 1** with base plugin creation
4. **Schedule regular reviews** of progress
5. **Plan testing strategy** for each phase
