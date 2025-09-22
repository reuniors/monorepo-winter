<?php namespace Reuniors\Evodic\Models;

/**
 * Model
 */
class LocationOwner extends AbstractBaseModel
{
    use \Winter\Storm\Database\Traits\Validation;

    use \Winter\Storm\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at'];

    protected $fillable = [
        'first_name',
        'last_name',
        'city_id',
        'address_data',
        'phone_data',
        'metadata',
        'user_id',
        'level',
        'status',
        'is_active',
    ];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_evodic_location_owners';

    /**
     * @var array Validation rules
     */
    public $rules = [
        'first_name' => 'required|max:255',
        'last_name' => 'required|max:255',
        'city_id' => 'required',
        'user_id' => ['numeric', 'nullable'],
        'level' => 'numeric',
        'is_active' => 'boolean',
        'address_data' => ['array', 'nullable'],
        'phone_data' => ['array', 'nullable'],
    ];

    protected $jsonable = [
        'address_data',
        'phone_data',
        'metadata',
    ];

    public $belongsTo = [
        'city' => [
            'Reuniors\Base\Models\City',
            'key' => 'city_id',
        ],
        'user' => [
            'Reuniors\Evodic\Models\User',
            'key' => 'user_id',
        ],
    ];

    protected $appends = [
        'fullName',
    ];

    public function getFullNameAttribute()
    {
        return $this->first_name . ' ' . $this->last_name;
    }
}
