<?php namespace Reuniors\Delivery\Models;

use Model;
use Winter\Storm\Database\Traits\Validation;

/**
 * Model
 */
class Driver extends Model
{
    use Validation;


    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_delivery_drivers';

    /**
     * @var array Validation rules
     */
    public $rules = [];

    protected $fillable = [
        'first_name',
        'last_name',
        'working_city_id',
        'status',
        'is_active',
        'user_id',
        'phone_number',
        'is_online',
        'last_seen_utc',
        'login_date_code_utc'
    ];

    protected $hidden = [
        'login_date_code_utc'
    ];

    protected $casts = [
        'is_online' => 'boolean',
        'is_active' => 'boolean',
    ];

    protected $dates = [
        'last_seen_utc',
        'login_date_code_utc'
    ];

    public $belongsTo = [
        'user' => ['Winter\User\Models\User']
    ];

    public function getLoginDateCodeFormattedAttribute()
    {
        return date('Y-m-d H:i:s', $this->login_date_code_utc);
    }
}
