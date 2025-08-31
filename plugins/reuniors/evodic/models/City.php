<?php namespace Reuniors\Evodic\Models;

use Model;

/**
 * Model
 */
class City extends Model
{
    use \Winter\Storm\Database\Traits\Validation;

    use \Winter\Storm\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at'];


    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_evodic_cities';

    public $implement = ['@Winter.Translate.Behaviors.TranslatableModel'];
    public array $translatable = [
        'title',
        'description',
        ['slug', 'index' => true]
    ];

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];

    public $belongsTo = [
        'country' => [
            'Reuniors\Evodic\Models\Country',
            'order' => 'name'
        ],
    ];
}
