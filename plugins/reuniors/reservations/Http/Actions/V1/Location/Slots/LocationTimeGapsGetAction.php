<?php
namespace Reuniors\Reservations\Http\Actions\V1\Location\Slots;

use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Http\Enums\ReservationStatus;
use Reuniors\Reservations\Models\ClientReservation;
use Reuniors\Reservations\Models\Location;
use Reuniors\Reservations\Models\LocationWorker;
use Reuniors\Reservations\Models\LocationWorkerShift;

class LocationTimeGapsGetAction extends BaseAction
{
    public function rules()
    {
        return [
            'locationSlug' => ['string', 'required'],
            'startDate' => ['string', 'required'], // ISO 8601 with timezone, e.g., "2025-12-01T00:00:00+01:00"
            'endDate' => ['string', 'required'], // ISO 8601 with timezone, e.g., "2025-12-31T23:59:59+01:00"
            'workerIds' => ['array', 'nullable'], // Optional - array of worker IDs
            'workerIds.*' => ['integer'],
            'includeReservations' => ['boolean', 'nullable'], // Optional: include minimal reservation data
            'onlyLongestGap' => ['boolean', 'nullable'], // Optional: return only longest gap per day per worker (for month view optimization)
        ];
    }

    public function handle(array $attributes = [])
    {
        $location = Location::where('slug', $attributes['locationSlug'])
            ->firstOrFail();

        // Get location timezone from settings (default: Europe/Belgrade)
        $locationTimezone = $location->settings['timezone'] ?? 'Europe/Belgrade';

        // Parse dates with timezone and convert to UTC
        $startDate = Carbon::parse($attributes['startDate'])->setTimezone('UTC');
        $endDate = Carbon::parse($attributes['endDate'])->setTimezone('UTC');

        // Get worker IDs
        $workerIds = $attributes['workerIds'] ?? null;
        $includeReservations = $attributes['includeReservations'] ?? false;
        $onlyLongestGap = $attributes['onlyLongestGap'] ?? false;

        // Build cache key (include onlyLongestGap to avoid cache conflicts)
        $workerIdsHash = $workerIds ? md5(implode(',', $workerIds)) : 'all';
        $onlyLongestGapFlag = $onlyLongestGap ? '1' : '0';
        $cacheKey = sprintf(
            'location_slots_gaps:%s:%s:%s:%s:%s',
            $attributes['locationSlug'],
            $startDate->format('Y-m-d'),
            $endDate->format('Y-m-d'),
            $workerIdsHash,
            $onlyLongestGapFlag
        );

        // Try to get from cache (5 minutes default)
        // TEMPORARILY DISABLED FOR DEBUGGING - uncomment when cache invalidation is fixed
        $cacheDuration = 5; // minutes
        $cacheTags = [
            sprintf('location_slots_gaps:%s', $attributes['locationSlug']),
        ];
        $useCache = false; // Set to true to enable caching

        // Check cache if supported
        if ($useCache) {
            if (Cache::getStore() instanceof \Illuminate\Cache\TaggedCache || method_exists(Cache::getStore(), 'tags')) {
                $cached = Cache::tags($cacheTags)->get($cacheKey);
                if ($cached !== null) {
                    return $cached;
                }
            } else {
                // Fallback for cache stores that don't support tags
                $cached = Cache::get($cacheKey);
                if ($cached !== null) {
                    return $cached;
                }
            }
        }

        // Load workers - if workerIds provided, load only those, otherwise all active
        $workersQuery = LocationWorker::query()
            ->whereHas('locations', function ($query) use ($location) {
                $query->where('location_id', $location->id);
            })
            ->where('active', true);

        if ($workerIds !== null && is_array($workerIds) && count($workerIds) > 0) {
            $workersQuery->whereIn('id', $workerIds);
        }

        $workers = $workersQuery->get();

        if ($workers->isEmpty()) {
            return [
                'gaps' => [],
                'reservations' => $includeReservations ? [] : null,
            ];
        }

        // Calculate gaps for each day in the date range
        $gapsByDate = [];
        $reservationsByDate = [];
        $daysProcessed = 0;
        $daysWithShifts = 0;
        $daysSkipped = 0;

        // Iterate through each day in UTC
        $currentDate = $startDate->copy()->startOfDay();
        $endDateDay = $endDate->copy()->endOfDay();
        
        // Get current time in UTC to filter out past dates
        $nowUtc = Carbon::now('UTC')->startOfDay();

        while ($currentDate->lte($endDateDay)) {
            $dateUtc = $currentDate->copy();
            
            // Skip past dates (only process today and future dates)
            if ($dateUtc->lt($nowUtc)) {
                $daysSkipped++;
                $currentDate->addDay();
                continue;
            }
            
            $daysProcessed++;

            // For each worker, calculate gaps for this day
            $dayHasShifts = false;
            foreach ($workers as $worker) {
                $workerGaps = $this->calculateGapsForWorkerDay(
                    $location,
                    $worker,
                    $dateUtc,
                    $locationTimezone
                );
                
                if (count($workerGaps) > 0) {
                    $dayHasShifts = true;
                }

                // If onlyLongestGap is true, keep only the longest gap for this worker
                if ($onlyLongestGap && count($workerGaps) > 0) {
                    $longestGap = $workerGaps[0];
                    foreach ($workerGaps as $gap) {
                        if ($gap['duration'] > $longestGap['duration']) {
                            $longestGap = $gap;
                        }
                    }
                    $workerGaps = [$longestGap];
                }

                // Group gaps by local date (not UTC date)
                foreach ($workerGaps as $gap) {
                    // Convert gap start time from UTC to local timezone to get local date
                    $gapStartLocal = Carbon::parse($gap['time'])->setTimezone($locationTimezone);
                    $localDateKey = $gapStartLocal->format('Y-m-d');

                    if (!isset($gapsByDate[$localDateKey])) {
                        $gapsByDate[$localDateKey] = [];
                    }

                    $gapsByDate[$localDateKey][] = $gap;
                }
            }

            // If including reservations, fetch them for this day
            if ($includeReservations) {
                $dayReservations = $this->getMinimalReservationsForDay(
                    $location,
                    $workers->pluck('id')->toArray(),
                    $dateUtc
                );

                foreach ($dayReservations as $reservation) {
                    // Convert reservation start time from UTC to local timezone to get local date
                    $reservationStartLocal = Carbon::parse($reservation['startTime'])->setTimezone($locationTimezone);
                    $localDateKey = $reservationStartLocal->format('Y-m-d');

                    if (!isset($reservationsByDate[$localDateKey])) {
                        $reservationsByDate[$localDateKey] = [];
                    }

                    $reservationsByDate[$localDateKey][] = $reservation;
                }
            }

            if ($dayHasShifts) {
                $daysWithShifts++;
            }

            // Move to next day
            $currentDate->addDay();
        }

        $response = [
            'gaps' => $gapsByDate,
        ];

        if ($includeReservations) {
            $response['reservations'] = $reservationsByDate;
        }

        // Store in cache
        if (Cache::getStore() instanceof \Illuminate\Cache\TaggedCache || method_exists(Cache::getStore(), 'tags')) {
            Cache::tags($cacheTags)->put($cacheKey, $response, now()->addMinutes($cacheDuration));
        } else {
            Cache::put($cacheKey, $response, now()->addMinutes($cacheDuration));
        }

        return $response;
    }

