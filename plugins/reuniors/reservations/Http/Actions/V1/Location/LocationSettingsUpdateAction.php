<?php namespace Reuniors\Reservations\Http\Actions\V1\Location;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Reservations\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;
use Illuminate\Support\Facades\Auth;

class LocationSettingsUpdateAction extends BaseAction
{
    use AsAction;

    public function rules()
    {
        return [
            'locationSlug' => ['required', 'string'],
            'timezone' => ['nullable', 'string', 'timezone'],
            'autoConfirmReservations' => ['nullable', 'boolean'],
            'pauseBetweenReservations' => ['nullable', 'integer', 'min:0', 'max:120'], // minutes
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

        // Get current settings or initialize empty array
        $currentSettings = $location->settings ?? [];
        
        // Update settings with new values
        $updatedSettings = array_merge($currentSettings, [
            'timezone' => $attributes['timezone'] ?? $currentSettings['timezone'] ?? 'Europe/Belgrade',
            'autoConfirmReservations' => $attributes['autoConfirmReservations'] ?? $currentSettings['autoConfirmReservations'] ?? false,
            'pauseBetweenReservations' => $attributes['pauseBetweenReservations'] ?? $currentSettings['pauseBetweenReservations'] ?? 0,
        ]);

        // Save the updated settings
        $location->settings = $updatedSettings;
        $location->save();

        return $updatedSettings;
    }
} 