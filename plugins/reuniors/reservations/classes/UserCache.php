<?php

namespace Reuniors\Reservations\Classes;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Auth;
use Winter\User\Models\User;
use Reuniors\Reservations\Models\Location;
use Reuniors\Reservations\Models\LocationWorker;
use Reuniors\Reservations\Models\Notification;

class UserCache
{
    /**
     * Cache TTL u sekundama
     */
    public const CACHE_TTL = 60;

    /**
     * Generiše cache key za user podatke (samo po user ID-u, bez locationSlug)
     *
     * @param int $userId
     * @return string
     */
    public static function getCacheKey(int $userId): string
    {
        return "user_cache_{$userId}";
    }

    /**
     * Dohvata ili generiše user cache podatke za određenu lokaciju
     *
     * @param User $user
     * @param string $locationSlug
     * @param int|null $ttl - Opciono trajanje cache-a u sekundama (override-uje CACHE_TTL)
     * @return array
     */
    public static function getOrGenerate(User $user, string $locationSlug, ?int $ttl = null): array
    {
        $cacheKey = self::getCacheKey($user->id);
        $cacheTtl = $ttl ?? self::CACHE_TTL;

        // Get or create full cache structure
        $fullCache = Cache::remember($cacheKey, $cacheTtl, function() use ($user) {
            return [
                'notifications' => [],
                'rights' => [],
                'groups' => [],
            ];
        });

        // Always generate fresh data to check if groups/rights changed
        // This ensures we detect changes even if user->updated_at doesn't change
        $freshData = self::generateCacheData($user, $locationSlug);

        // Check if location data exists in cache
        $needsUpdate = !isset($fullCache['notifications'][$locationSlug]);

        // If cache exists, check if groups/rights/notifications changed by comparing hashes
        if (!$needsUpdate) {
            $cachedGroupsHash = $fullCache['groups'][$locationSlug]['hash'] ?? null;
            $cachedRightsHash = $fullCache['rights'][$locationSlug]['hash'] ?? null;
            $cachedNotificationsHash = $fullCache['notifications'][$locationSlug]['hash'] ?? null;

            // If any hash changed, we need to update cache
            $needsUpdate = (
                $cachedGroupsHash !== $freshData['groupsHash'] ||
                $cachedRightsHash !== $freshData['rightsHash'] ||
                $cachedNotificationsHash !== $freshData['notificationsHash']
            );
        }

        // Update cache if needed
        if ($needsUpdate) {
            $fullCache['notifications'][$locationSlug] = [
                'count' => $freshData['notificationsCount'],
                'hash' => $freshData['notificationsHash'],
                'lastUpdated' => $freshData['lastUpdated'],
            ];
            
            $fullCache['rights'][$locationSlug] = [
                'isOwner' => $freshData['isOwner'],
                'isWorker' => $freshData['isWorker'],
                'hash' => $freshData['rightsHash'],
            ];
            
            $fullCache['groups'][$locationSlug] = [
                'groups' => $freshData['groups'],
                'hash' => $freshData['groupsHash'],
            ];
            
            // Save updated cache
            Cache::put($cacheKey, $fullCache, $cacheTtl);
        }

        // Return fresh data (always use fresh data, not cached)
        return [
            'lastUpdated' => $freshData['lastUpdated'],
            'hash' => $freshData['hash'],
            'rightsHash' => $freshData['rightsHash'],
            'groupsHash' => $freshData['groupsHash'],
            'notificationsHash' => $freshData['notificationsHash'],
            'isOwner' => $freshData['isOwner'],
            'isWorker' => $freshData['isWorker'],
            'notificationsCount' => $freshData['notificationsCount'],
            'groups' => $freshData['groups'],
        ];
    }

