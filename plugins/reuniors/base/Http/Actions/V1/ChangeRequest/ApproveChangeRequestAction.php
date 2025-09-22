<?php namespace Reuniors\Base\Http\Actions\V1\ChangeRequest;

use Illuminate\Http\Request;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Base\Models\ChangeRequest;

class ApproveChangeRequestAction
{
    use AsAction;

    public function rules()
    {
        return [
            'id' => 'required|integer|exists:reuniors_base_change_requests,id',
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
            'status' => 'approved',
            'approved_by' => auth()->id()
        ]);

        return [
            'success' => true,
            'data' => $changeRequest->load(['creator', 'approver']),
            'message' => 'Change request approved successfully'
        ];
    }

    public function asController(Request $request)
    {
        return $this->handle($request->all());
    }
}
