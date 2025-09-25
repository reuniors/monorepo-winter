<?php namespace Reuniors\Base\Http\Actions\V1\ChangeRequest;

use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Base\Models\ChangeRequest;

class RejectChangeRequestAction extends BaseAction {
    public function rules()
    {
        return [
            'id' => 'required|integer|exists:reuniors_base_change_requests,id',
            'rejection_reason' => 'nullable|string|max:1000',
        ];
    }

    public function handle(array $attributes = [])
    {
        $changeRequest = ChangeRequest::findOrFail($attributes['id']);
        
        if ($changeRequest->status !== 'pending') {
            throw new \Exception('Change request is not pending');
        }

        $changeRequest->update([
            'status' => 'rejected',
            'rejected_by' => auth()->id(),
            'rejection_reason' => $attributes['rejection_reason'] ?? null
        ]);

        return $changeRequest->load(['creator', 'rejector']);
    }
}
