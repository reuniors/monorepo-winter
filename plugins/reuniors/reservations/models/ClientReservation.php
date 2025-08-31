<?php namespace Reuniors\Reservations\Models;

use Carbon\Carbon;
use Illuminate\Support\Str;
use Model;
use Request;
use Config;
use Reuniors\reservations\Http\Enums\ReservationStatus;
use Winter\User\Facades\Auth;

/**
 * Model
 */
class ClientReservation extends Model
{
    use \Winter\Storm\Database\Traits\Validation;

    use \Winter\Storm\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at', 'date_formatted'];

    const DAILY_DURATION_LIMIT = 240;


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
        'date',
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
    ];

    protected $appends = [
        'date_formatted',
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
        return Carbon::parse($this->date);
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

    public static function slotAvailable($dateAndTime, $locationWorkerId, $durationInMin)
    {
        $dateOnly = Carbon::parse($dateAndTime)->format('Y-m-d');
        $start = Carbon::parse($dateAndTime);
        $end = $start->copy()->addMinutes($durationInMin);
        $reservations = ClientReservation::where('location_worker_id', $locationWorkerId)
            ->where('date', '>=', $dateAndTime)
            ->where('status', '!=', 3)
            ->get();
        if (
            LocationWorkerShift::isWorkingDay($dateOnly, $locationWorkerId)
                ->count() === 0
        ) {
            return false;
        }
        foreach ($reservations as $reservation) {
            $reservationStart = Carbon::parse($reservation->date . ' ' . $reservation->locationWorker->start_time);
            $reservationEnd = $reservationStart->copy()->addMinutes($reservation->services_duration);
            if ($start->between($reservationStart, $reservationEnd) || $end->between($reservationStart, $reservationEnd)) {
                return false;
            }
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
            ->whereDate('date', $slotDate)
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
}
