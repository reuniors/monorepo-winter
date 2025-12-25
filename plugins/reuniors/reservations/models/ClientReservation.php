<?php namespace Reuniors\Reservations\Models;

use Carbon\Carbon;
use Illuminate\Support\Str;
use Model;
use Request;
use Config;
use Reuniors\reservations\Http\Enums\ReservationStatus;
use Winter\User\Facades\Auth;
use Reuniors\Reservations\Http\Actions\V1\ReservationsPingAction;
use Reuniors\Reservations\Models\LocationWorkerShift;

/**
 * Model
 */
class ClientReservation extends Model
{
    use \Winter\Storm\Database\Traits\Validation;
    use \Winter\Storm\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at', 'date_utc'];

    const DAILY_DURATION_LIMIT = 240;

    protected static function booted()
    {
        static::saved(function ($reservation) {
            self::invalidatePingCache($reservation);
        });

        static::updated(function ($reservation) {
            self::invalidatePingCache($reservation);
        });

        static::deleted(function ($reservation) {
            self::invalidatePingCache($reservation);
        });

        // Calendar sync hooks (generic, works with any provider)
        static::created(function ($reservation) {
            \Reuniors\Calendar\Classes\CalendarSyncService::syncToProvider(
                $reservation,
                'Reuniors\Reservations\Models\ClientReservation',
                function($entity) {
                    return self::getCalendarConnectionForReservation($entity);
                },
                function($entity) {
                    return self::buildCalendarEventData($entity);
                }
            );
        });

        static::updated(function ($reservation) {
            // Only sync if relevant fields changed
            if ($reservation->isDirty(['date_utc', 'services_duration', 'status'])) {
                \Reuniors\Calendar\Classes\CalendarSyncService::syncToProvider(
                    $reservation,
                    'Reuniors\Reservations\Models\ClientReservation',
                    function($entity) {
                        return self::getCalendarConnectionForReservation($entity);
                    },
                    function($entity) {
                        return self::buildCalendarEventData($entity);
                    }
                );
            }
        });

        static::deleted(function ($reservation) {
            \Reuniors\Calendar\Classes\CalendarSyncService::deleteFromProvider(
                $reservation,
                'Reuniors\Reservations\Models\ClientReservation',
                function($entity) {
                    return self::getCalendarConnectionForReservation($entity);
                }
            );
        });
    }

    private static function invalidatePingCache($reservation)
    {
        $location = $reservation->location;
        if ($location) {
            ReservationsPingAction::invalidateCache(['locationSlug' => $location->slug]);
            // Also invalidate gaps cache
            \Reuniors\Reservations\Http\Actions\V1\Location\Slots\LocationTimeGapsGetAction::invalidateCache($location->slug);
            
            \Log::info('ClientReservation: Invalidated gaps cache', [
                'reservationId' => $reservation->id,
                'locationSlug' => $location->slug,
                'dateUtc' => $reservation->date_utc,
            ]);
        }
    }


    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_reservations_client_reservations';

    /**
     * @var array Validation rules
     */
    public $rules = [];

    protected $fillable = [
        'location_id',
        'location_worker_id',
        'services_duration',
        'services_cost',
        'status',
        'client_id',
        'notice',
        'ip',
        'ip_forwarded',
        'user_agent',
        'hash',
        'created_by',
        'original_cost',
        'discount',
        'reason',
        'is_pending_status_reminder_sent',
        'promo_code_id',
        'date_utc',
    ];

    protected $appends = [
        'date_formatted',
        'friendly_code',
    ];

    protected $hidden = [
        'ip',
        'ip_forwarded',
        'user_agent',
    ];

    public $belongsTo = [
        'location' => [
            'Reuniors\Reservations\Models\Location',
            'key' => 'location_id',
        ],
        'locationWorker' => [
            'Reuniors\Reservations\Models\LocationWorker',
            'key' => 'location_worker_id',
        ],
        'client' => [
            'Reuniors\Reservations\Models\Client',
            'key' => 'client_id',
        ],
        'promoCode' => [
            'Reuniors\Reservations\Models\PromoCode',
            'key' => 'promo_code_id',
        ],
        'createdByUser' => [
            'RainLab\User\Models\User',
            'key' => 'created_by',
        ],
    ];

    public $belongsToMany = [
        'services' => [
            'Reuniors\Reservations\Models\Service',
            'table' => 'reuniors_reservations_client_reservations_services',
            'key' => 'client_reservation_id',
            'otherKey' => 'service_id',
            'pivot' => ['quantity'],
        ],
    ];

    public function getDateFormattedAttribute()
    {
        // Convert UTC to Belgrade timezone for display
        return Carbon::parse($this->date_utc)->setTimezone('Europe/Belgrade');
    }

