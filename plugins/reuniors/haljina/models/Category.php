<?php namespace Reuniors\Haljina\Models;

use Model;

/**
 * Model
 */
class Category extends Model
{
    use \Winter\Storm\Database\Traits\Validation;

    use \Winter\Storm\Database\Traits\SoftDelete;

    use \Winter\Storm\Database\Traits\NestedTree;

    protected $dates = ['deleted_at'];


    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_haljina_categories';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];

    protected $fillable = [
        'title', 'name', 'slug', 'active', 'parent_id', 'metadata', 'description', 'has_standard_attributes'
    ];

    public $hasMany = [
        'products' => [
            'Reuniors\Haljina\Models\Product',
            'key' => 'category_id'
        ]
    ];

    public $belongsToMany = [
        'product_attributes' => [
            'Reuniors\Haljina\Models\ProductAttribute',
            'table' => 'reuniors_haljina_categories_product_attributes',
            'key' => 'category_id',
            'otherKey' => 'product_attribute_id'
        ]
    ];
}
