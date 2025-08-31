<?php namespace Reuniors\Questionnaire\Models;

use Model;
use reuniors\questionnaire\enums\QuestionnaireStatusEnum;

/**
 * Model
 */
class QuestionnaireRegistrationData extends Model
{
    use \Winter\Storm\Database\Traits\Validation;

    use \Winter\Storm\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at'];

    public const AVAILABLE_STATUSES = [
        QuestionnaireStatusEnum::DRAFT,
        QuestionnaireStatusEnum::SUBMITTED,
        QuestionnaireStatusEnum::APPROVED,
    ];

    protected $fillable = [
        'data',
        'type',
        'status',
        'questionnaire_registration_id',
    ];

    protected $jsonable = ['data'];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_questionnaire_registration_data';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];

    const PHOTO_UPLOAD_LIMITS = [
        'questionnaire_data_images' => 10,
        'gallery_images' => 20,
    ];

    public $attachMany = [
        'questionnaire_data_images' => ['System\Models\File', 'delete' => true],
        'gallery_images' => ['System\Models\File', 'delete' => true],
    ];

    public $attachOne = [
        'cover_image' => ['System\Models\File', 'delete' => true],
        'logo' => ['System\Models\File', 'delete' => true],
    ];

    public $belongsTo = [
        'questionnaire_registration' => [
            'Reuniors\Questionnaire\Models\QuestionnaireRegistration',
            'key' => 'questionnaire_registration_id',
        ],
        'parent_data_id' => [
            'Reuniors\Questionnaire\Models\QuestionnaireRegistrationData',
            'key' => 'parent_data_id',
        ],
    ];
}
