<?php namespace Reuniors\Base\Models;

use Model;

/**
 * Country Model
 */
class Country extends Model
{
    use \Winter\Storm\Database\Traits\Validation;
    use \Winter\Storm\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at'];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_base_countries';

    public $implement = ['@Winter.Translate.Behaviors.TranslatableModel'];
    public array $translatable = [
        'name',
        'description',
        ['slug', 'index' => true]
    ];

    /**
     * @var array Validation rules
     */
    public $rules = [
        'name' => 'required|string|max:191',
        'code' => 'required|string|max:5',
        'description' => 'nullable|string',
        'active' => 'boolean',
    ];

    /**
     * @var array Fillable fields
     */
    public $fillable = [
        'name',
        'code',
        'description',
        'active',
    ];

    /**
     * @var array Relations
     */
    public $hasMany = [
        'cities' => [
            'Reuniors\Base\Models\City',
            'order' => 'name'
        ],
    ];
}
