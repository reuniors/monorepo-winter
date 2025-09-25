<?php

namespace Reuniors\Reservations\Http\Actions\V1\ChangeRequest;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\ChangeRequest;

class ChangeRequestGetEntityAction extends BaseAction
{
    public function rules()
    {
        return [
            'entityType' => 'required|string|max:50',
            'entityId' => 'required|string|max:100',
        ];
    }

    public function handle(array $attributes = [])
    {
        $entityType = $attributes['entityType'];
        $entityId = $attributes['entityId'];

        $changeRequests = ChangeRequest::where('entity_type', $entityType)
            ->where('entity_id', $entityId)
            ->whereIn('status', ['pending', 'approved'])
            ->orderBy('scheduled_date', 'asc')
            ->get();

        return $changeRequests->map(function ($changeRequest) {
            return [
                'id' => $changeRequest->id,
                'entity_type' => $changeRequest->entity_type,
                'entity_id' => $changeRequest->entity_id,
                'action_class' => $changeRequest->action_class,
                'data' => $changeRequest->data,
                'action_data' => $changeRequest->action_data,
                'change_type' => $changeRequest->change_type,
                'scheduled_date' => $changeRequest->scheduled_date->toDateString(),
                'status' => $changeRequest->status,
                'created_by' => $changeRequest->created_by,
                'created_at' => $changeRequest->created_at->toISOString(),
                'updated_at' => $changeRequest->updated_at->toISOString(),
            ];
        });
    }
} 