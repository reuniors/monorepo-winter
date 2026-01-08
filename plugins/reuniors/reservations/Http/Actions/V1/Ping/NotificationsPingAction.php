<?php

namespace Reuniors\Reservations\Http\Actions\V1\Ping;

use Reuniors\Base\Http\Actions\V1\BasePingAction;
use Reuniors\Reservations\Classes\UserCache;
use Auth;
use Winter\User\Models\User;

class NotificationsPingAction extends BasePingAction
{
    public function rules()
    {
        return [
            'locationSlug' => ['required', 'string'],
        ];
    }

    protected function getCacheKeyPrefix(): string
    {
        return 'user_cache'; // Use same cache as UsersPingAction
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

        // Use UserCache helper to get notifications count (uses same cache as UsersPingAction)
        $cacheData = UserCache::getOrGenerate($user, $locationSlug);

        // Return notifications count with hash from UserCache (for accurate change detection)
        return [
            'lastUpdated' => $cacheData['lastUpdated'],
            'count' => $cacheData['notificationsCount'] ?? 0,
            'hash' => $cacheData['notificationsHash'] ?? null, // Use hash from UserCache
        ];
    }
}

