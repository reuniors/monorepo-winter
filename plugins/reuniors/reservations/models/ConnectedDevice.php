<?php namespace Reuniors\Reservations\Models;

use Model;

/**
 * Model
 */
class ConnectedDevice extends Model
{
    use \Winter\Storm\Database\Traits\Validation;


    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_reservations_connected_devices';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];

    protected $fillable = ['location_id', 'user_id', 'tokens'];

    protected $jsonable = ['tokens'];

    public $belongsTo = [
        'location' => 'Reuniors\Reservations\Models\Location',
        'user' => 'RainLab\User\Models\User'
    ];
}
