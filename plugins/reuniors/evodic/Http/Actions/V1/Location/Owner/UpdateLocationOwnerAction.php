<?php namespace Reuniors\Evodic\Http\Actions\V1\Location\Owner;

use Illuminate\Http\Request;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Evodic\Models\LocationOwner;

class UpdateLocationOwnerAction
{
    use asAction;

    public function rules()
    {
        return [
            'data' => ['required', 'array'],
            'data.first_name' => 'string',
            'data.last_name' => 'string',
            'data.city_id' => 'required',
        ];
    }

    public function handle(array $attributes, LocationOwner $locationOwner)
    {
        $data = $attributes['data'];

        $locationOwner->update($data);

        return [
            'success' => true,
            'data' => $locationOwner
        ];
    }

    public function asController(Request $request, LocationOwner $locationOwner)
    {
        $requestData = $request->all();
        return $this->handle($requestData, $locationOwner);
    }
}
