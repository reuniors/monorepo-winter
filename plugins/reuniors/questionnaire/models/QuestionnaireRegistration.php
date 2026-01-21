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

    protected $dates = ['deleted_at', 'deactivate_at_utc', 'wizard_started_at', 'wizard_completed_at', 'expires_at'];

    protected $fillable = [
        'code',
        'title',
        'metadata',
        'deactivate_at_utc',
        // Wizard support
        'wizard_definition_id',
        'current_step_id',
        'completed_steps_count',
        'total_steps_count',
        'wizard_status',
        'wizard_data',
        'wizard_started_at',
        'wizard_completed_at',
        'expires_at',
    ];

    protected $jsonable = ['metadata', 'wizard_data'];

    const DEACTIVATION_TIME_DURATION = 60 * 60 * 24; // 1 day

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_questionnaire_registration';

    /**
     * @var array Validation rules
     */
    public $rules = [];

    public $belongsTo = [
        'wizard_definition' => [
            WizardDefinition::class,
            'key' => 'wizard_definition_id'
        ],
        'current_step' => [
            WizardStep::class,
            'key' => 'current_step_id'
        ]
    ];

    public $hasMany = [
        'registration_data' => [
            QuestionnaireRegistrationData::class,
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
        if ($this->deactivate_at_utc == null) {
            $this->deactivate_at_utc = time() + self::DEACTIVATION_TIME_DURATION;
        }
    }

    public function scopeNotDeactivated($query)
    {
        $now = time();
        return $query->whereRaw("deactivate_at_utc > $now");
    }

    /**
     * Wizard-specific scopes
     */
    public function scopeIsWizard($query)
    {
        return $query->whereNotNull('wizard_definition_id');
    }

    public function scopeWizardInProgress($query)
    {
        return $query->where('wizard_status', 'in_progress');
    }

    public function scopeWizardCompleted($query)
    {
        return $query->where('wizard_status', 'completed');
    }

    /**
     * Check if wizard has expired
     */
    public function isExpired()
    {
        if (!$this->expires_at) {
            return false;
        }
        
        return $this->expires_at->isPast();
    }

    /**
     * Get wizard progress percentage
     */
    public function getWizardProgressAttribute()
    {
        if ($this->total_steps_count === 0) {
            return 0;
        }
        
        return round(($this->completed_steps_count / $this->total_steps_count) * 100);
    }

    /**
     * Update wizard progress
     */
    public function updateWizardProgress($stepId)
    {
        $this->current_step_id = $stepId;
        $this->completed_steps_count = $this->completed_steps_count + 1;
        
        if ($this->wizard_status === 'draft') {
            $this->wizard_status = 'in_progress';
            $this->wizard_started_at = now();
        }
        
        $this->save();
    }

    /**
     * Mark wizard as completed
     */
    public function completeWizard()
    {
        $this->wizard_status = 'completed';
        $this->wizard_completed_at = now();
        $this->save();
    }
}

