<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\Workers;

use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;
use Reuniors\Reservations\Models\LocationWorker;
use Reuniors\Reservations\Http\Actions\V1\Location\Slots\LocationTimeGapsGetAction;

class GetWorkerNextSlotsAction extends BaseAction
{
    public function rules()
    {
        return [
            'locationSlug' => ['string', 'required'],
            'limit' => ['integer', 'nullable', 'min:1', 'max:50'], // Default 15, max 50
        ];
    }

    public function handle(array $attributes = [], LocationWorker $worker = null)
    {
        $location = Location::where('slug', $attributes['locationSlug'])
            ->firstOrFail();
        $workerId = $worker->id;

        $limit = $attributes['limit'] ?? 15;

        // Get location timezone from settings (default: Europe/Belgrade)
        $locationTimezone = $location->settings['timezone'] ?? 'Europe/Belgrade';

        // Verify worker belongs to this location
        if (!$worker->locations()->where('location_id', $location->id)->exists()) {
            return [
                'slots' => [],
            ];
        }

        // Use LocationTimeGapsGetAction to get gaps, then generate slots from gaps
        // LocationTimeGapsGetAction has its own caching, so we don't need to cache here
        // This ensures we always get fresh data when gaps cache is invalidated
        $slots = $this->calculateNextSlotsFromGaps($location, $worker, $locationTimezone, $limit);

        return [
            'slots' => $slots,
        ];
    }

    public function asController(LocationWorker $worker = null): array
    {
        return parent::asController($worker);
    }

    /**
     * Calculate next available slots for a worker using LocationTimeGapsGetAction
     */
    private function calculateNextSlotsFromGaps(
        Location $location,
        LocationWorker $worker,
        string $locationTimezone,
        int $limit
    ): array {
        // Get slot interval from location (default: 30 minutes)
        $slotInterval = $location->time_slot_interval ?? 30;
        $slots = [];
        $nowUtc = Carbon::now('UTC');
        
        // Look ahead up to 60 days to find slots
        $maxDays = 60;
        $startDate = $nowUtc->copy()->startOfDay();
        $endDate = $startDate->copy()->addDays($maxDays);
        
        // Use LocationTimeGapsGetAction to get gaps
        $gapsAction = new LocationTimeGapsGetAction();
        $gapsResult = $gapsAction->handle([
            'locationSlug' => $location->slug,
            'startDate' => $startDate->setTimezone($locationTimezone)->toIso8601String(),
            'endDate' => $endDate->setTimezone($locationTimezone)->toIso8601String(),
            'workerIds' => [$worker->id],
        ]);
        
        $gapsByDate = $gapsResult['gaps'] ?? [];
        
        // Flatten gaps from all dates and filter by worker
        $allGaps = [];
        foreach ($gapsByDate as $date => $dateGaps) {
            foreach ($dateGaps as $gap) {
                // Only include gaps for this worker
                if (isset($gap['workerId']) && $gap['workerId'] == $worker->id) {
                    $allGaps[] = $gap;
                }
            }
        }
        
        // Sort gaps by time (earliest first)
        usort($allGaps, function($a, $b) {
            return strcmp($a['time'], $b['time']);
        });
        
        // Generate slots from gaps
        foreach ($allGaps as $gap) {
            if (count($slots) >= $limit) {
                break;
            }
            
            $gapStart = Carbon::parse($gap['time'])->setTimezone('UTC');
            $gapDuration = $gap['duration'] ?? 0;
            $gapEnd = $gapStart->copy()->addMinutes($gapDuration);
            
            // Only consider gaps that start in the future
            if ($gapStart->lt($nowUtc)) {
                // If gap starts in the past but ends in the future, start from now
                if ($gapEnd->gt($nowUtc)) {
                    $gapStart = $nowUtc->copy();
                } else {
                    continue; // Skip gaps that are completely in the past
                }
            }
            
            // Generate slots in this gap using location's slot interval
            $currentSlot = $gapStart->copy();
            
            while ($currentSlot->lt($gapEnd) && count($slots) < $limit) {
                // Convert to local timezone for display
                $slotLocal = $currentSlot->copy()->setTimezone($locationTimezone);
                
                $slots[] = [
                    'date' => $slotLocal->format('Y-m-d'),
                    'time' => $slotLocal->format('H:i'),
                    'datetime' => $slotLocal->toIso8601String(),
                    'workerId' => $worker->id,
                    'workerName' => $worker->full_name,
                ];
                
                $currentSlot->addMinutes($slotInterval);
            }
        }
        
        // Sort slots by datetime (earliest first) and limit
        usort($slots, function($a, $b) {
            return strcmp($a['datetime'], $b['datetime']);
        });
        
        return array_slice($slots, 0, $limit);
    }

    /**
     * Invalidate cache for a location
     */
    public static function invalidateCache(array $attributes): void
    {
        $locationSlug = $attributes['locationSlug'] ?? null;
        if ($locationSlug) {
            $cacheKey = sprintf('worker_next_slots:%s', $locationSlug);
            Cache::forget($cacheKey);
        }
    }
}

