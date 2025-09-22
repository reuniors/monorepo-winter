<?php namespace Reuniors\Base\Console;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class GenericTableMigrator extends Command
{
    protected $name = 'reuniors:migrate-table';
    protected $signature = 'reuniors:migrate-table 
                            {source_table : Source table name}
                            {target_table : Target table name}
                            {--dry-run : Show what would be copied without actually copying}
                            {--where= : WHERE clause for source table (e.g., "active = 1")}
                            {--limit= : Limit number of records to migrate}
                            {--batch-size=100 : Number of records to process in each batch}
                            {--column-mapping= : JSON mapping for column names (e.g., {"old_name":"new_name"})}';
    
    protected $description = 'Migrate data from any source table to any target table with automatic column mapping';

    public function handle()
    {
        $sourceTable = $this->argument('source_table');
        $targetTable = $this->argument('target_table');
        $dryRun = $this->option('dry-run');
        $whereClause = $this->option('where');
        $limit = $this->option('limit');
        $batchSize = (int) $this->option('batch-size');
        $columnMapping = $this->option('column-mapping');

        // Parse column mapping if provided
        $columnMap = [];
        if ($columnMapping) {
            $columnMap = json_decode($columnMapping, true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                $this->error('Invalid JSON for column mapping: ' . json_last_error_msg());
                return 1;
            }
        }

        $this->info("Migrating data from '{$sourceTable}' to '{$targetTable}'...");
        if ($dryRun) {
            $this->warn('DRY RUN MODE - No data will be actually copied');
        }

        try {
            // Check if source table exists
            if (!Schema::hasTable($sourceTable)) {
                $this->error("Source table '{$sourceTable}' does not exist");
                return 1;
            }

            // Check if target table exists
            if (!Schema::hasTable($targetTable)) {
                $this->error("Target table '{$targetTable}' does not exist");
                return 1;
            }

            // Get column information
            $sourceColumns = $this->getTableColumns($sourceTable);
            $targetColumns = $this->getTableColumns($targetTable);
            
            $this->info("Source table has " . count($sourceColumns) . " columns");
            $this->info("Target table has " . count($targetColumns) . " columns");

            // Create column mapping
            $mapping = $this->createColumnMapping($sourceColumns, $targetColumns, $columnMap);
            
            $this->info("Column mapping:");
            foreach ($mapping as $sourceCol => $targetCol) {
                $this->line("  {$sourceCol} → {$targetCol}");
            }

            // Get data count
            $query = DB::table($sourceTable);
            if ($whereClause) {
                $query->whereRaw($whereClause);
            }
            if ($limit) {
                $query->limit($limit);
            }

            $totalRecords = $query->count();
            $this->info("Found {$totalRecords} records to migrate");

            if ($dryRun) {
                $this->showSampleData($query, $mapping, 5);
                return 0;
            }

            // Migrate data in batches
            $this->migrateData($query, $targetTable, $mapping, $batchSize);

            $this->info('Data migration completed successfully!');
            return 0;

        } catch (\Exception $e) {
            $this->error('Error migrating data: ' . $e->getMessage());
            return 1;
        }
    }

    private function getTableColumns($tableName)
    {
        $columns = [];
        $columnInfo = DB::select("DESCRIBE `{$tableName}`");
        
        foreach ($columnInfo as $column) {
            $columns[$column->Field] = [
                'type' => $column->Type,
                'null' => $column->Null === 'YES',
                'key' => $column->Key,
                'default' => $column->Default,
                'extra' => $column->Extra,
            ];
        }
        
        return $columns;
    }

    private function createColumnMapping($sourceColumns, $targetColumns, $customMapping = [])
    {
        $mapping = [];
        
        // First, apply custom mapping
        foreach ($customMapping as $sourceCol => $targetCol) {
            if (isset($sourceColumns[$sourceCol]) && isset($targetColumns[$targetCol])) {
                $mapping[$sourceCol] = $targetCol;
            }
        }

        // Then, try to match columns by name
        foreach ($sourceColumns as $sourceCol => $sourceInfo) {
            if (isset($mapping[$sourceCol])) {
                continue; // Already mapped
            }

            if (isset($targetColumns[$sourceCol])) {
                $mapping[$sourceCol] = $sourceCol;
            }
        }

        // Try to match by similar names (case insensitive)
        foreach ($sourceColumns as $sourceCol => $sourceInfo) {
            if (isset($mapping[$sourceCol])) {
                continue; // Already mapped
            }

            foreach ($targetColumns as $targetCol => $targetInfo) {
                if (strtolower($sourceCol) === strtolower($targetCol)) {
                    $mapping[$sourceCol] = $targetCol;
                    break;
                }
            }
        }

        return $mapping;
    }

    private function showSampleData($query, $mapping, $limit = 5)
    {
        $this->info("\nSample data that would be migrated:");
        
        $records = $query->limit($limit)->get();
        
        foreach ($records as $index => $record) {
            $this->line("\nRecord " . ($index + 1) . ":");
            foreach ($mapping as $sourceCol => $targetCol) {
                $value = $record->$sourceCol ?? 'NULL';
                $this->line("  {$targetCol}: {$value}");
            }
        }
    }

    private function migrateData($query, $targetTable, $mapping, $batchSize)
    {
        $offset = 0;
        $totalMigrated = 0;
        $totalSkipped = 0;

        do {
            $records = $query->offset($offset)->limit($batchSize)->get();
            
            if ($records->isEmpty()) {
                break;
            }

            $this->info("Processing batch: " . ($offset + 1) . " to " . ($offset + $records->count()));

            foreach ($records as $record) {
                try {
                    $data = [];
                    foreach ($mapping as $sourceCol => $targetCol) {
                        $value = $record->$sourceCol ?? null;
                        
                        // Handle NULL values
                        if ($value === null) {
                            $data[$targetCol] = null;
                        } else {
                            $data[$targetCol] = $value;
                        }
                    }

                    // Check if record already exists (by primary key or unique fields)
                    if ($this->recordExists($targetTable, $data)) {
                        $totalSkipped++;
                        continue;
                    }

                    DB::table($targetTable)->insert($data);
                    $totalMigrated++;

                } catch (\Exception $e) {
                    $this->warn("Failed to migrate record: " . $e->getMessage());
                    $totalSkipped++;
                }
            }

            $offset += $batchSize;

        } while ($records->count() === $batchSize);

        $this->info("Migration completed:");
        $this->info("  Migrated: {$totalMigrated} records");
        $this->info("  Skipped: {$totalSkipped} records");
    }

    private function recordExists($table, $data)
    {
        // Try to find existing record by primary key first
        if (isset($data['id'])) {
            return DB::table($table)->where('id', $data['id'])->exists();
        }

        // Try to find by unique fields (name, email, etc.)
        $uniqueFields = ['name', 'email', 'slug', 'code'];
        foreach ($uniqueFields as $field) {
            if (isset($data[$field])) {
                return DB::table($table)->where($field, $data[$field])->exists();
            }
        }

        return false;
    }
}
