<?php namespace Reuniors\Base\Models;

use Model;

/**
 * Translation Model
 */
class Translation extends Model
{
    use \October\Rain\Database\Traits\Validation;

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_base_translations';

    /**
     * @var array Fillable fields
     */
    public $fillable = [
        'entity_type',
        'entity_id',
        'field_name',
        'language',
        'value',
    ];

    /**
     * @var array Validation rules
     */
    public $rules = [
        'entity_type' => 'required|string|max:255',
        'entity_id' => 'required|integer',
        'field_name' => 'required|string|max:255',
        'language' => 'required|string|size:5',
        'value' => 'required|string',
    ];

    /**
     * Scope to get translations for specific entity
     */
    public function scopeForEntity($query, $entityType, $entityId)
    {
        return $query->where('entity_type', $entityType)
                    ->where('entity_id', $entityId);
    }

    /**
     * Scope to get translations for specific field
     */
    public function scopeForField($query, $entityType, $entityId, $fieldName)
    {
        return $query->where('entity_type', $entityType)
                    ->where('entity_id', $entityId)
                    ->where('field_name', $fieldName);
    }
}
