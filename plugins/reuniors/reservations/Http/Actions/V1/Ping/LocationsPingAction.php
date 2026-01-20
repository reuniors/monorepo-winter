<?php

namespace Reuniors\Reservations\Http\Actions\V1\Ping;

use Reuniors\Base\Http\Actions\V1\BasePingAction;
use Reuniors\Reservations\Models\Location;

class LocationsPingAction extends BasePingAction
{
    /**
     * Override handle to bypass BasePingAction cache
     * This ensures we always get fresh data when location settings change
     */
    public function handle(array $attributes = [], $lastCheck = null)
    {
        // Always generate fresh data (bypass BasePingAction cache)
        // This ensures we detect changes immediately when location settings change
        $cachedData = $this->generateCacheData($attributes);

        // Check for changes using hash comparison
        $hasChanges = $this->checkForChanges($cachedData, $lastCheck);

        return $this->formatResponse($cachedData, $hasChanges);
    }

    public function rules()
    {
        return [
            'locationSlug' => ['required', 'string'],
        ];
    }

    protected function getCacheKeyPrefix(): string
    {
        return 'location_settings_cache';
    }

    protected function getAdditionalCacheKeyParts(array $attributes): array
    {
        // Include locationSlug in cache key
        return isset($attributes['locationSlug']) ? [$attributes['locationSlug']] : [];
    }

    protected function generateCacheData(array $attributes): array
    {
        $locationSlug = $attributes['locationSlug'] ?? null;

        if (!$locationSlug) {
            return $this->buildCacheData(null, 0);
        }

        // Find the location with all relations (same as LocationGetOneAction)
        $location = Location::getFeData(['slug' => $locationSlug])->first();

        if (!$location) {
            return $this->buildCacheData(null, 0);
        }

        // Get current settings or return defaults
        $settings = $location->settings ?? [];
        
        // Build settings with defaults for hash generation
        $locationSettings = [
            'timezone' => $settings['timezone'] ?? 'Europe/Belgrade',
            'autoConfirmReservations' => $settings['autoConfirmReservations'] ?? false,
            'pauseBetweenReservations' => $settings['pauseBetweenReservations'] ?? 0,
        ];

        // Generate hash from settings JSON (consistent hash generation)
        $settingsJson = json_encode($locationSettings, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        $hash = md5($settingsJson);

        // Get last updated timestamp from location
        $lastUpdated = $location->updated_at ? strtotime($location->updated_at) : time();

        // Return full location data - frontend will extract what it needs
        return [
            'lastUpdated' => $lastUpdated,
            'count' => 1, // Always 1 location
            'hash' => $hash,
            'data' => $location->toArray(), // Full location data with all relations
        ];
    }

    /**
     * Override checkForChanges to use hash instead of just lastUpdated
     * This is important because settings can change without updating location->updated_at
     */
    protected function checkForChanges(array $cachedData, $lastCheck): bool
    {
        // If we have a lastCheck hash, compare it with current hash
        if ($lastCheck && is_array($lastCheck) && isset($lastCheck['hash'])) {
            return ($cachedData['hash'] ?? null) !== ($lastCheck['hash'] ?? null);
        }

        // Fallback to timestamp comparison (for first check)
        if ($lastCheck) {
            $lastCheckInSeconds = is_numeric($lastCheck) ? $lastCheck : \Carbon\Carbon::parse($lastCheck)->timestamp;
            return ($cachedData['lastUpdated'] ?? null) !== $lastCheckInSeconds;
        }
        
        return false; // First check - no changes
    }

    /**
     * Override formatResponse to include data in response
     */
    protected function formatResponse(array $cachedData, bool $hasChanges): array
    {
        $response = parent::formatResponse($cachedData, $hasChanges);
        
        // Include data in response if there are changes or if this is first check
        if ($hasChanges || !isset($cachedData['data'])) {
            $response['data'] = $cachedData['data'] ?? null;
        }
        
        return $response;
    }
}
