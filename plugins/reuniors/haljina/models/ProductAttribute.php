<?php namespace Reuniors\Haljina\Models;

use Model;

/**
 * Model
 */
class ProductAttribute extends Model
{
    use \Winter\Storm\Database\Traits\Validation;

    use \Winter\Storm\Database\Traits\SoftDelete;

    use \Winter\Storm\Database\Traits\Sortable;

    protected $dates = ['deleted_at'];


    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_haljina_product_attributes';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];

    protected $fillable = ['name', 'title', 'slug', 'type', 'description', 'active', 'sort_order'];

    public $belongsToMany = [
        'categories' => [
            'Reuniors\Haljina\Models\Category',
            'table' => 'reuniors_haljina_categories_product_attributes',
            'key' => 'product_attribute_id',
            'otherKey' => 'category_id'
        ],
        'products' => [
            'Reuniors\Haljina\Models\Product',
            'table' => 'reuniors_haljina_products_product_attributes',
            'key' => 'product_attribute_id',
            'otherKey' => 'product_id',
            'pivot' => ['value']
        ]
    ];

    public function getTypeOptions()
    {
        return [
            'free_text' => 'Slobodan unos',
            'number' => 'Broj',
            'yes_no' => 'Da/Ne',
            'yes_no_capitalised' => 'DA/NE velikim slovima',
        ];
    }
}
