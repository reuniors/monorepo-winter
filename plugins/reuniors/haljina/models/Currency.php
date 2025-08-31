<?php namespace Reuniors\Haljina\Models;

use Model;

/**
 * Model
 */
class Currency extends Model
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
    public $table = 'reuniors_haljina_currencies';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];

    protected $fillable = ['name', 'title'];

    public $hasMany = [
        'products' => [
            'Reuniors\Haljina\Models\Product',
            'key' => 'currency_id'
        ]
    ];
}
