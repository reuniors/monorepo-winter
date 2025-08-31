#!/bin/bash

# Monorepo Winter CMS Setup Script
# This script creates all reuniors plugins and themes from the 4 projects

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if we're in the monorepo-winter directory
if [ ! -f "artisan" ]; then
    print_error "This script must be run from the monorepo-winter directory"
    exit 1
fi

# Check if artisan command exists
if ! command_exists php; then
    print_error "PHP is not installed or not in PATH"
    exit 1
fi

print_status "Starting Monorepo Winter CMS Setup..."

# Create reuniors base directory if it doesn't exist
if [ ! -d "plugins/reuniors" ]; then
    print_status "Creating reuniors plugins directory..."
    mkdir -p plugins/reuniors
fi

# Define plugin priority order (rzr is most recent and updated)
PLUGIN_PRIORITY=("rzr" "knk8" "haljinars" "evodic-be")

# Define all reuniors plugins with their source projects using parallel arrays
PLUGIN_NAMES=("base" "rzr" "knk" "evodic" "haljina" "wintersocialite" "reservations" "delivery" "userextended" "questionnaire" "reorder" "comments")
PLUGIN_SOURCES=("rzr" "rzr" "knk8" "evodic-be" "haljinars" "rzr" "rzr" "knk8" "knk8" "knk8" "knk8" "knk8")

# Define themes with their source projects using parallel arrays
THEME_CODES=("rzr" "kuda-na-klopu" "evodic" "haljina")
THEME_SOURCES=("rzr" "knk8" "evodic-be" "haljinars")

print_status "Creating reuniors plugins..."

# Create all plugins first
for i in "${!PLUGIN_NAMES[@]}"; do
    plugin_name="${PLUGIN_NAMES[$i]}"
    print_status "Creating plugin: Reuniors.$plugin_name"
    
    # Create the plugin using artisan command
    if php artisan create:plugin "Reuniors.$plugin_name" >/dev/null 2>&1; then
        print_success "Created plugin: Reuniors.$plugin_name"
    else
        print_warning "Plugin Reuniors.$plugin_name might already exist or failed to create"
    fi
done

print_status "Copying plugin content from source projects..."

# Copy plugin content with priority order
for i in "${!PLUGIN_NAMES[@]}"; do
    plugin_name="${PLUGIN_NAMES[$i]}"
    source_project="${PLUGIN_SOURCES[$i]}"
    
    source_path="../${source_project}/plugins/reuniors/${plugin_name}"
    target_path="plugins/reuniors/${plugin_name}"
    
    if [ -d "$source_path" ]; then
        print_status "Copying content for plugin: $plugin_name from $source_project"
        
        # Remove existing content (except Plugin.php and plugin.yaml)
        if [ -d "$target_path" ]; then
            find "$target_path" -mindepth 1 -not -name "Plugin.php" -not -name "plugin.yaml" -exec rm -rf {} + 2>/dev/null || true
        fi
        
        # Copy content from source
        cp -r "$source_path"/* "$target_path/" 2>/dev/null || true
        
        # Update Plugin.php namespace if it exists
        if [ -f "$target_path/Plugin.php" ]; then
            # Update namespace from source project to Reuniors
            sed -i.bak "s/namespace.*Reuniors.*${plugin_name}/namespace Reuniors\\${plugin_name}/g" "$target_path/Plugin.php" 2>/dev/null || true
            sed -i.bak "s/use.*Reuniors.*${plugin_name}/use Reuniors\\${plugin_name}/g" "$target_path/Plugin.php" 2>/dev/null || true
            rm -f "$target_path/Plugin.php.bak" 2>/dev/null || true
        fi
        
        print_success "Copied content for plugin: $plugin_name"
    else
        print_warning "Source path not found: $source_path"
    fi
done

print_status "Creating themes..."

# Create all themes
for i in "${!THEME_CODES[@]}"; do
    theme_code="${THEME_CODES[$i]}"
    source_project="${THEME_SOURCES[$i]}"
    
    print_status "Creating theme: $theme_code from $source_project"
    
    # Create the theme using artisan command
    if php artisan create:theme "$theme_code" >/dev/null 2>&1; then
        print_success "Created theme: $theme_code"
    else
        print_warning "Theme $theme_code might already exist or failed to create"
    fi
done

print_status "Copying theme content from source projects..."

# Copy theme content
for i in "${!THEME_CODES[@]}"; do
    theme_code="${THEME_CODES[$i]}"
    source_project="${THEME_SOURCES[$i]}"
    
    # Determine source theme path based on project
    case $source_project in
        "rzr")
            source_theme_path="../rzr/themes/rzr"
            ;;
        "knk8")
            source_theme_path="../knk8/themes/kuda-na-klopu"
            ;;
        "evodic-be")
            source_theme_path="../evodic-be/themes/evodic"
            ;;
        "haljinars")
            source_theme_path="../haljinars/themes/haljina"
            ;;
        *)
            source_theme_path="../${source_project}/themes/${theme_code}"
            ;;
    esac
    
    target_theme_path="themes/${theme_code}"
    
    if [ -d "$source_theme_path" ]; then
        print_status "Copying content for theme: $theme_code from $source_project"
        
        # Remove existing content (except theme.yaml and version.yaml)
        if [ -d "$target_theme_path" ]; then
            find "$target_theme_path" -mindepth 1 -not -name "theme.yaml" -not -name "version.yaml" -exec rm -rf {} + 2>/dev/null || true
        fi
        
        # Copy content from source
        cp -r "$source_theme_path"/* "$target_theme_path/" 2>/dev/null || true
        
        print_success "Copied content for theme: $theme_code"
    else
        print_warning "Source theme path not found: $source_theme_path"
    fi
done

print_status "Cleaning up temporary files..."

# Clean up any backup files created during sed operations
find plugins/reuniors -name "*.bak" -delete 2>/dev/null || true

print_status "Running composer dump-autoload..."

# Regenerate autoload files
if command_exists composer; then
    composer dump-autoload >/dev/null 2>&1 || print_warning "Composer dump-autoload failed"
else
    print_warning "Composer not found, skipping autoload regeneration"
fi

print_status "Running Winter CMS cache clear..."

# Clear Winter CMS caches
php artisan cache:clear >/dev/null 2>&1 || print_warning "Cache clear failed"
php artisan config:clear >/dev/null 2>&1 || print_warning "Config clear failed"

print_success "Monorepo setup completed successfully!"
print_status "Summary of what was created:"

echo ""
echo "📦 Plugins created:"
for plugin_name in "${PLUGIN_NAMES[@]}"; do
    echo "   - Reuniors.$plugin_name"
done

echo ""
echo "🎨 Themes created:"
for theme_code in "${THEME_CODES[@]}"; do
    echo "   - $theme_code"
done

echo ""
print_status "Next steps:"
echo "1. Review the created plugins and themes"
echo "2. Update any hardcoded paths in the copied code"
echo "3. Test the functionality of each plugin"
echo "4. Run database migrations if needed"
echo "5. Configure the themes for each project"

echo ""
print_status "Script completed at: $(date)" 