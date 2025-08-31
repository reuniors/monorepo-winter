<?php namespace reuniors\evodic\Http\Actions\V1\Place;

use Illuminate\Http\Request;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Evodic\Classes\Helpers\S;
use Reuniors\Evodic\Models\Place;
use Stevebauman\Purify\Facades\Purify;

class UpdatePlaceAction
{
    use asAction;

    public function rules()
    {
        return [
            'data' => ['required', 'array'],
            'data.title' => ['string'],
            'data.city_id' => 'numeric',
            'data.description' => 'string',
            'data.place_type_id' => 'numeric',
        ];
    }

    public function handle(array $attributes, Place $place)
    {
        $data = Purify::clean(array_filter($attributes['data']));
        $workingHours = $attributes['workingTime'] ?? [];
        $deliveryWorkingHours = $attributes['deliveryWorkingTime'] ?? [];
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
                'delivery_phone_numbers' => $phoneData['delivery_phone_numbers'] ?? [],
                'delivery_show_number' => $phoneData['show_delivery_phone_numbers'] ?? false,
            ];
        }
        if (isset($data['title'])) {
            $data['name'] = S::camel($data['title']);
            $data['slug'] = S::slug($data['title']);
        }

        $place->update([
            ...$data,
        ]);

        if (!empty($workingHours)) {
            $place->load(['working_hours']);
            $place->syncWorkingHours($workingHours, 'working_hours');
        }

        if (!empty($deliveryWorkingHours)) {
            $place->load(['delivery_working_hours']);
            $place->syncWorkingHours($deliveryWorkingHours, 'delivery_working_hours');
        }

        return [
            'success' => true,
            'data' => $place
        ];
    }

    public function asController(Request $request, Place $place)
    {
        $requestData = $request->all();
        return $this->handle($requestData, $place);
    }
}
