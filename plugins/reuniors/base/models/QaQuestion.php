<?php namespace Reuniors\Base\Models;

use Model;

/**
 * QaQuestion Model
 */
class QaQuestion extends Model
{
    use \October\Rain\Database\Traits\Validation;
    use \October\Rain\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at'];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_base_qa_questions';

    public $implement = ['@Winter.Translate.Behaviors.TranslatableModel'];
    public $translatable = [
        'question',
        'answer',
    ];

    /**
     * @var array Fillable fields
     */
    public $fillable = [
        'question',
        'answer',
        'order',
    ];

    /**
     * @var array Validation rules
     */
    public $rules = [
        'question' => 'required|string',
        'answer' => 'nullable|string',
        'order' => 'nullable|integer|min:0',
    ];
}
