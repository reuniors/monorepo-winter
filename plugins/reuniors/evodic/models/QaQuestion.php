<?php namespace Reuniors\Evodic\Models;

use Model;

/**
 * Model
 */
class QaQuestion extends Model
{
    use \Winter\Storm\Database\Traits\Validation;

    use \Winter\Storm\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at'];


    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_evodic_qa_questions';

    /**
     * @var array Validation rules
     */
    public $rules = [];

    protected $fillable = ['title', 'active', 'metadata', 'user_id', 'type'];

    protected $jsonable = ['metadata'];

    public $hasMany = [
        'answers' => ['Reuniors\Evodic\Models\QaAnswer', 'key' => 'qa_question_id']
    ];

    public $belongsTo = [
        'user' => ['RainLab\User\Models\User', 'key' => 'user_id']
    ];

    public function scopeActive($query)
    {
        return $query->where('active', 1);
    }
}
