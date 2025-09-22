<?php namespace Reuniors\Base\Http\Actions\V1\ChangeRequest;

use Illuminate\Http\Request;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Base\Models\ChangeRequest;

class RejectChangeRequestAction
{
    use AsAction;

    public function rules()
    {
        return [
            'id' => 'required|integer|exists:reuniors_base_change_requests,id',
            'rejection_reason' => 'nullable|string|max:1000',
        ];
    }

    public function handle(array $data)
    {
        $changeRequest = ChangeRequest::findOrFail($data['id']);
        
        if ($changeRequest->status !== 'pending') {
            return [
                'success' => false,
                'message' => 'Change request is not pending'
            ];
        }

        $changeRequest->update([
            'status' => 'rejected',
            'rejected_by' => auth()->id(),
            'rejection_reason' => $data['rejection_reason'] ?? null
        ]);

        return [
            'success' => true,
            'data' => $changeRequest->load(['creator', 'rejector']),
            'message' => 'Change request rejected successfully'
        ];
    }

    public function asController(Request $request)
    {
        return $this->handle($request->all());
    }
}
