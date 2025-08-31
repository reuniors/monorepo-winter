<?php

namespace Reuniors\Reservations\Http\Actions\V1\ChangeRequest;

use Reuniors\Reservations\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\ChangeRequest;
use Illuminate\Support\Facades\Auth;
use RainLab\User\Models\User;
use Illuminate\Support\Facades\Log;

class ChangeRequestUserContextAction extends BaseAction
{
    public function rules()
    {
        return [
            'changeRequest' => 'required|exists:reuniors_reservations_change_requests,id'
        ];
    }

    public function handle(array $attributes = [])
    {
        $changeRequest = ChangeRequest::find($attributes['changeRequest']);
        
        if (!$changeRequest) {
            throw new \Exception("Change request not found");
        }

        return $this->executeInUserContext($changeRequest, function() use ($changeRequest) {
            // This closure will be executed in the user's context
            return $this->executeChangeRequest($changeRequest);
        });
    }

    /**
     * Execute a callback in the context of a specific user
     */
    public function executeInUserContext(ChangeRequest $changeRequest, callable $callback)
    {
        // Get the user who created the change request
        $user = User::find($changeRequest->created_by);
        if (!$user) {
            throw new \Exception("User who created change request not found: {$changeRequest->created_by}");
        }

        // Store the current authenticated user (if any)
        $currentUser = Auth::getUser();
        
        try {
            // Login as the user who created the change request
            Auth::login($user);
            
            Log::info("Executing change request {$changeRequest->id} as user: {$user->email} (ID: {$user->id})");

            // Execute the callback in the user's context
            $result = $callback();

            // Mark as executed
            $changeRequest->markAsExecuted();

            Log::info("Successfully executed change request {$changeRequest->id}");

            return $result;
        } finally {
            // Restore the original user (if there was one)
            if ($currentUser) {
                Auth::login($currentUser);
                Log::info("Restored original user: {$currentUser->email}");
            } else {
                Auth::logout();
                Log::info("Logged out - no original user to restore");
            }
        }
    }

    /**
     * Execute a change request action
     */
    protected function executeChangeRequest(ChangeRequest $changeRequest)
    {
        if (!class_exists($changeRequest->action_class)) {
            throw new \Exception("Action class {$changeRequest->action_class} not found");
        }

        // Create new instance of the action class
        $action = new $changeRequest->action_class();
        
        // Execute the action with the stored data
        return $action->handle($changeRequest->action_data);
    }
} 