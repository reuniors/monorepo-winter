<?php namespace Reuniors\Base\Console;

use Illuminate\Console\Command;
use Carbon\Carbon;

class ConvertToUtcCommand extends Command
{
    protected $signature = 'reuniors:convert-to-utc 
                            {--dry-run : Show what would be converted}
                            {--table= : Convert specific table only}
                            {--plugin= : Convert specific plugin only}
                            {--batch-size=100 : Batch size for processing}
                            {--rollback : Rollback previous conversion}';

    protected $description = 'Convert time fields from Belgrade timezone to UTC';

    private $belgradeTz = 'Europe/Belgrade';
    private $utcTz = 'UTC';
    private $batchSize = 100;

    public function handle()
    {
        $this->batchSize = $this->option('batch-size');
        
        if ($this->option('rollback')) {
            return $this->rollback();
        }

        if ($this->option('dry-run')) {
            $this->info('DRY RUN MODE - No changes will be made');
        }

        $tables = $this->getTablesToProcess();
        
        foreach ($tables as $tableName => $tableConfig) {
            if ($this->shouldProcessTable($tableName)) {
                $this->convertTable($tableName, $tableConfig);
            }
        }

        $this->info('UTC conversion completed!');
    }

    private function shouldProcessTable($tableName)
    {
        $tableFilter = $this->option('table');
        $pluginFilter = $this->option('plugin');

        if ($tableFilter && $tableName !== $tableFilter) {
            return false;
        }

        if ($pluginFilter) {
            $plugin = $this->extractPluginFromTableName($tableName);
            if ($plugin !== $pluginFilter) {
                return false;
            }
        }

        return true;
    }

    private function extractPluginFromTableName($tableName)
    {
        if (strpos($tableName, 'reuniors_reservations_') === 0) {
            return 'reservations';
        }
        if (strpos($tableName, 'reuniors_evodic_') === 0) {
            return 'evodic';
        }
        if (strpos($tableName, 'reuniors_knk_') === 0) {
            return 'knk';
        }
        if (strpos($tableName, 'reuniors_base_') === 0) {
            return 'base';
        }
        if (strpos($tableName, 'reuniors_delivery_') === 0) {
            return 'delivery';
        }
        if (strpos($tableName, 'reuniors_questionnaire_') === 0) {
            return 'questionnaire';
        }
        return 'unknown';
    }

    private function getTablesToProcess()
    {
        return [
            'reuniors_reservations_working_hours' => [
                'model' => 'Reuniors\Reservations\Models\WorkingTime',
                'fields' => [
                    'time_from' => 'time_from_utc',
                    'time_to' => 'time_to_utc',
                    'pauses' => 'pauses_utc'
                ],
                'types' => [
                    'time_from' => 'time',
                    'time_to' => 'time',
                    'pauses' => 'json_pauses'
                ]
            ],
            'reuniors_reservations_location_workers_shifts' => [
                'model' => 'Reuniors\Reservations\Models\LocationWorkerShift',
                'fields' => [
                    'time_from' => 'time_from_utc',
                    'time_to' => 'time_to_utc',
                    'date' => 'date_utc',
                    'pauses' => 'pauses_utc'
                ],
                'types' => [
                    'time_from' => 'time',
                    'time_to' => 'time',
                    'date' => 'date_simple',
                    'pauses' => 'json_pauses'
                ]
            ],
            'reuniors_reservations_client_reservations' => [
                'model' => 'Reuniors\Reservations\Models\ClientReservation',
                'fields' => [
                    'date' => 'date_utc'
                ],
                'types' => [
                    'date' => 'datetime'
                ]
            ],
            'reuniors_reservations_location_worker_discounts' => [
                'model' => 'Reuniors\Reservations\Models\LocationWorkerDiscount',
                'fields' => [
                    'date_from' => 'date_from_utc',
                    'date_to' => 'date_to_utc'
                ],
                'types' => [
                    'date_from' => 'date',
                    'date_to' => 'date'
                ]
            ],
            'reuniors_reservations_news' => [
                'model' => 'Reuniors\Reservations\Models\News',
                'fields' => [
                    'activated_at' => 'activated_at_utc',
                    'deactivated_at' => 'deactivated_at_utc'
                ],
                'types' => [
                    'activated_at' => 'timestamp',
                    'deactivated_at' => 'timestamp'
                ]
            ],
            'reuniors_evodic_working_hours' => [
                'model' => 'Reuniors\Evodic\Models\WorkingTime',
                'fields' => [
                    'time_from' => 'time_from_utc',
                    'time_to' => 'time_to_utc',
                    'pauses' => 'pauses_utc'
                ],
                'types' => [
                    'time_from' => 'time',
                    'time_to' => 'time',
                    'pauses' => 'json_pauses'
                ]
            ],
            'reuniors_knk_working_hours' => [
                'model' => 'Reuniors\Knk\Models\WorkingTime',
                'fields' => [
                    'time_from' => 'time_from_utc',
                    'time_to' => 'time_to_utc',
                    'pauses' => 'pauses_utc'
                ],
                'types' => [
                    'time_from' => 'time',
                    'time_to' => 'date', // Note: KNK time_to is actually DATE type
                    'pauses' => 'json_pauses'
                ]
            ],
            'reuniors_base_change_requests' => [
                'model' => 'Reuniors\Base\Models\ChangeRequest',
                'fields' => [
                    'scheduled_date' => 'scheduled_date_utc'
                ],
                'types' => [
                    'scheduled_date' => 'date'
                ]
            ],
            'reuniors_delivery_drivers' => [
                'model' => 'Reuniors\Delivery\Models\Driver',
                'fields' => [
                    'last_seen' => 'last_seen_utc',
                    'login_date_code' => 'login_date_code_utc'
                ],
                'types' => [
                    'last_seen' => 'datetime',
                    'login_date_code' => 'timestamp'
                ]
            ],
            'reuniors_questionnaire_registration' => [
                'model' => 'Reuniors\Questionnaire\Models\QuestionnaireRegistration',
                'fields' => [
                    'deactivate_at' => 'deactivate_at_utc'
                ],
                'types' => [
                    'deactivate_at' => 'timestamp'
                ]
            ]
        ];
    }

