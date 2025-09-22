<?php namespace Reuniors\Base\Http\Actions\V1\ChangeRequest;

use Illuminate\Http\Request;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Base\Models\ChangeRequest;

class CreateChangeRequestAction
{
    use AsAction;

    public function rules()
    {
        return [
            'entity_type' => 'required|string|max:255',
            'entity_id' => 'required|integer',
            'field_name' => 'required|string|max:255',
            'old_value' => 'nullable|string',
            'new_value' => 'required|string',
        ];
    }

    public function handle(array $data)
    {
        $data['created_by'] = auth()->id();
        $data['status'] = 'pending';

        $changeRequest = ChangeRequest::create($data);

        return [
            'success' => true,
            'data' => $changeRequest->load('creator'),
            'message' => 'Change request created successfully'
        ];
    }

    public function asController(Request $request)
    {
        return $this->handle($request->all());
    }
}
