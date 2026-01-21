<?php namespace Reuniors\Questionnaire\Models;

use Model;

/**
 * WizardField Model
 * 
 * Represents a single field within a wizard step
 */
class WizardField extends Model
{
    use \Winter\Storm\Database\Traits\Validation;
    use \Winter\Storm\Database\Traits\SoftDelete;

    protected $table = 'reuniors_wizard_fields';
    
    protected $fillable = [
        'wizard_step_id',
        'parent_field_id',
        'field_key',
        'field_label',
        'field_type',
        'sort_order',
        'is_required',
        'is_visible',
        'is_readonly',
        'default_value',
        'placeholder',
        'help_text',
        'target_field_name',
        'target_field_path',
        'field_options',
        'validation_rules',
        'conditions',
        'metadata',
    ];

    protected $jsonable = ['field_options', 'validation_rules', 'conditions', 'metadata'];
    
    protected $casts = [
        'is_required' => 'boolean',
        'is_visible' => 'boolean',
        'is_readonly' => 'boolean',
        'sort_order' => 'integer',
    ];

    protected $dates = ['deleted_at'];

    public $rules = [
        'wizard_step_id' => 'required|exists:reuniors_wizard_steps,id',
        'field_key' => 'required|max:100',
        'field_label' => 'required|max:255',
        'field_type' => 'required|max:50',
    ];

    public $belongsTo = [
        'wizard_step' => [
            WizardStep::class,
            'key' => 'wizard_step_id'
        ],
        'parent_field' => [
            WizardField::class,
            'key' => 'parent_field_id'
        ]
    ];

    public $hasMany = [
        'child_fields' => [
            WizardField::class,
            'key' => 'parent_field_id',
            'order' => 'sort_order'
        ]
    ];

    /**
     * Get field with all nested fields
     */
    public function scopeWithNestedFields($query)
    {
        return $query->with(['child_fields' => function ($q) {
            $q->orderBy('sort_order');
        }]);
    }

    /**
     * Check if field is part of a complex field group
     */
    public function isNestedField()
    {
        return $this->parent_field_id !== null;
    }

    /**
     * Get default value parsed
     */
    public function getParsedDefaultValue()
    {
        if (empty($this->default_value)) {
            return null;
        }

        // Try to decode JSON
        $decoded = json_decode($this->default_value, true);
        return $decoded !== null ? $decoded : $this->default_value;
    }
}
