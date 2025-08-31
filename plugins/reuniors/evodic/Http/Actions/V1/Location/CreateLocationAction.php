<?php namespace Reuniors\Evodic\Http\Actions\V1\Location;

use Illuminate\Http\Request;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Evodic\Classes\Helpers\S;
use reuniors\evodic\Enums\PlaceStatus;
use Reuniors\Evodic\Models\Location;
use Reuniors\Evodic\Models\Place;

class CreateLocationAction
{
    use asAction;

    public function rules()
    {
        return [
            'ownerId' => ['numeric'],
            'data' => ['required', 'array'],
            'data.title' => ['required', 'string'],
            'data.city_id' => 'required',
            'data.description' => 'string',
            'data.wifi_password' => 'string',
        ];
    }

    public function handle(array $attributes = [])
    {
        $data = $attributes['data'];
        $cityId = $data['city_id'];
        $ownerId = $attributes['ownerId'];

        $newLocation = Location::create([
            'title' => $data['title'],
            'description' => $data['description'],
            'name' => S::camel($data['title']),
            'slug' => hash('sha256', $data['title']),
            'active' => true,
            'city_id' => $cityId,
            'main_owner_id' => $ownerId,
            'wifi_password' => $data['wifi_password'],
            'address_data' => [
                'street' => '',
                'street_number' => '',
                'zip' => '',
                'municipality' => '',
            ],
            'phone_data' => [
                'phone_numbers' => [],
            ],
//            'status' => PlaceStatus::DRAFT
        ]);

        if ($ownerId) {
            $newLocation->location_owners()->attach($ownerId);
        }

        return [
            'success' => true,
            'data' => $newLocation
        ];
    }

    public function asController(Request $request)
    {
        $requestData = $request->all();
        return $this->handle($requestData);
    }
}
