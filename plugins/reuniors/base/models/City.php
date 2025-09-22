<?php namespace Reuniors\Base\Models;

use Model;

/**
 * City Model
 */
class City extends Model
{
    use \Winter\Storm\Database\Traits\Validation;
    use \Winter\Storm\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at'];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_base_cities';

    public $implement = ['@Winter.Translate.Behaviors.TranslatableModel'];
    public array $translatable = [
        'name',
        'title',
        'description',
        'snippet',
        ['slug', 'index' => true]
    ];

    /**
     * @var array Validation rules
     */
    public $rules = [
        'name' => 'required|string|max:191',
        'title' => 'required|string|max:191',
        'slug' => 'required|string|max:191|unique:reuniors_base_cities',
        'country_id' => 'nullable|exists:reuniors_base_countries,id',
        'parent_city_id' => 'nullable|exists:reuniors_base_cities,id',
        'active' => 'boolean',
        'has_regions' => 'boolean',
        'sort_order' => 'integer',
    ];

    /**
     * @var array Fillable fields
     */
    public $fillable = [
        'name',
        'title',
        'slug',
        'country_id',
        'parent_city_id',
        'description',
        'snippet',
        'active',
        'has_regions',
        'sort_order',
        'metadata',
    ];

    /**
     * @var array Relations
     */
    public $belongsTo = [
        'country' => [
            'Reuniors\Base\Models\Country',
            'order' => 'name'
        ],
        'parent_city' => [
            'Reuniors\Base\Models\City',
            'key' => 'parent_city_id',
            'order' => 'name'
        ],
    ];

    public $hasMany = [
        'child_cities' => [
            'Reuniors\Base\Models\City',
            'key' => 'parent_city_id',
            'order' => 'sort_order'
        ],
    ];
}
