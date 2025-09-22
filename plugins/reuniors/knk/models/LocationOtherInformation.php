<?php namespace Reuniors\Knk\Models;

use Model;

/**
 * Model
 */
class LocationOtherInformation extends Model
{
    use \October\Rain\Database\Traits\Validation;
    use \October\Rain\Database\Traits\SoftDelete;
    use \October\Rain\Database\Traits\Sortable;

    const SORT_ORDER = 'sort_order';

    protected $dates = ['deleted_at'];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_knk_location_other_informations';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];

    public $implement = ['RainLab.Translate.Behaviors.TranslatableModel'];

    public $translatable = [
        'value',
    ];

    public $belongsTo = [
        'tag' => [
            'Reuniors\Base\Models\Tag',
            'order' => 'name'
        ],
        'location' => [
            'Reuniors\Knk\Models\Location',
            'order' => 'name'
        ],
    ];
}
