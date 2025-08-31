<?php namespace Reuniors\Delivery\Models;

use Model;
use Winter\Storm\Database\Traits\SoftDelete;
use Winter\Storm\Database\Traits\Validation;
use Winter\Storm\Support\Str;

/**
 * Model
 */
class Order extends Model
{
    use Validation;

    use SoftDelete;

    protected $dates = ['deleted_at'];

    public $incrementing = false;


    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_delivery_orders';

    /**
     * @var array Validation rules
     */
    public $rules = [];

    protected $fillable = [
        'status',
        'reject_reason',
        'location_id',
        'location_data',
        'note',
        'order_items',
        'price',
        'promo_code',
        'original_price',
        'user_data',
        'is_delivered',
        'instructions',
        'user_id',
        'driver_id'
    ];

    public $jsonable = [
        'location_data',
        'order_items',
        'user_data',
        'instructions'
    ];

    public $belongsTo = [
        'user' => ['Winter\User\Models\User'],
        'driver' => ['Reuniors\Delivery\Models\Driver']
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($query) {
            if ($query->id == null) {
                $query->id = Str::uuid();
            }
        });
    }
}
