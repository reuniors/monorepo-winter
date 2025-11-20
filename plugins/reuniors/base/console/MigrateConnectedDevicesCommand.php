<?php namespace Reuniors\Base\Console;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Reuniors\Base\Models\ConnectedDevice;

class MigrateConnectedDevicesCommand extends Command
{
    protected $name = 'reuniors:migrate-connected-devices';
    protected $signature = 'reuniors:migrate-connected-devices {--dry-run : Show what would be migrated without actually migrating}';
    protected $description = 'Migrate connected devices from reservations plugin to base plugin';

    public function handle()
    {
        $dryRun = $this->option('dry-run');

        $this->info('Migrating connected devices from reservations plugin to base plugin...');
        if ($dryRun) {
            $this->warn('DRY RUN MODE - No data will be actually migrated');
        }

        try {
            // Check if source table exists
            if (!DB::getSchemaBuilder()->hasTable('reuniors_reservations_connected_devices')) {
                $this->warn('Source table reuniors_reservations_connected_devices does not exist. Nothing to migrate.');
                return 0;
            }

            // Check if destination table exists
            if (!DB::getSchemaBuilder()->hasTable('reuniors_base_connected_devices')) {
                $this->error('Destination table reuniors_base_connected_devices does not exist. Please run migrations first.');
                return 1;
            }

            // Get all records from source table
            $sourceRecords = DB::table('reuniors_reservations_connected_devices')->get();

            if ($sourceRecords->isEmpty()) {
                $this->info('No records to migrate.');
                return 0;
            }

            $this->info("Found {$sourceRecords->count()} records to migrate.");

            $migrated = 0;
            $skipped = 0;
            $errors = 0;

            // Get location slugs mapping (location_id => slug)
            $locationMapping = [];
            if (DB::getSchemaBuilder()->hasTable('reuniors_reservations_locations')) {
                $locations = DB::table('reuniors_reservations_locations')
                    ->select('id', 'slug')
                    ->get();
                foreach ($locations as $location) {
                    $locationMapping[$location->id] = $location->slug;
                }
            }

            foreach ($sourceRecords as $sourceRecord) {
                // Convert location_id to location_slug
                $locationSlug = null;
                if ($sourceRecord->location_id !== null) {
                    if (isset($locationMapping[$sourceRecord->location_id])) {
                        $locationSlug = $locationMapping[$sourceRecord->location_id];
                    } else {
                        $this->error("Location ID {$sourceRecord->location_id} not found for record ID {$sourceRecord->id}");
                        $errors++;
                        continue;
                    }
                }

                // Check if record already exists in destination
                $existingQuery = DB::table('reuniors_base_connected_devices')
                    ->where('user_id', $sourceRecord->user_id);
                if ($locationSlug !== null) {
                    $existingQuery->where('location_slug', $locationSlug);
                } else {
                    $existingQuery->whereNull('location_slug');
                }
                $existing = $existingQuery->first();

                if ($existing) {
                    $this->warn("Skipping record ID {$sourceRecord->id} - already exists in destination");
                    $skipped++;
                    continue;
                }

                if (!$dryRun) {
                    DB::table('reuniors_base_connected_devices')->insert([
                        'id' => $sourceRecord->id,
                        'user_id' => $sourceRecord->user_id,
                        'location_slug' => $locationSlug,
                        'tokens' => $sourceRecord->tokens,
                        'created_at' => $sourceRecord->created_at,
                        'updated_at' => $sourceRecord->updated_at,
                    ]);
                }

                $this->line("Migrated record ID {$sourceRecord->id} (user_id: {$sourceRecord->user_id}, location_slug: " . ($locationSlug ?? 'NULL') . ")");
                $migrated++;
            }

            $this->info("Migration completed!");
            $this->info("Migrated: {$migrated} records");
            if ($skipped > 0) {
                $this->warn("Skipped: {$skipped} records (already exist)");
            }
            if ($errors > 0) {
                $this->error("Errors: {$errors} records (location not found)");
            }

            if ($dryRun) {
                $this->warn('DRY RUN MODE - No data was actually migrated');
            }

            return 0;
        } catch (\Exception $e) {
            $this->error('Error migrating data: ' . $e->getMessage());
            $this->error($e->getTraceAsString());
            return 1;
        }
    }
}