    public function beforeCreate()
    {
        $this->hash = $this->getUniqueHash();
        $user = Auth::getUser();

        $this->ip = Request::server('REMOTE_ADDR');
        $this->ip_forwarded = Request::server('HTTP_X_FORWARDED_FOR');
        $this->user_agent = Request::server('HTTP_USER_AGENT');
        $this->created_by = $user ? $user->id : null;

        if ($this->status === null) {
            $this->status = $this->getDefaultStatus();
        }
    }

    public function getUniqueHash()
    {
        $length = 32;

        return substr(md5('rzr-' . Str::random($length)), 0, $length);
    }

    /**
     * Get a user-friendly reservation code
     */
    public function getFriendlyCodeAttribute()
    {
        // Check if required relations are loaded
        if (!$this->relationLoaded('locationWorker') || !$this->relationLoaded('client')) {
            return null;
        }
        
        $date = $this->date_formatted->format('d-m-y');
        $time = $this->date_formatted->format('H-i');
        $workerName = $this->locationWorker ? $this->locationWorker->full_name : 'Unknown';
        $clientName = $this->client ? $this->client->full_name : 'Unknown';
        
        // Create a short, readable code
        $workerInitials = $this->getInitials($workerName);
        $clientInitials = $this->getInitials($clientName);
        
        return "{$date}|{$time}|{$workerInitials}-{$clientInitials}";
    }

    /**
     * Get initials from full name
     */
    private function getInitials($fullName)
    {
        $names = explode(' ', trim($fullName));
        $initials = '';
        foreach ($names as $name) {
            if (!empty($name)) {
                $initials .= strtoupper(substr($name, 0, 1));
            }
        }
        return $initials;
    }

    public static function slotAvailable($dateAndTime, $locationWorkerId, $durationInMin)
    {
        $dateOnly = Carbon::parse($dateAndTime)->format('Y-m-d');
        $start = Carbon::parse($dateAndTime);
        $end = $start->copy()->addMinutes($durationInMin);
        
        // Get all reservations for this worker on this date (not just future ones)
        $reservations = ClientReservation::where('location_worker_id', $locationWorkerId)
            ->where('date_utc', '>=', $dateAndTime)
            ->where('status', '!=', ReservationStatus::CANCELLED)
            ->get();
            
        // Check if the start and end time is between the working hours
        $workingHours = LocationWorkerShift::isWorkingDay($dateOnly, $locationWorkerId)->first();
        if ($workingHours) {
            if ($start->between($workingHours->start_time_utc, $workingHours->end_time_utc) || $end->between($workingHours->start_time_utc, $workingHours->end_time_utc)) {
                return false;
            }
        }
        
        // Check for overlapping times and pause requirements
        foreach ($reservations as $reservation) {
            $reservationStart = Carbon::parse($reservation->date_utc);
            $reservationEnd = $reservationStart->copy()->addMinutes($reservation->services_duration);
            
            // Check for direct overlap
            if ($start->between($reservationStart, $reservationEnd) || $end->between($reservationStart, $reservationEnd)) {
                return false;
            }
            
            // Check for pause time requirement (10 minutes)
            $pauseTime = 10; // PAUSE_BETWEEN_SLOTS_MINUTES
            
            // Check if new reservation starts too soon after existing reservation ends
            $timeBetweenNewStartAndExistingEnd = $start->diffInMinutes($reservationEnd);
            if ($timeBetweenNewStartAndExistingEnd < $pauseTime && $timeBetweenNewStartAndExistingEnd >= 0) {
                return false;
            }
            
            // Check if existing reservation starts too soon after new reservation ends
            $timeBetweenExistingStartAndNewEnd = $reservationStart->diffInMinutes($end);
            if ($timeBetweenExistingStartAndNewEnd < $pauseTime && $timeBetweenExistingStartAndNewEnd >= 0) {
                return false;
            }
        }
        
        // Check Calendar events (any provider)
        $calendarEvents = \Reuniors\Calendar\Models\CalendarEvent::whereHas('calendarConnection', function ($query) use ($locationWorkerId) {
            $query->whereHas('reservationsConnections', function($q) use ($locationWorkerId) {
                $q->where('location_worker_id', $locationWorkerId);
            })
            ->where('is_active', true)
            ->where('block_overlapping_slots', true);
        })
        ->active()
        ->external()
        ->blockingSlots()
        ->inTimeRange($start->toDateTimeString(), $end->toDateTimeString())
        ->get();
        
        if ($calendarEvents->count() > 0) {
            return false; // Slot is blocked by calendar event
        }
        
        return true;
    }

