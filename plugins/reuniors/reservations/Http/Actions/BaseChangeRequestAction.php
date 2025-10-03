<?php
namespace Reuniors\Reservations\Http\Actions;

use Reuniors\Reservations\Models\ChangeRequest;
use Reuniors\Base\Http\Actions\BaseAction;
use Auth;

abstract class BaseChangeRequestAction extends BaseAction
{
    protected $maxChangeRequestsPerDate = 3;

    public function rules()
    {
        // Get rules from child class if it has a rules method
        $rules = method_exists($this, 'getChildRules') ? $this->getChildRules() : [];

        // Add optional change request date parameter
        $rules['changeRequestDateUtc'] = 'nullable|date|after:today';

        return $rules;
    }

    public function handle(array $attributes = [])
    {
        $changeRequestData = $attributes['change_request'] ?? null;

        if ($changeRequestData && $changeRequestData['is_enabled'] && $changeRequestData['scheduled_date_utc']) {
            unset($attributes['change_request']);
            return $this->handleChangeRequest($attributes, $changeRequestData);
        }

        return $this->executeAction($attributes);
    }

    protected function handleChangeRequest(array $attributes, array $scheduledData)
    {
        $scheduledDateUtc = $scheduledData['scheduled_date_utc'] ?? null;
        $isEnabled = $scheduledData['is_enabled'] ?? false;

        if (!$isEnabled) {
            return $this->executeAction($attributes);
        }

        // Check for existing change request for this entity and date
        $entityId = $this->getEntityId($attributes);
        $existingChangeRequest = ChangeRequest::where('scheduled_date_utc', $scheduledDateUtc)
            ->where('entity_type', $this->getEntityType())
            ->when($entityId, function($query) use ($entityId) {
                return $query->where('entity_id', $entityId);
            })
            ->where('change_type', $this->getChangeType($attributes))
            ->first();

        if ($existingChangeRequest) {
            // Update existing change request
            return $this->updateChangeRequest($existingChangeRequest, $attributes, $scheduledDateUtc);
        }

        // Check limits for new change requests
        $existingCount = ChangeRequest::where('scheduled_date_utc', $scheduledDateUtc)
            ->where('entity_type', $this->getEntityType())
            ->when($entityId, function($query) use ($entityId) {
                return $query->where('entity_id', $entityId);
            })
            ->count();

        if ($existingCount >= $this->maxChangeRequestsPerDate) {
            throw new \Exception("Maximum change requests ({$this->maxChangeRequestsPerDate}) reached for this date and entity.");
        }

        // Create new change request
        return $this->createChangeRequest($attributes, $scheduledDateUtc);
    }

    protected function createChangeRequest(array $attributes, string $scheduledDateUtc)
    {
        $userData = Auth::getUser();

        $changeRequest = ChangeRequest::create([
            'entity_type' => $this->getEntityType(),
            'entity_id' => $this->getEntityId($attributes),
            'action_class' => static::class,
            'data' => $attributes,
            'action_data' => $attributes,
            'change_type' => $this->getChangeType($attributes),
            'scheduled_date_utc' => $scheduledDateUtc,
            'status' => 'pending',
            'created_by' => $userData->id
        ]);

        return [
            'success' => true,
            'message' => 'Change request created successfully',
            'changeRequestId' => $changeRequest->id,
            'scheduledDateUtc' => $scheduledDateUtc
        ];
    }

    protected function updateChangeRequest(ChangeRequest $changeRequest, array $attributes, string $scheduledDateUtc)
    {
        // Update the existing change request with new data
        $changeRequest->update([
            'data' => $attributes, // model data
            'action_data' => $attributes, // action-specific data
            'scheduled_date_utc' => $scheduledDateUtc,
            'status' => 'pending', // Reset to pending since it's a new change
            'updated_at' => now(),
        ]);

        return [
            'success' => true,
            'message' => 'Change request updated successfully',
            'changeRequestId' => $changeRequest->id,
            'scheduledDateUtc' => $scheduledDateUtc
        ];
    }

    protected function executeAction(array $attributes)
    {
        // Abstract method - each child action must implement
        return $this->performAction($attributes);
    }

    // Abstract methods that child actions must implement
    abstract protected function getEntityType(): string;
    abstract protected function getEntityClass(): string;
    abstract protected function performAction(array $attributes);

    // Helper methods that can be overridden
    protected function getEntityId(array $attributes): ?string
    {
        return $attributes['id'] ?? $attributes['entityId'] ?? null;
    }

    protected function getChangeType(array $attributes): string
    {
        // Default to update, can be overridden
        return 'update';
    }
}
