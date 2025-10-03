<?php
namespace Reuniors\Reservations\Http\Actions\V1\ChangeRequest;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\ChangeRequest;
use Illuminate\Support\Facades\Log;

class ChangeRequestScheduledExecuteAction extends BaseAction
{
    public function rules() { return []; }

    public function handle(array $attributes = [])
    {
        $this->info('Starting scheduled change request execution...');

        // Get change requests that are ready for execution (approved and scheduled for today or before)
        $changeRequests = ChangeRequest::where('status', 'approved')
            ->where('scheduled_date_utc', '<=', now()->toDateString())
            ->orderBy('created_by') // Group by user to minimize user switching
            ->get();

        $this->info("Found {$changeRequests->count()} change requests ready for execution");
        
        // Group by user for better logging
        $userGroups = $changeRequests->groupBy('created_by');
        $this->info("Change requests grouped by {$userGroups->count()} different users");

        if ($changeRequests->isEmpty()) {
            $this->info('No change requests ready for execution.');
            return [
                'executed' => 0,
                'errors' => [],
                'total' => 0,
                'message' => 'No change requests ready for execution'
            ];
        }

        $errors = [];
        $successCount = 0;
        $failedCount = 0;
        $currentUserId = null;

        foreach ($changeRequests as $cr) {
            try {
                // Log user change if switching to a different user
                if ($currentUserId !== $cr->created_by) {
                    $this->info("Switching to user ID: {$cr->created_by}");
                    $currentUserId = $cr->created_by;
                }

                $this->executeChangeRequest($cr);
                $successCount++;
            } catch (\Exception $e) {
                $errors[] = [
                    'changeRequestId' => $cr->id,
                    'entity' => $cr->entity_type . ':' . $cr->entity_id,
                    'error' => $e->getMessage()
                ];

                $cr->markAsFailed($e->getMessage());
                $failedCount++;

                Log::error('Change request execution failed', [
                    'cr_id' => $cr->id,
                    'entity_type' => $cr->entity_type,
                    'entity_id' => $cr->entity_id,
                    'action_class' => $cr->action_class,
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);

                $this->error("Failed to execute change request: {$cr->id} - {$e->getMessage()}");
            }
        }

        // Send email report if there were errors
        if (!empty($errors)) {
            $this->sendExecutionReportEmail($successCount, $failedCount, $errors);
        }

        $result = [
            'executed' => $successCount,
            'failed' => $failedCount,
            'errors' => $errors,
            'total' => $changeRequests->count(),
            'message' => "Executed: {$successCount}, Failed: {$failedCount}, Total: {$changeRequests->count()}"
        ];

        $this->info("Execution complete: {$successCount} successful, {$failedCount} failed");
        
        return $result;
    }

    protected function executeChangeRequest(ChangeRequest $cr)
    {
        // Use the dedicated user context action
        $userContextAction = new ChangeRequestUserContextAction();
        return $userContextAction->executeInUserContext($cr, function() use ($cr) {
            if (!class_exists($cr->action_class)) {
                throw new \Exception("Action class {$cr->action_class} not found");
            }

            // Create new instance of the action class
            $action = new $cr->action_class();
            
            // Execute the action with the stored data
            return $action->handle($cr->action_data);
        });
    }

    protected function sendExecutionReportEmail($successCount, $failedCount, $errors)
    {
        // Implementation for sending email report
        // Use Winter CMS mail system or log for now
        Log::info('Change request execution report', [
            'success_count' => $successCount,
            'failed_count' => $failedCount,
            'total_errors' => count($errors),
            'errors' => $errors,
            'execution_date' => now()->toDateString()
        ]);
    }

    // Helper methods for console output
    protected function info($message)
    {
        if (app()->runningInConsole()) {
            $this->output?->info($message);
        }
        Log::info($message);
    }

    protected function error($message)
    {
        if (app()->runningInConsole()) {
            $this->output?->error($message);
        }
        Log::error($message);
    }
} 