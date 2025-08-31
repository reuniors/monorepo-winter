<?php namespace reuniors\evodic\models;

use Model;

/**
 * Model
 */
class WorkingTime extends Model
{
    use \Winter\Storm\Database\Traits\Validation;

    const DATES_CODES = [
        'mon' => 'mon',
        'tue' => 'tue',
        'wed' => 'wed',
        'thu' => 'thu',
        'fri' => 'fri',
        'sat' => 'sat',
        'sun' => 'sun',
    ];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_evodic_working_hours';

    /**
     * @var array Validation rules
     */
    public $rules = [
        'days_codes' => ['array', 'in:mon,tue,wed,thu,fri,sat,sun'],
    ];

    protected $jsonable = [
        'days_codes',
    ];

    protected $fillable = [
        'time_from',
        'time_to',
        'name',
        'days_codes',
        'active',
    ];

    public $belongsToMany = [
        'places' => [
            'Reuniors\Evodic\Models\Place',
            'table' => 'reuniors_evodic_places_working_hours',
            'key' => 'working_hours_id',
            'otherKey' => 'place_id',
        ],
    ];
}
