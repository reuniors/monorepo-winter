<?php namespace Reuniors\Evodic\Models;

use Model;

/**
 * Model
 */
class QaAnswer extends Model
{
    use \Winter\Storm\Database\Traits\Validation;


    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_evodic_qa_answers';

    /**
     * @var array Validation rules
     */
    public $rules = [];

    protected $fillable = ['qa_question_id', 'location_id', 'text', 'active'];

    public $belongsTo = [
        'qaQuestion' => ['Reuniors\Evodic\Models\QaQuestion', 'key' => 'qa_question_id'],
        'location' => ['Reuniors\Evodic\Models\Location', 'key' => 'location_id']
    ];
}