    /**
     * Invalidate cache for a location
     * Called when reservations or shifts change
     *
     * @param string $locationSlug
     * @return void
     */
    public static function invalidateCache(string $locationSlug): void
    {
        $cacheTag = sprintf('location_slots_gaps:%s', $locationSlug);

        if (Cache::getStore() instanceof \Illuminate\Cache\TaggedCache || method_exists(Cache::getStore(), 'tags')) {
            Cache::tags([$cacheTag])->flush();
        } else {
            // Fallback: try to clear by pattern (Redis supports this)
            $pattern = sprintf('location_slots_gaps:%s:*', $locationSlug);
            if (method_exists(Cache::getStore(), 'getRedis')) {
                $redis = Cache::getStore()->getRedis();
                $keys = $redis->keys($pattern);
                if (!empty($keys)) {
                    $redis->del($keys);
                }
            }
        }
    }

    /**
     * Calculate available time gaps for a worker on a specific day
     *
     * @param Location $location
     * @param LocationWorker $worker
     * @param Carbon $dateUtc
     * @param string $locationTimezone
     * @return array Array of gaps with 'time' (UTC ISO 8601), 'duration' (minutes), 'workerId'
     */
    protected function calculateGapsForWorkerDay(
        Location $location,
        LocationWorker $worker,
        Carbon $dateUtc,
        string $locationTimezone
    ): array {
        $gaps = [];
        
        // Get pause between reservations from settings (default: 10 minutes, same as frontend)
        $pauseBetweenReservations = $location->settings['pauseBetweenReservations'] ?? 10; // minutes

        // Get shift for this day
        $shift = LocationWorkerShift::query()
            ->where('location_worker_id', $worker->id)
            ->whereDate('date_utc', $dateUtc->format('Y-m-d'))
            ->whereNotNull('time_from_utc')
            ->whereNotNull('time_to_utc')
            ->first();

        if (!$shift) {
            // No shift for this day, no gaps
            return $gaps;
        }

        // Parse shift times using the date_utc from shift (not current date)
        // time_from_utc and time_to_utc are TIME fields, so we need to combine with date_utc
        $shiftDate = Carbon::parse($shift->date_utc)->setTimezone('UTC');
        $shiftStart = Carbon::parse($shiftDate->format('Y-m-d') . ' ' . $shift->time_from_utc, 'UTC');
        $shiftEnd = Carbon::parse($shiftDate->format('Y-m-d') . ' ' . $shift->time_to_utc, 'UTC');
        
        // Handle cross-midnight shifts (e.g., 22:00 to 02:00)
        if ($shiftEnd->lt($shiftStart)) {
            $shiftEnd->addDay();
        }

        // Get reservations for this worker that overlap with this day
        // We need to check reservations that start on this day OR overlap with this day
        $dayStart = $dateUtc->copy()->startOfDay();
        $dayEnd = $dateUtc->copy()->endOfDay();
        
        // Get all reservations for this worker and filter in PHP to check overlaps
        // This is more reliable than complex SQL queries with timezone issues
        // Use whereBetween with datetime to include previous and next day for cross-day reservations
        $queryStart = $dayStart->copy()->subDay();
        $queryEnd = $dayEnd->copy()->addDay();
        
        $allReservations = ClientReservation::query()
            ->where('location_id', $location->id)
            ->where('location_worker_id', $worker->id)
            ->where('status', '!=', ReservationStatus::CANCELLED)
            ->whereNotNull('date_utc')
            ->whereNotNull('services_duration')
            ->whereBetween('date_utc', [
                $queryStart->toDateTimeString(),
                $queryEnd->toDateTimeString()
            ])
            ->orderBy('date_utc', 'asc')
            ->get();
        
        // Filter reservations that actually overlap with this day
        $reservations = $allReservations->filter(function($reservation) use ($dayStart, $dayEnd) {
            $reservationStart = Carbon::parse($reservation->date_utc);
            $reservationEnd = $reservationStart->copy()->addMinutes($reservation->services_duration);
            
            // Check if reservation overlaps with this day
            // Reservation overlaps if: (start < dayEnd) AND (end > dayStart)
            return $reservationStart->lt($dayEnd) && $reservationEnd->gt($dayStart);
        });

        // Build list of occupied time periods
        $occupiedPeriods = [];
        
        foreach ($reservations as $reservation) {
            $reservationStart = Carbon::parse($reservation->date_utc);
            // Add pause after reservation end time
            $reservationEnd = $reservationStart->copy()
                ->addMinutes($reservation->services_duration)
                ->addMinutes($pauseBetweenReservations);
            $occupiedPeriods[] = [
                'start' => $reservationStart,
                'end' => $reservationEnd,
            ];
        }

        // Handle pauses from shift
        $pauses = $shift->pauses_utc ?? [];
        
        foreach ($pauses as $pause) {
            // Pauses can be stored with different field names:
            // - 'from'/'to' (old format)
            // - 'timeFromUtc'/'timeToUtc' (new format from API)
            $pauseFrom = $pause['timeFromUtc'] ?? $pause['from'] ?? null;
            $pauseTo = $pause['timeToUtc'] ?? $pause['to'] ?? null;
            
            if ($pauseFrom && $pauseTo) {
                // Parse pause times - they might be just time strings (HH:mm) or full ISO 8601
                // Combine with shift date_utc to get full datetime
                if (strlen($pauseFrom) <= 5) {
                    // Just time (HH:mm), combine with date_utc
                    $pauseStart = Carbon::parse($shiftDate->format('Y-m-d') . ' ' . $pauseFrom, 'UTC');
                } else {
                    // Full datetime, parse directly
                    $pauseStart = Carbon::parse($pauseFrom)->setTimezone('UTC');
                }
                
                if (strlen($pauseTo) <= 5) {
                    // Just time (HH:mm), combine with date_utc
                    $pauseEnd = Carbon::parse($shiftDate->format('Y-m-d') . ' ' . $pauseTo, 'UTC');
                } else {
                    // Full datetime, parse directly
                    $pauseEnd = Carbon::parse($pauseTo)->setTimezone('UTC');
                }
                
                // Handle cross-midnight pauses
                if ($pauseEnd->lt($pauseStart)) {
                    $pauseEnd->addDay();
                }

                // Only add pause if it overlaps with the shift
                if ($pauseStart->lt($shiftEnd) && $pauseEnd->gt($shiftStart)) {
                    // Clamp pause to shift boundaries
                    $clampedStart = $pauseStart->lt($shiftStart) ? $shiftStart->copy() : $pauseStart;
                    $clampedEnd = $pauseEnd->gt($shiftEnd) ? $shiftEnd->copy() : $pauseEnd;
                    
                    $occupiedPeriods[] = [
                        'start' => $clampedStart,
                        'end' => $clampedEnd,
                    ];
                }
            }
        }

        // Sort occupied periods by start time
        usort($occupiedPeriods, function ($a, $b) {
            return $a['start']->lt($b['start']) ? -1 : 1;
        });

        // Calculate gaps between occupied periods
        $currentTime = $shiftStart->copy();

        foreach ($occupiedPeriods as $occupied) {
            // If there's a gap before this occupied period
            if ($currentTime->lt($occupied['start'])) {
                $gapDuration = $currentTime->diffInMinutes($occupied['start']);
                if ($gapDuration > 0) {
                    $gaps[] = [
                        'time' => $currentTime->toIso8601String(),
                        'duration' => $gapDuration,
                        'workerId' => $worker->id,
                    ];
                }
            }

            // Move current time to end of occupied period
            $currentTime = $occupied['end']->copy();
        }

        // Check for gap after last occupied period until shift end
        if ($currentTime->lt($shiftEnd)) {
            $gapDuration = $currentTime->diffInMinutes($shiftEnd);
            if ($gapDuration > 0) {
                $gaps[] = [
                    'time' => $currentTime->toIso8601String(),
                    'duration' => $gapDuration,
                    'workerId' => $worker->id,
                ];
            }
        }

        return $gaps;
    }

