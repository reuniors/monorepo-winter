<?php namespace Reuniors\Evodic\Http\Actions\V1\Location;

use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Evodic\Models\Location;
use Reuniors\Evodic\Models\Place;
use Stevebauman\Purify\Facades\Purify;

class UpdateLocationAction extends BaseAction
{

    public function rules()
    {
        return [
            'data' => ['required', 'array'],
            'data.title' => ['string'],
            'data.city_id' => 'numeric',
            'data.description' => 'string',
            'data.wifi_password' => 'string',
        ];
    }

    public function handle(array $attributes, Location $location)
    {
        $data = Purify::clean($attributes['data']);
        $addressData = $data['address_data'] ?? [];
        $coordinates = $data['coordinates'] ?? [];
        $phoneData = $data['phone_data'] ?? [];

        if ($addressData) {
            $data['address_data'] = [
                'street' => $addressData['street'] ?? '',
                'street_number' => $addressData['street_number'] ?? '',
                'zip' => $addressData['zipCode'] ?? '',
                'municipality' => $addressData['municipality'] ?? '',
            ];
        }
        if ($coordinates) {
            $data['address_lat'] = $data['coordinates']['lat'];
            $data['address_long'] = $data['coordinates']['lng'];
            unset($data['coordinates']);
        }
        if ($phoneData) {
            $data['phone_data'] = [
                'phone_numbers' => $phoneData['phone_numbers'] ?? [],
            ];
        }

        $location->update($data);

        return [
            'success' => true,
            'data' => $location
        ];
    }

    public function asController(Request $request, Location $location)
    {
        $requestData = $request->all();
        return $this->handle($requestData, $location);
    }
}
