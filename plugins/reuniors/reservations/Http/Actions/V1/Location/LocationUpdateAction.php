<?php namespace Reuniors\Reservations\Http\Actions\V1\Location;

use Google\Service\CloudSearch\Emoji;
use Reuniors\Base\Http\Actions\BaseAction;
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
            'isPrivate' => ['nullable', 'boolean'],
            'hasMultipleActivities' => ['nullable', 'boolean'],
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
            'pwaMetadata' => ['nullable', 'array'],
            'pwaMetadata.name' => ['nullable', 'string', 'max:255'],
            'pwaMetadata.shortName' => ['nullable', 'string', 'max:255'],
            'pwaMetadata.themeColor' => ['nullable', 'string', 'regex:/^#[0-9A-Fa-f]{6}$/'],
            'pwaMetadata.backgroundColor' => ['nullable', 'string', 'regex:/^#[0-9A-Fa-f]{6}$/'],
            'pwaMetadata.scope' => ['nullable', 'string', 'max:255'],
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
        $isAdmin = true; // $user && in_array($user->groups->pluck('code')->toArray(), ['admin']);
        
        // Map camelCase to snake_case for database fields
        if (isset($attributes['isPrivate'])) {
            $attributes['is_private'] = $attributes['isPrivate'];
            unset($attributes['isPrivate']);
        }
        
        if (isset($attributes['hasMultipleActivities'])) {
            $attributes['has_multiple_activities'] = $attributes['hasMultipleActivities'];
            unset($attributes['hasMultipleActivities']);
        }
        
        // Remove fields that non-admin users can't update
        if (!$isAdmin) {
            unset($attributes['slug']);
            unset($attributes['active']);
            unset($attributes['is_private']);
            unset($attributes['has_multiple_activities']);
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

        // Update slug, active status, and isPrivate only for admins
        if ($isAdmin) {
            $updateFields['slug'] = $attributes['slug'] ?? $location->slug;
            if (isset($attributes['active'])) {
                $updateFields['active'] = $attributes['active'];
            }
            if (isset($attributes['is_private'])) {
                $updateFields['is_private'] = $attributes['is_private'];
            }
            if (isset($attributes['has_multiple_activities'])) {
                $updateFields['has_multiple_activities'] = $attributes['has_multiple_activities'];
            }
            if (isset($attributes['pwaMetadata'])) {
                $existingPwaMetadata = $location->pwa_metadata ?? [];
                $attributesPwaMetadata = $attributes['pwaMetadata'] ?? [];
                
                // Use values from attributes first, then fall back to existing, then defaults
                $pwaMetadata = $existingPwaMetadata ?? [];
                if ($attributesPwaMetadata['name']) {
                    $pwaMetadata['name'] = $attributesPwaMetadata['name'];
                } else {
                    $pwaMetadata['name'] = $pwaMetadata['name'] ?? ($location->title . ' ' . 'RZR.rs');
                }
                if ($attributesPwaMetadata['shortName']) {
                    $pwaMetadata['short_name'] = $attributesPwaMetadata['shortName'];
                } else {
                    $pwaMetadata['short_name'] = $pwaMetadata['short_name'] ?? $location->title;
                }
                if ($attributesPwaMetadata['themeColor']) {
                    $pwaMetadata['theme_color'] = $attributesPwaMetadata['themeColor'];
                } else {
                    $pwaMetadata['theme_color'] = $pwaMetadata['theme_color'] ?? '#000000';
                }
                if ($attributesPwaMetadata['backgroundColor']) {
                    $pwaMetadata['background_color'] = $attributesPwaMetadata['backgroundColor'];
                } else {
                    $pwaMetadata['background_color'] = $pwaMetadata['background_color'] ?? '#000000';
                }
                if ($attributesPwaMetadata['scope']) {
                    $pwaMetadata['scope'] = $attributesPwaMetadata['scope'];
                } else {
                    $pwaMetadata['scope'] = $pwaMetadata['scope'] ?? '/zakazivanje';
                }

                $updateFields['pwa_metadata'] = $pwaMetadata;
            }
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