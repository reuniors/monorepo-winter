<?php
namespace Reuniors\Reservations\Console;

use Illuminate\Console\Command;
use Reuniors\Reservations\Models\ChangeRequest;
use Reuniors\Reservations\Http\Actions\V1\ChangeRequest\ChangeRequestExecuteAction;

class ExecuteChangeRequests extends Command
{
    protected $signature = 'change-requests:execute {--date= : Specific date to process}';
    protected $description = 'Execute pending change requests for today';

    public function handle()
    {
        $date = $this->option('date') ?? now()->toDateString();

        $this->info("Processing change requests for: {$date}");

        $action = new ChangeRequestExecuteAction();
        $result = $action->handle(['date' => $date]);

        // Comprehensive reporting
        $this->table(
            ['Metric', 'Count'],
            [
                ['Total', $result['total']],
                ['Executed', $result['executed']],
                ['Failed', count($result['errors'])],
                ['Skipped', $result['total'] - $result['executed'] - count($result['errors'])]
            ]
        );

        if (!empty($result['errors'])) {
            $this->error('Some change requests failed. Check logs for details.');
            return 1;
        }

        return 0;
    }
} 