    /**
     * Generiše cache podatke za korisnika
     *
     * @param User $user
     * @param string $locationSlug
     * @return array
     */
    public static function generateCacheData(User $user, string $locationSlug): array
    {
        // Get user rights for this location
        $isOwner = UserLocationHelper::isUserOwnerOfLocation($user->id, $locationSlug);
        $isWorker = UserLocationHelper::isUserWorkerOfLocation($user->id, $locationSlug);

        $user->load(relations: ['groups' => function ($query) {
            $query->select('name', 'code');
        }]);

        // Ensure groups is a collection (not null)
        $userGroups = $user->groups ?? collect();

        // Filter groups by location (same logic as in login)
        $filteredGroups = FilterUserGroupsByLocation::filter(
            $user,
            $userGroups,
            $locationSlug
        );

        // Get notifications count
        $notificationsCount = self::getNotificationsCount($user, $locationSlug);

        // Create rights hash (owner/worker status)
        $rightsHash = md5(($isOwner ? 'owner' : '') . ($isWorker ? 'worker' : ''));

        // Create groups hash
        $groupsHash = md5($filteredGroups->pluck('code')->sort()->implode(','));

        // Get last updated timestamp from user or related models
        $lastUpdated = self::getLastUpdated($user, $locationSlug, $isOwner, $isWorker);
        
        // Convert to timestamp for consistent hashing
        $lastUpdatedTimestamp = $lastUpdated ? (is_numeric($lastUpdated) ? $lastUpdated : strtotime($lastUpdated)) : null;

        // Combined hash for user data (only groups and rights, not notifications or lastUpdated)
        // This ensures hash only changes when groups or rights change, not when notifications change
        $combinedHash = md5($rightsHash . $groupsHash);

        return [
            'lastUpdated' => $lastUpdatedTimestamp,
            'hash' => $combinedHash,
            'rightsHash' => $rightsHash,
            'groupsHash' => $groupsHash,
            'notificationsHash' => md5($notificationsCount),
            'isOwner' => $isOwner,
            'isWorker' => $isWorker,
            'notificationsCount' => $notificationsCount,
            'groups' => $filteredGroups->map(function ($group) {
                return [
                    'code' => $group->code,
                    'name' => $group->name,
                ];
            })->toArray(),
        ];
    }

    /**
     * Proverava da li su se promenili user podaci
     *
     * @param array $cachedData
     * @param array $newData
     * @return array ['rightsChanged' => bool, 'groupsChanged' => bool, 'notificationsChanged' => bool]
     */
    public static function checkForChanges(array $cachedData, array $newData): array
    {
        return [
            'rightsChanged' => ($cachedData['rightsHash'] ?? null) !== ($newData['rightsHash'] ?? null),
            'groupsChanged' => ($cachedData['groupsHash'] ?? null) !== ($newData['groupsHash'] ?? null),
            'notificationsChanged' => ($cachedData['notificationsHash'] ?? null) !== ($newData['notificationsHash'] ?? null),
            'hasChanges' => ($cachedData['hash'] ?? null) !== ($newData['hash'] ?? null),
        ];
    }

    /**
     * Invalidira cache za korisnika (za određenu lokaciju ili sve lokacije)
     *
     * @param int $userId
     * @param string|null $locationSlug - ako je null, invalidira sve lokacije
     * @return void
     */
    public static function invalidate(int $userId, ?string $locationSlug = null): void
    {
        $cacheKey = self::getCacheKey($userId);
        
        if ($locationSlug === null) {
            // Invalidate entire cache for user
            Cache::forget($cacheKey);
        } else {
            // Invalidate only specific location
            $fullCache = Cache::get($cacheKey);
            if ($fullCache) {
                unset($fullCache['notifications'][$locationSlug]);
                unset($fullCache['rights'][$locationSlug]);
                unset($fullCache['groups'][$locationSlug]);
                Cache::put($cacheKey, $fullCache, self::CACHE_TTL);
            }
        }
    }

    /**
     * Dohvata broj notifikacija za korisnika
     *
     * @param User $user
     * @param string $locationSlug
     * @return int
     */
    protected static function getNotificationsCount(User $user, string $locationSlug): int
    {
        return Notification::query()
            ->whereHas('location', function($query) use ($locationSlug) {
                $query->where('slug', $locationSlug);
            })
            ->whereHas('users', function($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->count();
    }

    /**
     * Dohvata last updated timestamp
     *
     * @param User $user
     * @param string $locationSlug
     * @param bool $isOwner
     * @param bool $isWorker
     * @return string|null
     */
    protected static function getLastUpdated(User $user, string $locationSlug, bool $isOwner, bool $isWorker): ?string
    {
        $lastUpdated = $user->updated_at;

        // Check if user is worker - if so, check LocationWorker updated_at
        if ($isWorker) {
            $location = Location::where('slug', $locationSlug)->first();
            if ($location) {
                $worker = LocationWorker::where('user_id', $user->id)
                    ->whereHas('locations', function ($query) use ($location) {
                        $query->where('id', $location->id);
                    })
                    ->first();
                
                if ($worker && $worker->updated_at && $worker->updated_at > $lastUpdated) {
                    $lastUpdated = $worker->updated_at;
                }
            }
        }

        // Check if user is owner - if so, check Location updated_at for main_owner_id changes
        if ($isOwner) {
            $location = Location::where('slug', $locationSlug)->first();
            if ($location && $location->updated_at && $location->updated_at > $lastUpdated) {
                $lastUpdated = $location->updated_at;
            }
        }

        // Check notifications last updated
        $notificationsLastUpdated = Notification::query()
            ->whereHas('location', function($query) use ($locationSlug) {
                $query->where('slug', $locationSlug);
            })
            ->whereHas('users', function($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->max('updated_at');

        if ($notificationsLastUpdated && $notificationsLastUpdated > $lastUpdated) {
            $lastUpdated = $notificationsLastUpdated;
        }

        return $lastUpdated;
    }
}

