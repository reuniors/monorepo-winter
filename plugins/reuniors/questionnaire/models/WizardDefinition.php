<?php namespace Reuniors\Questionnaire\Models;

use Model;

/**
 * WizardDefinition Model
 * 
 * Represents a complete wizard configuration with multiple steps
 */
class WizardDefinition extends Model
{
    use \Winter\Storm\Database\Traits\Validation;
    use \Winter\Storm\Database\Traits\SoftDelete;

    protected $table = 'reuniors_wizard_definitions';
    
    protected $fillable = [
        'slug',
        'name',
        'description',
        'type',
        'is_active',
        'requires_auth',
        'requires_approval',
        'auto_create_entities',
        'primary_entity_type',
        'primary_entity_table',
        'metadata',
    ];

    protected $jsonable = ['metadata'];
    
    protected $casts = [
        'is_active' => 'boolean',
        'requires_auth' => 'boolean',
        'requires_approval' => 'boolean',
        'auto_create_entities' => 'boolean',
    ];

    protected $dates = ['deleted_at'];

    public $rules = [
        'slug' => 'required|unique:reuniors_wizard_definitions,slug',
        'name' => 'required|max:255',
        'type' => 'required|max:50',
    ];

    public $hasMany = [
        'steps' => [
            WizardStep::class,
            'key' => 'wizard_definition_id',
            'order' => 'sort_order'
        ],
        'registrations' => [
            QuestionnaireRegistration::class,
            'key' => 'wizard_definition_id'
        ]
    ];

    /**
     * Scope to get only active wizards
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Get wizard with all steps and fields
     */
    public function scopeWithFullDefinition($query)
    {
        return $query->with(['steps' => function ($q) {
            $q->orderBy('sort_order')
              ->with(['fields' => function ($fq) {
                  $fq->orderBy('sort_order');
              }]);
        }]);
    }

    /**
     * Get total steps count
     */
    public function getTotalStepsAttribute()
    {
        return $this->steps()->count();
    }
}
