<?php namespace Reuniors\Questionnaire\Models;

use Model;

/**
 * WizardStep Model
 * 
 * Represents a single step within a wizard
 */
class WizardStep extends Model
{
    use \Winter\Storm\Database\Traits\Validation;
    use \Winter\Storm\Database\Traits\SoftDelete;

    protected $table = 'reuniors_wizard_steps';
    
    protected $fillable = [
        'wizard_definition_id',
        'slug',
        'name',
        'description',
        'sort_order',
        'is_skippable',
        'is_informational',
        'target_entity_type',
        'target_entity_table',
        'data_storage_strategy',
        'validation_rules',
        'conditions',
        'metadata',
    ];

    protected $jsonable = ['validation_rules', 'conditions', 'metadata'];
    
    protected $casts = [
        'is_skippable' => 'boolean',
        'is_informational' => 'boolean',
        'sort_order' => 'integer',
    ];

    protected $dates = ['deleted_at'];

    public $rules = [
        'wizard_definition_id' => 'required|exists:reuniors_wizard_definitions,id',
        'slug' => 'required|max:100',
        'name' => 'required|max:255',
    ];

    public $belongsTo = [
        'wizard_definition' => [
            WizardDefinition::class,
            'key' => 'wizard_definition_id'
        ]
    ];

    public $hasMany = [
        'fields' => [
            WizardField::class,
            'key' => 'wizard_step_id',
            'order' => 'sort_order'
        ]
    ];

    /**
     * Get step with all fields ordered
     */
    public function scopeWithFields($query)
    {
        return $query->with(['fields' => function ($q) {
            $q->orderBy('sort_order');
        }]);
    }

    /**
     * Get total fields count
     */
    public function getTotalFieldsAttribute()
    {
        return $this->fields()->count();
    }

    /**
     * Check if step is valid for submission
     */
    public function isReadyForSubmission()
    {
        if ($this->is_informational) {
            return true;
        }
        
        return $this->fields()->count() > 0;
    }
}
