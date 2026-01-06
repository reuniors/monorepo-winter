<?php
namespace Reuniors\Reservations\Classes;

use Reuniors\Reservations\Models\Location;
use Reuniors\Reservations\Models\LocationWorker;
use Reuniors\Reservations\Components\LocationComponent;

class UserLocationHelper
{
    /**
     * Check if user is owner of location by slug
     *
     * @param int $userId
     * @param string $locationSlug
     * @return bool
     */
    public static function isUserOwnerOfLocation($userId, $locationSlug)
    {
        $location = Location::where('slug', $locationSlug)->first();
        
        if (!$location) {
            return false;
        }
        
        return $location->main_owner_id === $userId;
    }

    /**
     * Check if user is worker of location by slug
     *
     * @param int $userId
     * @param string $locationSlug
     * @return bool
     */
    public static function isUserWorkerOfLocation($userId, $locationSlug)
    {
        $location = Location::where('slug', $locationSlug)->first();
        
        if (!$location) {
            return false;
        }
        
        $worker = LocationWorker::where('user_id', $userId)
            ->whereHas('locations', function ($query) use ($location) {
                $query->where('id', $location->id);
            })
            ->first();
        
        return $worker !== null;
    }

    /**
     * Get location slug from request (subdomain or request parameter)
     *
     * @return string|null
     */
    public static function getLocationSlugFromRequest()
    {
        // Try to get from request parameter first
        $locationSlug = request()->input('locationSlug');
        
        if ($locationSlug) {
            return $locationSlug;
        }
        
        // Try to get from subdomain
        $subdomain = LocationComponent::getSubdomain();
        
        if ($subdomain) {
            return $subdomain;
        }
        
        // Try to get from BACKUP_LOCATION env variable
        $backupLocation = env('BACKUP_LOCATION');
        
        if ($backupLocation) {
            return $backupLocation;
        }
        
        return null;
    }
}

