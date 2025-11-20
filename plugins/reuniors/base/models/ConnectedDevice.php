<?php namespace Reuniors\Base\Models;

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
    public $table = 'reuniors_base_connected_devices';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];

    protected $fillable = ['location_slug', 'user_id', 'tokens'];

    protected $jsonable = ['tokens'];

    public $belongsTo = [
        'user' => 'RainLab\User\Models\User'
    ];
}

