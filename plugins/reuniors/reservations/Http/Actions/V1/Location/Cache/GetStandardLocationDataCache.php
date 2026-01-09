<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\Cache;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class GetStandardLocationDataCache extends BaseAction
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
        
        // Cache key
        $cacheKey = sprintf('location_data:%s', $locationSlug);
        
        // Cache TTL: 1 hour (3600 seconds)
        $cacheTtl = 3600;
        
        // Try to get from cache
        $cached = Cache::get($cacheKey);
        if ($cached !== null && is_array($cached) && isset($cached['id'])) {
            // Cache contains array, load Location model with all relations
            // We still need to query the database to get the model with relations,
            // but we know the location exists and is cached
            $location = Location::getFeData(['slug' => $locationSlug])
                ->with('serviceCategories')
                ->first();
            
            // Verify the cached ID matches (in case location was deleted/updated)
            if ($location && $location->id == $cached['id']) {
                return $location;
            }
            // If IDs don't match, location was updated - continue to reload from DB
        }
        
        // Get location with all standard relations
        $location = Location::getFeData(['slug' => $locationSlug])
            ->with('serviceCategories') // Add serviceCategories which is used in LocationGetOneAction
            ->first();
        
        if (!$location) {
            throw new NotFoundHttpException('Location not found');
        }
        
        // Cache the location data as array
        Cache::put($cacheKey, $location->toArray(), $cacheTtl);
        
        return $location;
    }
}
