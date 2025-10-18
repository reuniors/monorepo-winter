# Cursor Backend Development Guide

## Documentation Guidelines

**IMPORTANT**: All Markdown (MD) files created during development should be placed in the `cursordocs/` folder at the root of the monorepo. This keeps documentation organized and prevents clutter in the main project structure.

**Examples:**

-   `cursordocs/plugin-development.md`
-   `cursordocs/database-migration-guide.md`
-   `cursordocs/api-endpoint-documentation.md`
-   `cursordocs/deployment-notes.md`

## Project Overview

This is a **Winter CMS monorepo** containing multiple projects (RZR, KNK, Evodic, Haljinars) with shared functionality through Reuniors plugins. All backend development happens in the `plugins/reuniors/` directory.

## Project Structure

```
monorepo-winter/
├── plugins/
│   ├── reuniors/              # All custom functionality
│   │   ├── base/             # Shared base functionality
│   │   ├── reservations/     # RZR-specific functionality
│   │   ├── knk/              # KNK-specific functionality
│   │   ├── evodic/           # Evodic-specific functionality
│   │   ├── haljina/          # Haljinars-specific functionality
│   │   ├── delivery/          # Delivery system (KNK)
│   │   ├── userextended/     # Extended user features
│   │   ├── questionnaire/    # Questionnaire system
│   │   ├── reorder/          # Reordering functionality
│   │   ├── comments/         # Comments system
│   │   └── botovi/           # Bot functionality
│   ├── winter/               # Core Winter CMS plugins
│   └── [other]/              # Third-party plugins
├── themes/                   # Project-specific themes
└── config/                   # Shared configuration
```

## Development Patterns

### 1. Database Migrations

**Always use Winter CMS migrations, not raw SQL:**

```php
// plugins/reuniors/reservations/updates/builder_table_create_example.php
<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateExample extends Migration
{
    public function up()
    {
        Schema::create('reuniors_reservations_example', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->string('name');
            $table->text('description')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_reservations_example');
    }
}
```

**Update version.yaml:**

```yaml
# plugins/reuniors/reservations/updates/version.yaml
1.0.70:
    - "Created table reuniors_reservations_example"
    - builder_table_create_example.php
```

### 2. UTC Date Fields Pattern

**All date/time fields must have UTC equivalents:**

```php
// Migration example
Schema::table('reuniors_reservations_example', function($table)
{
    $table->datetime('date_utc')->nullable();           // For datetime
    $table->date('scheduled_date_utc')->nullable();    // For date
    $table->time('time_from_utc')->nullable();         // For time
    $table->text('pauses_utc')->nullable();            // For JSON data
});
```

**Model usage:**

```php
// In models, use UTC fields as primary
protected $dates = ['date_utc', 'scheduled_date_utc'];

// Accessors for local time conversion
public function getDateFormattedAttribute()
{
    return Carbon::parse($this->date_utc)->setTimezone('Europe/Belgrade');
}
```

### 3. API Actions Pattern

**Use Actions for all API endpoints:**

```php
// plugins/reuniors/reservations/Http/Actions/V1/Location/Services/Group/LocationServiceGroupsGet.php
<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\Services\Group;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\ServiceGroup;

class LocationServiceGroupsGet extends BaseAction
{
    public function rules()
    {
        return [
            'locationSlug' => ['string'],
            'workerId' => ['integer'], // NEW: Worker filtering
            'perPage' => ['integer'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $locationSlug = $attributes['locationSlug'] ?? null;
        $workerId = $attributes['workerId'] ?? null;
        $perPage = $attributes['perPage'] ?? 50;

        $serviceGroups = ServiceGroup::feServiceGroups([
            'locationSlug' => $locationSlug,
            'workerId' => $workerId, // NEW: Filter by worker
        ]);

        return $serviceGroups->paginate($perPage);
    }
}
```

### 4. Model Relationships

**Use proper Eloquent relationships:**

```php
// LocationWorker model
public $belongsToMany = [
    'services' => [
        'Reuniors\Reservations\Models\Service',
        'table' => 'reuniors_reservations_location_workers_services',
        'key' => 'location_worker_id',
        'otherKey' => 'service_id',
        'pivot' => ['price', 'duration', 'sort_order', 'active'],
    ],
];

public $hasMany = [
    'worker_services' => 'Reuniors\Reservations\Models\LocationWorkerService',
];
```

