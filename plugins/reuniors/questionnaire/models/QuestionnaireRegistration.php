<?php namespace Reuniors\Questionnaire\Models;

use Model;
use Winter\Storm\Support\Str;

/**
 * Model
 */
class QuestionnaireRegistration extends Model
{
    use \Winter\Storm\Database\Traits\Validation;

    use \Winter\Storm\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at', 'deactivate_at', 'deactivate_at_utc'];

    protected $fillable = [
        'code',
        'title',
        'metadata',
        'deactivate_at',
        'deactivate_at_utc',
    ];

    protected $jsonable = ['metadata'];

    const DEACTIVATION_TIME_DURATION = 60 * 60 * 24; // 1 day

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_questionnaire_registration';

    /**
     * @var array Validation rules
     */
    public $rules = [];

    public $hasMany = [
        'registration_data' => [
            'Reuniors\Questionnaire\Models\QuestionnaireRegistrationData',
            'key' => 'questionnaire_registration_id',
        ],
        'location_images' => [
            'File',
            'key' => 'questionnaire_registration_id',
            'scope' => 'locationImages',
        ]
    ];

    public function beforeCreate()
    {
        parent::beforeCreate();

        if ($this->code == null) {
            $this->code = Str::uuid();
        }
        if ($this->deactivate_at == null) {
            $this->deactivate_at = time() + self::DEACTIVATION_TIME_DURATION;
        }
    }

    public function scopeNotDeactivated($query)
    {
        $now = time();
        return $query->whereRaw("deactivate_at > $now");
    }
}
