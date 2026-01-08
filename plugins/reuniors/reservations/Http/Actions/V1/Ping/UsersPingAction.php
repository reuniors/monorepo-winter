<?php

namespace Reuniors\Reservations\Http\Actions\V1\Ping;

use Reuniors\Base\Http\Actions\V1\BasePingAction;
use Reuniors\Reservations\Classes\UserCache;
use Auth;
use Winter\User\Models\User;

class UsersPingAction extends BasePingAction
{
    /**
     * Override handle to bypass BasePingAction cache
     * This ensures we always get fresh data when user groups change
     */
    public function handle(array $attributes = [], $lastCheck = null)
    {
        // Always generate fresh data (bypass BasePingAction cache)
        // This ensures we detect changes immediately when user groups change
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
        return 'user_cache';
    }

    protected function getAdditionalCacheKeyParts(array $attributes): array
    {
        $user = Auth::getUser();
        return ($user instanceof User && $user->id) ? [$user->id] : [];
    }

    protected function generateCacheData(array $attributes): array
    {
        $user = Auth::getUser();
        $locationSlug = $attributes['locationSlug'] ?? null;

        // Ako nema autentifikovanog korisnika, vrati prazan rezultat
        if (!($user instanceof User) || !$locationSlug) {
            return $this->buildCacheData(null, 0);
        }

        // Always generate fresh data directly from DB (bypass UserCache cache)
        // This ensures we detect changes immediately when user groups change
        // BasePingAction will still cache this result for 10min (600s)
        $cacheData = UserCache::generateCacheData($user, $locationSlug);

        // Return format with hash from UserCache (includes all user data changes)
        return [
            'lastUpdated' => $cacheData['lastUpdated'],
            'count' => 1, // Always 1 user
            'hash' => $cacheData['hash'], // Hash from UserCache includes rights, groups, notifications
        ];
    }

    /**
     * Override checkForChanges to use hash instead of just lastUpdated
     * This is important because user groups can change without updating user->updated_at
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
        
        return false; // Prva provera - nema promena
    }
}