    /**
     * Get minimal reservation data for a specific day
     *
     * @param Location $location
     * @param array $workerIds
     * @param Carbon $dateUtc
     * @return array
     */
    protected function getMinimalReservationsForDay(
        Location $location,
        array $workerIds,
        Carbon $dateUtc
    ): array {
        $reservations = ClientReservation::query()
            ->where('location_id', $location->id)
            ->whereIn('location_worker_id', $workerIds)
            ->whereDate('date_utc', $dateUtc->format('Y-m-d'))
            ->where('status', '!=', ReservationStatus::CANCELLED)
            ->whereNotNull('date_utc')
            ->whereNotNull('services_duration')
            ->with(['locationWorker', 'client'])
            ->get();

        return $reservations->map(function ($reservation) {
            $startTime = Carbon::parse($reservation->date_utc);
            $endTime = $startTime->copy()->addMinutes($reservation->services_duration);
            return [
                'id' => $reservation->id,
                'uuid' => $reservation->hash,
                'startTime' => $startTime->toIso8601String(),
                'endTime' => $endTime->toIso8601String(),
                'workerId' => $reservation->location_worker_id,
                'workerName' => $reservation->locationWorker ? $reservation->locationWorker->full_name : 'Unknown',
                'clientName' => $reservation->client ? $reservation->client->full_name : 'Unknown',
                'status' => $reservation->status,
            ];
        })->toArray();
    }
}