    private function convertTable($tableName, $tableConfig)
    {
        $model = $tableConfig['model'];
        $fields = $tableConfig['fields'];
        $types = $tableConfig['types'];

        try {
            $totalRecords = $model::count();
            $this->info("Processing {$totalRecords} records for {$tableName}");

            $processed = 0;
            $errors = 0;

            $model::chunk($this->batchSize, function ($records) use ($fields, $types, &$processed, &$errors) {
                foreach ($records as $record) {
                    try {
                        $this->convertRecord($record, $fields, $types);
                        $processed++;
                    } catch (\Exception $e) {
                        $errors++;
                        $this->error("Error processing record ID {$record->id}: " . $e->getMessage());
                    }
                }
            });

            $this->info("Completed {$tableName}: {$processed} processed, {$errors} errors");
        } catch (\Exception $e) {
            $this->error("Error processing table {$tableName}: " . $e->getMessage());
        }
    }

    private function convertRecord($record, $fields, $types)
    {
        try {
            foreach ($fields as $originalField => $utcField) {
                if ($record->$originalField) {
                    $fieldType = $types[$originalField];
                    $record->$utcField = $this->convertField(
                        $record->$originalField, 
                        $fieldType
                    );
                }
            }

            if (!$this->option('dry-run')) {
                $record->save();
            }
        } catch (\Exception $e) {
            // Only show errors that are not common parsing issues
            if (strpos($e->getMessage(), 'Unexpected data found') === false) {
                $this->error("Error processing record ID {$record->id}: " . $e->getMessage());
            }
        }
    }

    private function convertField($value, $type)
    {
        switch ($type) {
            case 'time':
                return $this->convertTimeField($value);
            case 'datetime':
                return $this->convertDateTimeField($value);
            case 'date':
                return $this->convertDateField($value);
            case 'date_simple':
                return $this->convertDateFieldSimple($value);
            case 'timestamp':
                return $this->convertTimestampField($value);
            case 'json_pauses':
                return $this->convertPausesJson($value, $this->belgradeTz, $this->utcTz);
            default:
                return $value;
        }
    }

    private function convertTimeField($timeString)
    {
        if (!$timeString) {
            return null;
        }

        try {
            // Handle different time formats
            $timeFormats = ['H:i:s', 'H:i', 'G:i:s', 'G:i'];
            
            foreach ($timeFormats as $format) {
                try {
                    $dateTime = Carbon::createFromFormat($format, $timeString, $this->belgradeTz);
                    return $dateTime->setTimezone($this->utcTz)->format('H:i:s');
                } catch (\Exception $e) {
                    continue;
                }
            }
            
            // If all formats fail, try parsing as is
            $dateTime = Carbon::parse($timeString, $this->belgradeTz);
            return $dateTime->setTimezone($this->utcTz)->format('H:i:s');
        } catch (\Exception $e) {
            // Log the error but don't show it for every record to avoid spam
            if (strpos($e->getMessage(), 'Unexpected data found') !== false) {
                // This is a common Carbon parsing error, just return original
                return $timeString;
            }
            $this->error("Error parsing time '{$timeString}': " . $e->getMessage());
            return $timeString; // Return original if parsing fails
        }
    }

