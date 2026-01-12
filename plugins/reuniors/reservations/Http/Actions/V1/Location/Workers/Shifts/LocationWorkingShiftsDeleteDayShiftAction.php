<?php
namespace Reuniors\Reservations\Http\Actions\V1\Location\Workers\Shifts;

use Illuminate\Support\Facades\Cache;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;
use Reuniors\Reservations\Models\LocationWorker;
use Reuniors\Reservations\Models\LocationWorkerShift;

class LocationWorkingShiftsDeleteDayShiftAction extends BaseAction {
    public function rules()
    {
        return [
            'locationSlug' => ['string', 'required'],
            'dateUtc' => ['date', 'required'],
            'workerId' => ['integer', 'required'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $dateUtc = $attributes['dateUtc'];
        $locationSlug = $attributes['locationSlug'];
        $workerId = $attributes['workerId'];

        $location = Location::where('slug', $locationSlug)
            ->firstOrFail();
        /** @var LocationWorker $locationWorker */
        $locationWorker = $location
            ->workers()
            ->where('id', $workerId)
            ->firstOrFail();
        
        $existingLocationWorkerShift = LocationWorkerShift::where('location_worker_id', $locationWorker->id)
            ->where('location_id', $location->id)
            ->whereDate('date_utc', $dateUtc)
            ->first();
        
        if ($existingLocationWorkerShift) {
            $existingLocationWorkerShift->delete();
            
            // Clear gaps cache for this location
            $this->clearGapsCache($locationSlug);
            
            return $existingLocationWorkerShift;
        }
        
        return null;
    }

    /**
     * Clear gaps cache for a location
     */
    private function clearGapsCache(string $locationSlug): void
    {
        $cacheTag = sprintf('location_slots_gaps:%s', $locationSlug);
        
        try {
            // Try to clear with tags if supported
            if (Cache::getStore() instanceof \Illuminate\Cache\TaggedCache || method_exists(Cache::getStore(), 'tags')) {
                Cache::tags([$cacheTag])->flush();
            }
        } catch (\Exception $e) {
            // Fallback: try to clear without tags (won't work for all cache stores)
            // Log the error but don't fail the request
            // \Log::warning('Failed to clear gaps cache: ' . $e->getMessage());
        }
    }
}

