<?php namespace Reuniors\Reservations\Models;

use Model;

/**
 * Model
 */
class LocationWorkerDiscount extends Model
{
    use \Winter\Storm\Database\Traits\Validation;

    /*
     * Disable timestamps by default.
     * Remove this line if timestamps are defined in the database table.
     */
    public $timestamps = false;


    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_reservations_location_worker_discounts';

    /**
     * @var array Validation rules
     */
    public $rules = [];

    protected $fillable = [
        'discount_value',
        'in_percent',
        'location_worker_id',
        'date_from_utc',
        'date_to_utc',
    ];

    protected $dates = ['date_from_utc', 'date_to_utc'];

    public $belongsTo = [
        'location_worker' => 'Reuniors\Reservations\Models\LocationWorker',
    ];
}
