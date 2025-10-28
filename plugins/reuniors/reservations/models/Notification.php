<?php namespace Reuniors\Reservations\Models;

use Model;
use Reuniors\Reservations\Http\Actions\V1\NotificationsPingAction;

/**
 * Model
 */
class Notification extends Model
{
    use \Winter\Storm\Database\Traits\Validation;

    use \Winter\Storm\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at'];


    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_reservations_notifications';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];

    protected $fillable = [
        'description'
    ];

    public $belongsToMany = [
        'users' => [
            'Winter\User\Models\User',
            'table' => 'reuniors_reservations_users_notifications',
            'key' => 'notification_id',
            'otherKey' => 'user_id',
            'pivot' => ['status']
        ],
        'client_reservations' => [
            'Reuniors\Reservations\Models\ClientReservation',
            'table' => 'reuniors_reservations_client_reservations_notifications',
            'key' => 'notification_id',
            'otherKey' => 'client_reservation_id'
        ],
    ];

    public $belongsTo = [
        'location' => [
            'Reuniors\Reservations\Models\Location',
            'key' => 'location_id'
        ]
    ];

    protected static function booted()
    {
        static::saved(function ($notification) {
            self::invalidatePingCache($notification);
        });

        static::updated(function ($notification) {
            self::invalidatePingCache($notification);
        });

        static::deleted(function ($notification) {
            self::invalidatePingCache($notification);
        });
    }

    private static function invalidatePingCache($notification)
    {
        $location = $notification->location;
        if ($location) {
            foreach ($notification->users as $user) {
                NotificationsPingAction::invalidateCache([
                    'locationSlug' => $location->slug,
                    'userId' => $user->id
                ]);
            }
        }
    }
}
