<?php
namespace Reuniors\Reservations\Classes;

use Reuniors\Reservations\Classes\UserLocationHelper;
use Winter\User\Models\User;

class FilterUserGroupsByLocation
{
    /**
     * Filter user groups based on location
     * Removes Owner and Worker groups if user doesn't have rights for the location
     *
     * @param User $user
     * @param \Illuminate\Database\Eloquent\Collection $userGroups
     * @param string|null $locationSlug
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public static function filter($user, $userGroups, $locationSlug = null)
    {
        // If no location slug provided, try to get from request
        if (!$locationSlug) {
            $locationSlug = UserLocationHelper::getLocationSlugFromRequest();
        }
        
        // If still no location slug, return groups as-is (can't filter without location)
        if (!$locationSlug) {
            return $userGroups;
        }
        
        // Check if user is owner or worker for this location
        $isOwner = UserLocationHelper::isUserOwnerOfLocation($user->id, $locationSlug);
        $isWorker = UserLocationHelper::isUserWorkerOfLocation($user->id, $locationSlug);
        
        // Filter groups: remove Owner and Worker if user doesn't have rights
        $filteredGroups = $userGroups->filter(function ($group) use ($isOwner, $isWorker) {
            $groupCode = $group->code ?? null;
            
            // Keep Admin group always
            if ($groupCode === 'admin') {
                return true;
            }
            
            // Remove Owner group if user is not owner of this location
            if ($groupCode === 'owner' && !$isOwner) {
                return false;
            }
            
            // Remove Worker group if user is not worker of this location
            if ($groupCode === 'worker' && !$isWorker) {
                return false;
            }
            
            // Keep all other groups (registered, social-google, etc.)
            return true;
        });
        
        return $filteredGroups->values();
    }
}

