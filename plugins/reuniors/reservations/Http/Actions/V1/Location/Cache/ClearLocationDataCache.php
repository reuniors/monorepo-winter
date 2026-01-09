<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\Cache;

use Reuniors\Base\Http\Actions\BaseAction;
use Illuminate\Support\Facades\Cache;

class ClearLocationDataCache extends BaseAction
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
        
        // Invalidate location data cache
        self::invalidateCache($locationSlug);
        
        return null;
    }
    
    /**
     * Invalidate cache for a location
     * Static method for direct calls from models and other actions
     *
     * @param string $locationSlug
     * @return void
     */
    public static function invalidateCache(string $locationSlug): void
    {
        $cacheKey = sprintf('location_data:%s', $locationSlug);
        Cache::forget($cacheKey);
    }
}
