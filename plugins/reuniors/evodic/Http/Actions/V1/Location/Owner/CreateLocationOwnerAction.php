<?php namespace Reuniors\Evodic\Http\Actions\V1\Location\Owner;

use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use reuniors\evodic\Enums\OwnerStatus;
use Reuniors\Evodic\Models\LocationOwner;

class CreateLocationOwnerAction extends BaseAction
{

    /*
     *
        'first_name',
        'last_name',
        'city_id',
        'address_data',
        'metadata',
        'user_id',
        'level',
        'status',
        'is_active',
     */

    public function rules()
    {
        return [
            'data' => ['required', 'array'],
            'data.first_name' => 'string',
            'data.last_name' => 'string',
            'data.city_id' => 'numeric',
        ];
    }

    public function handle(array $attributes = [])
    {
        $data = $attributes['data'];
        $cityId = $data['city_id'];

        $newLocationOwner = LocationOwner::create([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'city_id' => $cityId,
            'phone_data' => $data['phone_data'],
            'level' => 0,
            'status' => OwnerStatus::WITHOUT_USER,
            'is_active' => true,
        ]);

        return [
            'success' => true,
            'data' => $newLocationOwner
        ];
    }

    public function asController(Request $request)
    {
        $requestData = $request->all();
        return $this->handle($requestData);
    }
}