    public static function isDailyReservationOverLimit($servicesDuration, $slotDate)
    {
        $user = Auth::getUser();
        if (LocationWorker::where('user_id', $user->id)->count() > 0) {
            return false;
        }
        $dailyReservations = ClientReservation::where('created_by', Auth::getUser()->id)
            ->whereDate('date_utc', $slotDate)
            ->whereIn('status', [ReservationStatus::CONFIRMED, ReservationStatus::PENDING, ReservationStatus::DRAFT])
            ->get();
        $dailyDuration = 0;
        foreach ($dailyReservations as $reservation) {
            $dailyDuration += $reservation->services_duration;
        }

        return $dailyDuration + $servicesDuration > self::DAILY_DURATION_LIMIT;
    }

    public function scopeGetFeData($query, array $options = [])
    {
        /**
         * @var $locationSlug string
         * @var $locationWorkerId string
         * @var $hash string
         * @var $withClient bool
         * @var $withServices bool
         * @var $withLocation bool
         * @var $withLocationWorker bool
         */
        extract([
            'locationSlug' => null,
            'locationWorkerId' => null,
            'hash' => null,
            'withClient' => true,
            'withServices' => true,
            'withLocation' => true,
            'withLocationWorker' => true,
            ...$options,
        ]);

        if ($locationSlug) {
            $query->whereHas('location', function ($query) use ($locationSlug) {
                $query->where('slug', $locationSlug);
            });
        }
        if ($locationWorkerId) {
            $query->where('location_worker_id', $locationWorkerId);
        }
        if ($hash) {
            $query->where('hash', $hash);
        }
        if ($withClient) {
            $query->with('client');
        }
        if ($withServices) {
            $query->with('services');
        }
        if ($withLocation) {
            $query->with('location');
        }
        if ($withLocationWorker) {
            $query->with([
                'locationWorker',
                'locationWorker.avatar',
            ]);
        }

        return $query;
    }

    public function scopeCreatedUserNotHasGroups($query, $groups)
    {
        return $query->whereDoesntHave('createdByUser.groups', function ($query) use ($groups) {
            $query->whereIn('code', $groups);
        });
    }

    /**
     * Get calendar connection for reservation
     */
    protected static function getCalendarConnectionForReservation($reservation)
    {
        $pivot = \Reuniors\Reservations\Models\ReservationCalendarConnection::where('location_id', $reservation->location_id)
            ->where('location_worker_id', $reservation->location_worker_id)
            ->whereHas('calendarConnection', function($q) {
                $q->where('is_active', true)
                  ->where('sync_to_provider', true);
            })
            ->first();

        return $pivot ? $pivot->calendarConnection : null;
    }

    /**
     * Build calendar event data from reservation
     */
    protected static function buildCalendarEventData($reservation)
    {
        $client = $reservation->client;
        $services = $reservation->services;
        $location = $reservation->location;
        $worker = $reservation->locationWorker;

        $serviceNames = $services->pluck('name')->join(', ');
        $summary = $client ? "{$client->full_name} - {$serviceNames}" : "Rezervacija - {$serviceNames}";

        $description = "Rezervacija ID: {$reservation->id}\n";
        $description .= "Hash: {$reservation->hash}\n\n";
        
        if ($client) {
            $description .= "Klijent: {$client->full_name}\n";
            if ($client->email) {
                $description .= "Email: {$client->email}\n";
            }
            if ($client->phone_number) {
                $description .= "Telefon: {$client->phone_number}\n";
            }
        }
        
        $description .= "\nUsluge: {$serviceNames}\n";
        $description .= "Trajanje: {$reservation->services_duration} minuta\n";
        $description .= "Cena: {$reservation->services_cost} RSD\n";
        
        if ($worker) {
            $description .= "Radnik: {$worker->full_name}\n";
        }
        
        if ($location) {
            $description .= "Lokacija: {$location->name}\n";
            if (isset($location->address_data['address'])) {
                $description .= "Adresa: {$location->address_data['address']}\n";
            }
        }
        
        if ($reservation->notice) {
            $description .= "\nNapomena: {$reservation->notice}\n";
        }

        return [
            'summary' => $summary,
            'description' => $description,
            'start_time_utc' => $reservation->date_utc,
            'end_time_utc' => Carbon::parse($reservation->date_utc)->addMinutes($reservation->services_duration)->toDateTimeString(),
            'location' => $location && isset($location->address_data['address']) 
                ? $location->address_data['address'] 
                : null,
        ];
    }

    /**
     * Format services request array for sync operation
     * 
     * @param array $servicesRequest Array of service requests with 'id' and 'quantity'
     * @return array Formatted array for sync operation
     */
    public static function formatServicesForSync(array $servicesRequest)
    {
        $services = [];
        foreach ($servicesRequest as $serviceRequest) {
            $services[$serviceRequest['id']] = [
                'quantity' => $serviceRequest['quantity'] ?? 1,
            ];
        }

        return $services;
    }
}
