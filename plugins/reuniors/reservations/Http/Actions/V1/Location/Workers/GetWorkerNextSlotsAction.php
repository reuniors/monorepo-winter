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
            'currentTime' => ['string', 'nullable'], // ISO 8601 format from frontend (optional)
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
        // Assume 30 minutes service duration (since we don't have selected services yet)
        $serviceDuration = 30;
        // Pause between reservations (default: 10 minutes)
        $pauseBetweenReservations = 10;
        $slots = [];
        // Use server UTC time (not client time) - this ensures consistency
        $nowUtc = Carbon::now('UTC');
        $nowLocal = $nowUtc->copy()->setTimezone($locationTimezone);
        
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
        
        // Default delay: 180 minutes (3 hours) for regular users
        // Note: For admin/owner/worker, delay should be 0 or 60 minutes (1 hour),
        // but we don't have user info here, so we use the safer default of 180 minutes
        $delayMinutes = 180; // 3 hours for regular users
        $minStartTimeLocal = $nowLocal->copy()->addMinutes($delayMinutes);
        
        // Generate slots from gaps - simplified: only rounded slots (00 and 30 minutes)
        $allSlots = [];
        foreach ($allGaps as $gap) {
            if (count($allSlots) >= $limit) {
                break;
            }
            
            $gapStartUtc = Carbon::parse($gap['time'])->setTimezone('UTC');
            $gapDuration = $gap['duration'] ?? 0;
            $gapEndUtc = $gapStartUtc->copy()->addMinutes($gapDuration);
            
            // Convert to local timezone
            $gapStartLocal = $gapStartUtc->copy()->setTimezone($locationTimezone);
            $gapEndLocal = $gapEndUtc->copy()->setTimezone($locationTimezone);
            
            // Check if gap can fit the service (serviceDuration + pauseBetweenReservations)
            if ($gapDuration < $serviceDuration + $pauseBetweenReservations) {
                continue; // Skip gaps that are too short
            }
            
            // Check if gap is in the past (with delay) - compare in local timezone
            if ($gapStartLocal->lt($minStartTimeLocal)) {
                // If gap starts in the past (with delay), start from minStartTime
                $adjustedStart = $minStartTimeLocal->copy();
                if ($adjustedStart->gte($gapEndLocal)) {
                    continue; // Gap is completely in the past (with delay)
                }
                $gapStartLocal = $adjustedStart;
            }
            
            // Simplified: Only generate rounded slots (00 and 30 minutes)
            // Check if gap start is already on a rounded slot (00 or 30)
            $gapStartMinutes = $gapStartLocal->minute;
            $isGapStartRounded = ($gapStartMinutes == 0 || $gapStartMinutes == 30);
            
            // Start from gap start if it's already rounded, otherwise round up to next rounded slot
            $currentSlotLocal = $gapStartLocal->copy();
            if (!$isGapStartRounded) {
                // Round up to next 30-minute interval (00 or 30)
                if ($gapStartMinutes < 30) {
                    $currentSlotLocal->minute(30);
                } else {
                    $currentSlotLocal->addHour();
                    $currentSlotLocal->minute(0);
                }
            }
            $currentSlotLocal->second(0);
            $currentSlotLocal->microsecond(0);
            
            // Generate slots every 30 minutes (only 00 and 30)
            // Note: After a pause, slots can be booked immediately (no pause needed in slot check)
            while ($currentSlotLocal->lt($gapEndLocal) && count($allSlots) < $limit) {
                // Check if slot fits - only need serviceDuration, not serviceDuration + pause
                // because gap already accounts for pause between reservations
                $slotEnd = $currentSlotLocal->copy()->addMinutes($serviceDuration);
                if ($slotEnd->lte($gapEndLocal)) {
                    $allSlots[] = [
                        'datetime' => $currentSlotLocal->toIso8601String(),
                        'date' => $currentSlotLocal->format('Y-m-d'),
                        'time' => $currentSlotLocal->format('H:i'),
                        'workerId' => $worker->id,
                        'workerName' => $worker->full_name,
                    ];
                }
                $currentSlotLocal->addMinutes($slotInterval);
            }
        }
        
        // Sort slots by datetime (earliest first) and limit
        usort($allSlots, function($a, $b) {
            return strcmp($a['datetime'], $b['datetime']);
        });
        
        return array_slice($allSlots, 0, $limit);
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