    private function convertDateTimeField($dateTimeString)
    {
        $dateTime = Carbon::parse($dateTimeString, $this->belgradeTz);
        return $dateTime->setTimezone($this->utcTz)->format('Y-m-d H:i:s');
    }

    private function convertDateField($dateString)
    {
        $dateTime = Carbon::createFromFormat('Y-m-d H:i:s', 
            $dateString . ' 00:00:00', 
            $this->belgradeTz
        );
        
        return $dateTime->setTimezone($this->utcTz)->format('Y-m-d');
    }

    private function convertDateFieldSimple($dateString)
    {
        // Simply copy the date without timezone conversion
        // Extract just the date part (Y-m-d) if it contains time
        if (strpos($dateString, ' ') !== false) {
            return explode(' ', $dateString)[0];
        }
        return $dateString;
    }

    private function convertTimestampField($timestampString)
    {
        $dateTime = Carbon::parse($timestampString, $this->belgradeTz);
        return $dateTime->setTimezone($this->utcTz)->format('Y-m-d H:i:s');
    }

    private function convertPausesJson($pausesData, $belgradeTz, $utcTz)
    {
        // Handle both array and JSON string inputs
        if (is_array($pausesData)) {
            $pauses = $pausesData;
        } else {
            $pauses = json_decode($pausesData, true);
            if (!is_array($pauses)) {
                return null; // Return original if not valid JSON
            }
        }

        // If empty array, return null instead of empty array
        if (empty($pauses)) {
            return [];
        }

        $convertedPauses = [];
        foreach ($pauses as $pause) {
            $convertedPause = []; // Start fresh to avoid keeping old fields
            
            // Handle timeFrom/timeTo (camelCase) or time_from/time_to (snake_case)
            $timeFrom = $pause['timeFrom'] ?? $pause['time_from'] ?? null;
            $timeTo = $pause['timeTo'] ?? $pause['time_to'] ?? null;
            
            // Convert timeFrom to timeFromUtc if it exists
            if ($timeFrom) {
                $convertedPause['timeFromUtc'] = $this->convertTimeInJson(
                    $timeFrom, 
                    $belgradeTz, 
                    $utcTz
                );
            }
            
            // Convert timeTo to timeToUtc if it exists
            if ($timeTo) {
                $convertedPause['timeToUtc'] = $this->convertTimeInJson(
                    $timeTo, 
                    $belgradeTz, 
                    $utcTz
                );
            }
            
            // Copy other fields if they exist (e.g., daysCodes, etc.)
            foreach ($pause as $key => $value) {
                // Skip original time fields
                if (!in_array($key, ['timeFrom', 'timeTo', 'time_from', 'time_to'])) {
                    $convertedPause[$key] = $value;
                }
            }
            
            $convertedPauses[] = $convertedPause;
        }

        return $convertedPauses;
    }

    private function convertTimeInJson($timeString, $belgradeTz, $utcTz)
    {
        // For JSON time fields, we need to combine with a date
        // Use current date as reference point
        $dateTime = Carbon::createFromFormat('Y-m-d H:i:s', 
            Carbon::now()->format('Y-m-d') . ' ' . $timeString, 
            $belgradeTz
        );
        
        return $dateTime->setTimezone($utcTz)->format('H:i:s');
    }

    private function rollback()
    {
        $this->info('Rolling back UTC conversion...');
        
        $tables = $this->getTablesToProcess();
        
        foreach ($tables as $tableName => $tableConfig) {
            if ($this->shouldProcessTable($tableName)) {
                $this->rollbackTable($tableName, $tableConfig);
            }
        }

        $this->info('Rollback completed!');
    }

    private function rollbackTable($tableName, $tableConfig)
    {
        $model = $tableConfig['model'];
        $fields = $tableConfig['fields'];

        try {
            $utcFields = array_values($fields);
            $updateData = array_fill_keys($utcFields, null);

            $model::query()->update($updateData);
            $this->info("Cleared UTC fields for {$tableName}");
        } catch (\Exception $e) {
            $this->error("Error rolling back table {$tableName}: " . $e->getMessage());
        }
    }
}
