<?php namespace Reuniors\Evodic\Models;

use Model;

/**
 * Model
 */
class Content extends Model
{
    use \Winter\Storm\Database\Traits\Validation;

    use \Winter\Storm\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at'];


    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_evodic_contents';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];

    const MODEL_PATH = [
        'location' => Location::class,
    ];

    const RELATION_MODELS = ['location' => 'Location'];

    const TYPES = [
        'main' => 'Main',
    ];

    public function getTypeOptions()
    {
        return self::TYPES;
    }

    public function getRelationModelOptions()
    {
        return self::RELATION_MODELS;
    }
}
