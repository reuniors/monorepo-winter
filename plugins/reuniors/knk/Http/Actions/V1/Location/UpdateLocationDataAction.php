<?php namespace reuniors\knk\Http\Actions\V1\Location;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Classes\S;
use Reuniors\Knk\Models\Location;
use Stevebauman\Purify\Facades\Purify;

class UpdateLocationDataAction extends BaseAction {
    public function rules()
    {
        return [
            'data' => 'array',
            'data.title' => 'string',
            'data.text' => 'string',
            'data.gov_support' => ['boolean', 'nullable'],
            'data.addressData' => 'array',

            'workingTime' => 'array',
            'workingTime.*.time_from' => ['date_format:H:i:s', 'required'],
            'workingTime.*.time_to' => ['date_format:H:i:s', 'required'],
            'workingTime.*.name' => 'string',
            'workingTime.*.days_codes' => ['array', 'in:mon,tue,wed,thu,fri,sat,sun'],
            'workingTime.*.active' => 'boolean',

            'deliveryWorkingTime' => 'array',
            'deliveryWorkingTime.*.time_from' => ['date_format:H:i:s', 'required'],
            'deliveryWorkingTime.*.time_to' => ['date_format:H:i:s', 'required'],
            'deliveryWorkingTime.*.name' => 'string',
            'deliveryWorkingTime.*.days_codes' => ['array', 'in:mon,tue,wed,thu,fri,sat,sun'],
            'deliveryWorkingTime.*.active' => 'boolean',

            'categories' => 'array',
            'categories.*' => 'numeric',
        ];
    }

    public function handle(array $attributes = [], Location $location = null)
    {
        $data = Purify::clean($attributes['data']);
        $workingHours = $attributes['workingTime'] ?? [];
        $deliveryWorkingHours = $attributes['deliveryWorkingTime'] ?? [];
        $addressData = $data['address_data'] ?? [];
        $coordinates = $data['coordinates'] ?? [];
        $phoneData = $data['phone_data'] ?? [];
        $categories = $attributes['categories'] ?? [];

        if ($addressData) {
            $data['address_data'] = [
                'google_url' => $addressData['google_url'] ?? null,
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
                'phone_1' => $phoneData['phone_numbers'][0] ?? '',
                'phone_2' => $phoneData['phone_numbers'][1] ?? '',
                'mobile_1' => $phoneData['phone_numbers'][2] ?? '',
                'mobile_2' => $phoneData['phone_numbers'][3] ?? '',
                'delivery_1' => $phoneData['delivery_phone_numbers'][0] ?? '',
                'delivery_2' => $phoneData['delivery_phone_numbers'][1] ?? '',
            ];
        }

        if (isset($data['title'])) {
            $data['name'] = S::camel($data['title']);
            if (!$location->slug) {
                $data['slug'] = S::slug($data['title']);
            }
        }

        $location->update([
            ...$data,
        ]);

        if (!empty($workingHours)) {
            $location->load(['working_time']);
            $location->syncWorkingHours($workingHours, 'working_time');
        }

        if (!empty($deliveryWorkingHours)) {
            $location->load(['delivery_working_time']);
            $location->syncWorkingHours($deliveryWorkingHours, 'delivery_working_time');
        }

        if (!empty($categories)) {
            $location->categories()->sync($categories);
        }

        return $location;
    }

    public function asController(Location $location = null): array
    {
        return parent::asController($location);
    }
}