### 5. Route Registration

**Register routes in plugin routes.php:**

```php
// plugins/reuniors/reservations/routes.php
Route::group(['prefix' => 'api/v1'], function () {
    Route::get('location/{locationSlug}/services/groups',
        \Reuniors\Reservations\Http\Actions\V1\Location\Services\Group\LocationServiceGroupsGet::class);

    Route::get('location/{locationSlug}/workers/{workerId}/services',
        \Reuniors\Reservations\Http\Actions\V1\Location\Workers\Services\LocationWorkerServicesGet::class);
});
```

## Plugin Development Guidelines

### 1. Plugin Structure

```
plugins/reuniors/[plugin-name]/
├── Plugin.php                 # Plugin registration
├── models/                    # Eloquent models
├── Http/
│   ├── Actions/              # API actions
│   └── Controllers/           # Controllers (if needed)
├── updates/                   # Database migrations
│   ├── version.yaml          # Migration versions
│   └── builder_table_*.php   # Migration files
├── classes/                   # Helper classes
├── components/               # Frontend components
└── routes.php               # Route definitions
```

### 2. UUID Model Patterns

**For models with UUID primary keys:**

```php
// Set incrementing to false for UUID models
public $incrementing = false;

// Boot method to auto-generate UUID
protected static function boot()
{
    parent::boot();

    static::creating(function ($model) {
        if (empty($model->id)) {
            $model->id = (string) \Str::uuid();
        }
    });
}
```

**Examples from the project:**

-   `reuniors_reservations_change_requests` - UUID for change tracking
-   `reuniors_delivery_orders` - UUID for order tracking
-   `reuniors_botovi_person_flags` - UUID for flag tracking
-   `reuniors_botovi_notifications` - UUID for notification tracking

### 3. Model Conventions

**Base model with common traits:**

```php
<?php namespace Reuniors\Reservations\Models;

use Reuniors\Reservations\Classes\BaseModelWithSort;

class Service extends BaseModelWithSort
{
    use \Winter\Storm\Database\Traits\Validation;
    use \Winter\Storm\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at'];
    public $table = 'reuniors_reservations_services';

    protected $fillable = [
        'group_id', 'title', 'name', 'slug', 'description',
        'active', 'duration', 'price', 'currency', 'sort_order',
    ];

    public $belongsTo = [
        'service_group' => ['Reuniors\Reservations\Models\ServiceGroup', 'key' => 'group_id'],
    ];
}
```

### 3. API Response Format

**Consistent API responses:**

```php
// Success response
return [
    'data' => $data,
    'success' => true,
];

// Error response
return response()->json([
    'success' => false,
    'message' => 'Error message',
    'errors' => $validationErrors
], 422);
```

### 4. Validation Rules

**Use proper validation:**

```php
public function rules()
{
    return [
        'locationSlug' => ['required', 'string'],
        'workerId' => ['integer', 'exists:reuniors_reservations_location_workers,id'],
        'serviceId' => ['integer', 'exists:reuniors_reservations_services,id'],
        'price' => ['nullable', 'numeric', 'min:0'],
        'duration' => ['nullable', 'integer', 'min:1'],
    ];
}
```

## Database Conventions

### 1. Table Naming

-   **Format**: `reuniors_[plugin]_[entity]`
-   **Examples**:
    -   `reuniors_reservations_services`
    -   `reuniors_reservations_location_workers_services`
    -   `reuniors_knk_locations`

### 2. Column Naming

-   **UTC Fields**: Always add `_utc` suffix
-   **Foreign Keys**: `[entity]_id` (e.g., `location_id`, `worker_id`)
-   **Timestamps**: `created_at`, `updated_at`, `deleted_at`
-   **Sorting**: `sort_order` for ordered entities

### 3. Primary Key Strategy

**Use UUID for high-volume tables:**

```php
// For tables with potential unlimited data (logs, statistics, etc.)
$table->uuid('id')->primary();

// For n-n pivot tables, use composite primary key
$table->primary(['profile_id', 'food_category_id']);
```

**When to use UUID vs Auto-increment:**

-   **UUID**: Change requests, logs, statistics, high-volume data
-   **Auto-increment**: Regular entities (users, locations, services)
-   **Composite PK**: Simple n-n pivot tables without additional data

### 4. N-N Relationship Patterns

