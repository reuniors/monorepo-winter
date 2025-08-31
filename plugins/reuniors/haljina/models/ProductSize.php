<?php namespace Reuniors\Haljina\Models;

use Model;

/**
 * Model
 */
class ProductSize extends Model
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
    public $table = 'reuniors_haljina_product_sizes';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];

    protected $fillable = ['title', 'name', 'active', 'user_id'];

    public $hasMany = [
        'products' => [
            'Reuniors\Haljina\Models\Product',
            'key' => 'size_id'
        ]
    ];
}
