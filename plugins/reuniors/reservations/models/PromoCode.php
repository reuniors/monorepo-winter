<?php namespace Reuniors\Reservations\Models;

use Model;
use Reuniors\reservations\Http\Enums\ReservationStatus;

/**
 * Model
 */
class PromoCode extends Model
{
    use \Winter\Storm\Database\Traits\Validation;


    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_reservations_promo_codes';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];

    protected $fillable = [
        'name',
        'is_active',
        'location_id',
        'activate_at_utc',
        'deactivate_at_utc',
        'discount_value',
        'in_percent'
    ];

    public $belongsTo = [
        'location' => 'Reuniors\Reservations\Models\Location',
    ];

    public $hasMany = [
        'clientReservations' => [
            'Reuniors\Reservations\Models\ClientReservation',
            'key' => 'promo_code_id',
        ],
    ];

    public function scopeIsActive($query)
    {
        return $query->where(function ($query) {
            $now = now();
            $query->where('is_active', 1)
                ->where('activate_at_utc', '<=', $now)
                ->where('deactivate_at_utc', '>=', $now);
        });
    }

    public function scopeExists($query, $code, $locationSlug, $options = [])
    {
        return $query
            ->where('name', $code)
            ->whereHas('location', function ($query) use ($locationSlug) {
                $query->where('slug', $locationSlug);
            });
    }

    public function scopeNotUsed($query, $clientId)
    {
        return $query->whereDoesntHave('clientReservations', function ($query) use ($clientId) {
            $query
                ->where('client_id', $clientId)
                ->whereIn('status', [
                    ReservationStatus::CONFIRMED,
                    ReservationStatus::PENDING,
                    ReservationStatus::DRAFT
                ]);
        });
    }
}
