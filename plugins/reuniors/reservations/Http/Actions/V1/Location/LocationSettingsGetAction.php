<?php namespace Reuniors\Reservations\Http\Actions\V1\Location;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;

class LocationSettingsGetAction extends BaseAction
{
    public function rules()
    {
        return [
            'locationSlug' => ['required', 'string'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $locationSlug = $attributes['locationSlug'];
        
        // Find the location
        $location = Location::where('slug', $locationSlug)->firstOrFail();

        // Get current settings or return defaults
        $settings = $location->settings ?? [];
        
        // Return settings with defaults if not set
        return [
            'timezone' => $settings['timezone'] ?? 'Europe/Belgrade',
            'autoConfirmReservations' => $settings['autoConfirmReservations'] ?? false,
            'pauseBetweenReservations' => $settings['pauseBetweenReservations'] ?? 10, // Default: 10 minutes (same as frontend)
        ];
    }
}

