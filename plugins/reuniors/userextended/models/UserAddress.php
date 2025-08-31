<?php namespace Reuniors\UserExtended\Models;

use Model;

/**
 * Model
 */
class UserAddress extends Model
{
    use \Winter\Storm\Database\Traits\Validation;


    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_userextended_addresses';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];

    protected $fillable = [
        'user_id',
        'city_id',
        'name',
        'street',
        'street_number',
        'floor',
        'apartment',
        'lat',
        'long',
        'notice'
    ];
}
