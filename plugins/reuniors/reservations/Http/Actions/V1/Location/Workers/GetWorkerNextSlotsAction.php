<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\Workers;

use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Http\Enums\ReservationStatus;
use Reuniors\Reservations\Models\ClientReservation;
use Reuniors\Reservations\Models\Location;
use Reuniors\Reservations\Models\LocationWorker;
use Reuniors\Reservations\Models\LocationWorkerShift;

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
        
        // Get slot interval from location (default: 30 minutes)
        $slotInterval = $location->time_slot_interval ?? 30;

        // Build cache key - one cache per location
        $cacheKey = sprintf('worker_next_slots:%s', $attributes['locationSlug']);

        // Cache TTL: 5 minutes (300 seconds)
        $cacheTtl = 300;

        // Try to get from cache
        $cached = Cache::get($cacheKey);
        if ($cached !== null && isset($cached[$workerId])) {
            $workerCache = $cached[$workerId];
            // Check if cache is still valid (within TTL)
            $cacheAge = time() - ($workerCache['lastUpdated'] ?? 0);
            if ($cacheAge < $cacheTtl) {
                // Return cached slots for this worker (limited to requested limit)
                return [
                    'slots' => array_slice($workerCache['slots'] ?? [], 0, $limit),
                ];
            }
        }

        // Verify worker belongs to this location
        if (!$worker->locations()->where('location_id', $location->id)->exists()) {
            return [
                'slots' => [],
            ];
        }

        // Calculate next available slots
        $slots = $this->calculateNextSlots($location, $worker, $locationTimezone, $limit);

        // Update cache - get existing cache or create new
        $allWorkersCache = $cached ?? [];
        $allWorkersCache[$workerId] = [
            'slots' => $slots,
            'lastUpdated' => time(),
            'hash' => md5(json_encode($slots)),
        ];

        // Save to cache
        Cache::put($cacheKey, $allWorkersCache, $cacheTtl);

        return [
            'slots' => $slots,
        ];
    }

    public function asController(LocationWorker $worker = null): array
    {
        return parent::asController($worker);
    }

    /**
     * Calculate next available slots for a worker
     */
    private function calculateNextSlots(
        Location $location,
        LocationWorker $worker,
        string $locationTimezone,
        int $limit
    ): array {
        // Get slot interval from location (default: 30 minutes)
        $slotInterval = $location->time_slot_interval ?? 30;
        $slots = [];
        $nowUtc = Carbon::now('UTC');
        $currentDate = $nowUtc->copy()->startOfDay();
        
        // Look ahead up to 60 days to find slots
        $maxDays = 60;
        $daysChecked = 0;

        // Get pause between reservations from settings (default: 10 minutes)
        $pauseBetweenReservations = $location->settings['pauseBetweenReservations'] ?? 10;

        while (count($slots) < $limit && $daysChecked < $maxDays) {
            $dateUtc = $currentDate->copy();

            // Get shift for this day
            $shift = LocationWorkerShift::query()
                ->where('location_worker_id', $worker->id)
                ->whereDate('date_utc', $dateUtc->format('Y-m-d'))
                ->whereNotNull('time_from_utc')
                ->whereNotNull('time_to_utc')
                ->first();

            if ($shift) {
                // Parse shift times
                $shiftDate = Carbon::parse($shift->date_utc)->setTimezone('UTC');
                $shiftStart = Carbon::parse($shiftDate->format('Y-m-d') . ' ' . $shift->time_from_utc, 'UTC');
                $shiftEnd = Carbon::parse($shiftDate->format('Y-m-d') . ' ' . $shift->time_to_utc, 'UTC');
                
                // Handle cross-midnight shifts
                if ($shiftEnd->lt($shiftStart)) {
                    $shiftEnd->addDay();
                }

                // Get reservations for this day
                $dayStart = $dateUtc->copy()->startOfDay();
                $dayEnd = $dateUtc->copy()->endOfDay();
                $queryStart = $dayStart->copy()->subDay();
                $queryEnd = $dayEnd->copy()->addDay();

                $allReservations = ClientReservation::query()
                    ->where('location_id', $location->id)
                    ->where('location_worker_id', $worker->id)
                    ->whereIn('status', [ReservationStatus::CONFIRMED, ReservationStatus::PENDING])
                    ->whereNotNull('date_utc')
                    ->whereNotNull('services_duration')
                    ->whereBetween('date_utc', [
                        $queryStart->toDateTimeString(),
                        $queryEnd->toDateTimeString()
                    ])
                    ->orderBy('date_utc', 'asc')
                    ->get();

                // Filter reservations that overlap with this day
                $reservations = $allReservations->filter(function($reservation) use ($dayStart, $dayEnd) {
                    $reservationStart = Carbon::parse($reservation->date_utc);
                    $reservationEnd = $reservationStart->copy()->addMinutes($reservation->services_duration);
                    return $reservationStart->lt($dayEnd) && $reservationEnd->gt($dayStart);
                });

                // Build occupied periods
                $occupiedPeriods = [];
                foreach ($reservations as $reservation) {
                    $reservationStart = Carbon::parse($reservation->date_utc);
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
                    $pauseFrom = $pause['timeFromUtc'] ?? $pause['from'] ?? null;
                    $pauseTo = $pause['timeToUtc'] ?? $pause['to'] ?? null;
                    
                    if ($pauseFrom && $pauseTo) {
                        if (strlen($pauseFrom) <= 5) {
                            $pauseStart = Carbon::parse($shiftDate->format('Y-m-d') . ' ' . $pauseFrom, 'UTC');
                        } else {
                            $pauseStart = Carbon::parse($pauseFrom, 'UTC');
                        }
                        
                        if (strlen($pauseTo) <= 5) {
                            $pauseEnd = Carbon::parse($shiftDate->format('Y-m-d') . ' ' . $pauseTo, 'UTC');
                        } else {
                            $pauseEnd = Carbon::parse($pauseTo, 'UTC');
                        }
                        
                        if ($pauseEnd->lt($pauseStart)) {
                            $pauseEnd->addDay();
                        }
                        
                        $occupiedPeriods[] = [
                            'start' => $pauseStart,
                            'end' => $pauseEnd,
                        ];
                    }
                }

                // Sort occupied periods by start time
                usort($occupiedPeriods, function($a, $b) {
                    return $a['start']->lt($b['start']) ? -1 : 1;
                });

                // Find available slots (gaps between occupied periods)
                $slotStart = max($shiftStart, $nowUtc); // Start from now or shift start, whichever is later
                
                foreach ($occupiedPeriods as $period) {
                    if ($slotStart->lt($period['start'])) {
                        // Found a gap - create slots
                        $gapStart = $slotStart->copy();
                        $gapEnd = $period['start']->copy();
                        
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
                    
                    // Move slot start to after this occupied period
                    if ($slotStart->lt($period['end'])) {
                        $slotStart = $period['end']->copy();
                    }
                }

                // Check if there's a gap after the last occupied period and before shift end
                if ($slotStart->lt($shiftEnd) && count($slots) < $limit) {
                    $gapStart = $slotStart->copy();
                    $gapEnd = $shiftEnd->copy();
                    
                    $currentSlot = $gapStart->copy();
                    
                    while ($currentSlot->lt($gapEnd) && count($slots) < $limit) {
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
            }

            $currentDate->addDay();
            $daysChecked++;
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

