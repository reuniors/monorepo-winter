<?php namespace Reuniors\Base\Http\Actions\V1\ChangeRequest;

use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Base\Models\ChangeRequest;

class ApproveChangeRequestAction extends BaseAction {
    public function rules()
    {
        return [
            'id' => 'required|integer|exists:reuniors_base_change_requests,id',
        ];
    }

    public function handle(array $attributes = [])
    {
        $changeRequest = ChangeRequest::findOrFail($attributes['id']);
        
        if ($changeRequest->status !== 'pending') {
            throw new \Exception('Change request is not pending');
        }

        $changeRequest->update([
            'status' => 'approved',
            'approved_by' => auth()->id()
        ]);

        return $changeRequest->load(['creator', 'approver']);
    }
}
