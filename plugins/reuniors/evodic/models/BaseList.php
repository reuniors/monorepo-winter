<?php namespace Reuniors\Evodic\Models;

use Winter\Storm\Database\Traits\SoftDelete;
use Winter\Storm\Database\Traits\Validation;

class BaseList extends AbstractBaseModel
{
    use Validation;

    use SoftDelete;

    protected $dates = ['deleted_at'];


    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_evodic_lists';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];

    protected $fillable = [
        'metadata',
        'name',
        'description',
        'type',
        'active',
    ];

    protected $jsonable = [
        'metadata',
    ];
}
