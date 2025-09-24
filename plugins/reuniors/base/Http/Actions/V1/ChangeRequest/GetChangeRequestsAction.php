<?php namespace Reuniors\Base\Http\Actions\V1\ChangeRequest;

use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Base\Models\ChangeRequest;

class GetChangeRequestsAction extends BaseAction {
    public function rules()
    {
        return [
            'entity_type' => 'nullable|string|max:255',
            'entity_id' => 'nullable|integer',
            'status' => 'nullable|string|in:pending,approved,rejected',
            'per_page' => 'nullable|integer|min:1|max:100',
        ];
    }

    public function handle(array $attributes = [])
    {
        $entityType = $attributes['entity_type'] ?? null;
        $entityId = $attributes['entity_id'] ?? null;
        $status = $attributes['status'] ?? null;
        $perPage = $attributes['per_page'] ?? 15;

        $changeRequests = ChangeRequest::with(['creator', 'approver', 'rejector']);

        if ($entityType && $entityId) {
            $changeRequests->forEntity($entityType, $entityId);
        }

        if ($status) {
            $changeRequests->where('status', $status);
        }

        return [
            'success' => true,
            'data' => $changeRequests->orderBy('created_at', 'desc')->paginate($perPage)
        ];
    }

    public function asController(Request $request)
    {
        return $this->handle($request->all());
    }
}
