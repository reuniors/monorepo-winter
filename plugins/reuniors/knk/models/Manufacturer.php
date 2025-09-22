<?php namespace Reuniors\Knk\Models;

use Model;

/**
 * Model
 */
class Manufacturer extends Model
{
    use \October\Rain\Database\Traits\Validation;
    
    use \October\Rain\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at'];


    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_knk_manufacturers';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];

    public $belongsTo = [
        'city' => ['Reuniors\Knk\Models\RegionCity', 'order' => 'sort_order'],
    ];
}
