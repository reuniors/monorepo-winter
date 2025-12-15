<?php
namespace Reuniors\Reservations\Http\Actions\V1\Location\Workers\Shifts;

use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;
use Reuniors\Reservations\Models\LocationWorker;
use Reuniors\Reservations\Models\LocationWorkerShift;

class LocationWorkingShiftsAddDayShiftAction extends BaseAction {
    public function rules()
    {
        return [
            'locationSlug' => ['string', 'required'],
            'dateUtc' => ['date', 'required'],
            'shift' => ['integer', 'nullable'],
            'workerId' => ['integer', 'required'],
            'timeFromUtc' => ['string', 'nullable'],
            'timeToUtc' => ['string', 'nullable'],
            'pausesUtc' => ['array', 'nullable'],
            'pausesUtc.*.timeFromUtc' => ['string', 'required'],
            'pausesUtc.*.timeToUtc' => ['string', 'required'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $dateUtc = $attributes['dateUtc'];
        $locationSlug = $attributes['locationSlug'];
        $workerId = $attributes['workerId'];
        $shift = $attributes['shift'] ?? null;
        $timeFromUtc = $attributes['timeFromUtc'] ?? null;
        $timeToUtc = $attributes['timeToUtc'] ?? null;
        $pausesUtc = $attributes['pausesUtc'] ?? null;

        $location = Location::where('slug', $locationSlug)
            ->firstOrFail();
        /** @var LocationWorker $locationWorker */
        $locationWorker = $location
            ->workers()
            ->where('id', $workerId)
            ->with('working_hours')
            ->firstOrFail();
        $existingLocationWorkerShift = LocationWorkerShift::where('location_worker_id', $locationWorker->id)
            ->where('location_id', $location->id)
            ->whereDate('date_utc', $dateUtc)
            ->first();
        $workingTime = $locationWorker->getWorkingTimeByDateAndShift($dateUtc, $shift);
        // Clear gaps cache for this location
        $this->clearGapsCache($locationSlug);

        if ($existingLocationWorkerShift) {
            $existingLocationWorkerShift->shift = $shift;
            $existingLocationWorkerShift->time_from_utc = $timeFromUtc ?? $workingTime['time_from_utc'];
            $existingLocationWorkerShift->time_to_utc = $timeToUtc ?? $workingTime['time_to_utc'];
            $existingLocationWorkerShift->pauses_utc = $pausesUtc;
            $existingLocationWorkerShift->save();
            return $existingLocationWorkerShift;
        } else {
            return LocationWorkerShift::create([
                'location_worker_id' => $locationWorker->id,
                'location_id' => $location->id,
                'date_utc' => $dateUtc,
                'shift' => $shift,
                'time_from_utc' => $timeFromUtc ?? $workingTime['time_from_utc'] ?? null,
                'time_to_utc' => $timeToUtc ?? $workingTime['time_to_utc'] ?? null,
                'pauses_utc' => $pausesUtc,
            ]);
        }
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
            \Log::warning('Failed to clear gaps cache: ' . $e->getMessage());
        }
    }
}
