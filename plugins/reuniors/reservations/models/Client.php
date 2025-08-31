<?php
namespace Reuniors\Reservations\Models;

use Carbon\Carbon;
use Reuniors\reservations\Http\Enums\ReservationStatus;
use Winter\User\Models\User;
use Model;

/**
 * Model
 */
class Client extends Model
{
    use \Winter\Storm\Database\Traits\Validation;
    use \Winter\Storm\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at'];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_reservations_clients';

    /**
     * @var array Validation rules
     */
    public $rules = [];

    protected $fillable = [
        'full_name',
        'email',
        'phone_number',
        'user_id',
        'date_of_birth',
        'settings',
        'lang',
    ];

    protected $jsonable = ['settings'];

    public $hasMany = [
        'clientReservations' => [
            'Reuniors\Reservations\Models\ClientReservation',
            'key' => 'client_id',
        ],
    ];

    public $belongsTo = [
        'user' => [
            User::class,
            'key' => 'user_id',
        ],
    ];

    public static function scopeFeData($query, array $options)
    {
        /** @var string $locationSlug */
        extract([
            'locationSlug' => null,
            ...$options,
        ]);

        if ($locationSlug) {
            $query->whereHas('clientReservations', function ($query) use ($locationSlug) {
                $query->whereHas('location', function ($query) use ($locationSlug) {
                    $query->where('slug', $locationSlug);
                });
            });
        }

        return $query;
    }

    public static function scopeHasNotActiveReservations($query)
    {
        return $query->whereDoesntHave('clientReservations', function ($query) {
            $query
                ->whereDate('date', '>=', Carbon::now('Europe/Belgrade'))
                ->whereIn('status', [ReservationStatus::CONFIRMED, ReservationStatus::PENDING]);
        });
    }
}
