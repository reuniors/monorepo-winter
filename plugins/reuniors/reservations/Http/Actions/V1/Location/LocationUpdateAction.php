<?php namespace Reuniors\Reservations\Http\Actions\V1\Location;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;
use Illuminate\Support\Facades\Auth;

class LocationUpdateAction extends BaseAction
{
    public function rules()
    {
        return [
            'locationSlug' => ['required', 'string'],
            'title' => ['nullable', 'string', 'max:255'],
            'slug' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'snippet' => ['nullable', 'string'],
            'active' => ['nullable', 'boolean'],
            'addressData' => ['nullable', 'array'],
            'addressData.street' => ['nullable', 'string'],
            'addressData.street_number' => ['nullable', 'string'],
            'addressData.municipality' => ['nullable', 'string'],
            'phoneData' => ['nullable', 'array'],
            'phoneData.phoneNumbers' => ['nullable', 'array'],
            'phoneData.phoneNumbers.*' => ['nullable', 'string'],
            'addressLat' => ['nullable', 'numeric'],
            'addressLong' => ['nullable', 'numeric'],
            'wifiPassword' => ['nullable', 'string'],
            'googleMapUrl' => ['nullable', 'url'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $locationSlug = $attributes['locationSlug'];
        
        // Find the location
        $location = Location::where('slug', $locationSlug)->first();
        
        if (!$location) {
            throw new \Exception('Location not found');
        }

        // Check if user has permission to update slug and active status (admin only)
        $user = Auth::getUser();
        $isAdmin = $user && in_array($user->group->code, ['admin']);
        
        // Remove fields that non-admin users can't update
        if (!$isAdmin) {
            unset($attributes['slug']);
            unset($attributes['active']);
        }

        // Update basic fields
        $updateFields = [
            'title' => $attributes['title'] ?? $location->title,
            'description' => $attributes['description'] ?? $location->description,
            'snippet' => $attributes['snippet'] ?? $location->snippet,
            'wifi_password' => $attributes['wifiPassword'] ?? $location->wifi_password,
            'google_map_url' => $attributes['googleMapUrl'] ?? $location->google_map_url,
            'address_lat' => $attributes['addressLat'] ?? $location->address_lat,
            'address_long' => $attributes['addressLong'] ?? $location->address_long,
        ];

        // Update slug and active status only for admins
        if ($isAdmin) {
            $updateFields['slug'] = $attributes['slug'] ?? $location->slug;
            $updateFields['active'] = $attributes['active'] ?? $location->active;
        }

        // Update address data
        if (isset($attributes['addressData'])) {
            $currentAddressData = $location->address_data ?? [];
            $updateFields['address_data'] = array_merge($currentAddressData, $attributes['addressData']);
        }

        // Update phone data
        if (isset($attributes['phoneData'])) {
            $currentPhoneData = $location->phone_data ?? [];
            $updateFields['phone_data'] = array_merge($currentPhoneData, $attributes['phoneData']);
        }

        // Update the location
        $location->fill($updateFields);
        $location->save();

        return $location;
    }
} 