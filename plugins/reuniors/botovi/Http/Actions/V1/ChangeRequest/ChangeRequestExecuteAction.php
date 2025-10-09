<?php namespace Reuniors\Botovi\Http\Actions\V1\ChangeRequest;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Botovi\Models\ChangeRequest;
use Illuminate\Support\Facades\Log;

class ChangeRequestExecuteAction extends BaseAction
{
    public function rules() 
    { 
        return []; 
    }

    public function handle(array $attributes = [])
    {
        $changeRequests = ChangeRequest::readyForExecution()
            ->orderBy('created_by')
            ->get();
            
        if ($changeRequests->isEmpty()) {
            Log::info('No change requests ready for execution');
            return [
                'executed' => 0,
                'errors' => [],
                'total' => 0
            ];
        }

        Log::info("Found {$changeRequests->count()} change requests ready for execution");
        
        // Group by user for better logging
        $userGroups = $changeRequests->groupBy('created_by');
        Log::info("Change requests grouped by {$userGroups->count()} different users");

        $errors = [];
        $successCount = 0;
        $currentUserId = null;

        foreach ($changeRequests as $cr) {
            try {
                // Log user change if switching to a different user
                if ($currentUserId !== $cr->created_by) {
                    Log::info("Switching to user ID: {$cr->created_by}");
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
                Log::error('Change request execution failed', [
                    'cr_id' => $cr->id,
                    'entity_type' => $cr->entity_type,
                    'entity_id' => $cr->entity_id,
                    'action_class' => $cr->action_class,
                    'error' => $e->getMessage()
                ]);
            }
        }

        // Send email with results
        if (!empty($errors)) {
            $this->sendExecutionReportEmail($successCount, $errors);
        }

        return [
            'executed' => $successCount,
            'errors' => $errors,
            'total' => $changeRequests->count()
        ];
    }

    protected function executeChangeRequest(ChangeRequest $cr)
    {
        if (!class_exists($cr->action_class)) {
            throw new \Exception("Action class {$cr->action_class} not found");
        }

        $action = new $cr->action_class();
        return $action->handle($cr->action_data);
    }

    protected function sendExecutionReportEmail($successCount, $errors)
    {
        // Implementation for sending email report
        // Use Winter CMS mail system
        Log::info('Change request execution report', [
            'success_count' => $successCount,
            'error_count' => count($errors),
            'errors' => $errors
        ]);
    }
}