**Simple pivot tables (no additional data):**

```php
// Use composite primary key, no separate ID
Schema::create('reuniors_knk_profiles_food_categories', function($table) {
    $table->integer('profile_id')->unsigned();
    $table->integer('food_category_id')->unsigned();
    $table->timestamps();

    $table->primary(['profile_id', 'food_category_id']);
});
```

**Complex pivot tables (with additional data):**

```php
// Use separate ID for pivot tables with custom fields
Schema::create('reuniors_reservations_location_workers_services', function($table) {
    $table->increments('id')->unsigned(); // Separate ID needed
    $table->integer('location_worker_id')->unsigned();
    $table->integer('service_id')->unsigned();
    $table->integer('location_id')->unsigned();
    $table->decimal('price', 10, 2)->nullable(); // Custom field
    $table->integer('duration')->nullable(); // Custom field
    $table->integer('sort_order')->nullable(); // Custom field
    $table->tinyInteger('active')->unsigned()->default(1);

    $table->unique(['location_worker_id', 'service_id', 'location_id']);
});
```

### 5. Indexes

```php
// Always add indexes for foreign keys and search fields
$table->index(['location_worker_id']);
$table->index(['service_id']);
$table->index(['location_id']);
$table->unique(['location_worker_id', 'service_id', 'location_id']);
```

## Common Patterns

### 1. Scope Methods

```php
// In models, add scope methods for common queries
public function scopeFeServiceGroups($query, array $options = [])
{
    $active = $options['active'] ?? true;
    $locationSlug = $options['locationSlug'] ?? null;
    $workerId = $options['workerId'] ?? null;

    if ($active) {
        $query->where('active', true);
    }

    if ($locationSlug) {
        $query->whereHas('locations', function ($query) use ($locationSlug) {
            $query->where('slug', $locationSlug);
        });
    }

    return $query;
}
```

### 2. Accessor Methods

```php
// For UTC date conversion
public function getDateFormattedAttribute()
{
    return Carbon::parse($this->date_utc)->setTimezone('Europe/Belgrade');
}

// For effective pricing
public function getEffectivePriceAttribute()
{
    return $this->price ?? $this->service->price;
}
```

### 3. Relationship Methods

```php
// Helper methods for complex relationships
public function servicesForLocation($locationId)
{
    return $this->services()
        ->wherePivot('location_id', $locationId)
        ->wherePivot('active', true);
}
```

## Testing

### 1. API Testing

```php
// Test API endpoints
public function testLocationServiceGroupsGet()
{
    $response = $this->get('/api/v1/location/test-location/services/groups');
    $response->assertStatus(200);
    $response->assertJsonStructure(['data', 'success']);
}
```

### 2. Model Testing

```php
// Test model relationships
public function testWorkerServicesRelationship()
{
    $worker = LocationWorker::factory()->create();
    $service = Service::factory()->create();

    $worker->services()->attach($service->id, [
        'location_id' => 1,
        'price' => 1000,
        'duration' => 30
    ]);

    $this->assertCount(1, $worker->services);
}
```

## Deployment

### 1. Migration Commands

```bash
# Run migrations
php artisan winter:up

# Check migration status
php artisan winter:version

# Rollback if needed
php artisan winter:down
```

### 2. Plugin Management

```bash
# Enable plugin
php artisan plugin:enable Reuniors.Reservations

# Disable plugin
php artisan plugin:disable Reuniors.Reservations

# Refresh plugin
php artisan plugin:refresh Reuniors.Reservations
```

## Best Practices

1. **Always use UTC fields** for all date/time data
2. **Use Actions** for API endpoints, not Controllers
3. **Follow naming conventions** for tables and columns
4. **Add proper indexes** for performance
5. **Use relationships** instead of manual joins
6. **Validate input** in Action rules
7. **Use migrations** instead of raw SQL
8. **Test thoroughly** before deployment
9. **Document complex logic** with comments
10. **Follow PSR-4** autoloading standards

## Common Issues

### 1. Migration Failures

-   Check if table already exists
-   Verify foreign key constraints
-   Use proper data types

### 2. Relationship Issues

-   Ensure proper foreign key names
-   Check pivot table structure
-   Verify model namespaces

### 3. API Errors

-   Validate input parameters
-   Check authentication
-   Handle exceptions properly

---

_This guide should be referenced for all backend development in the monorepo._
