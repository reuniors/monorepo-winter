<?php namespace Reuniors\Reservations\Models;

use Model;

/**
 * Model
 */
class WorkingDay extends Model
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
    public $table = 'reuniors_reservations_working_days';

    /**
     * @var array Validation rules
     */
    public $rules = [];

    protected $fillable = [
        'day',
        'month',
    ];
}
