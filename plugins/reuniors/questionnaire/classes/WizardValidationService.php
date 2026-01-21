<?php namespace Reuniors\Questionnaire\Classes;

use Reuniors\Questionnaire\Models\WizardField;
use Reuniors\Questionnaire\Models\WizardStep;
use Validator;

/**
 * WizardValidationService
 * 
 * Handles backend validation for wizard steps
 * Validates data based on field definitions from database
 */
class WizardValidationService
{
    /**
     * Validate step data
     * 
     * @param WizardStep $step
     * @param array $data
     * @return array Returns ['valid' => bool, 'errors' => array]
     */
    public function validateStep(WizardStep $step, array $data)
    {
        $fields = $step->fields;
        $rules = [];
        $messages = [];
        $attributes = [];

        foreach ($fields as $field) {
            $fieldRules = $this->buildFieldRules($field);
            
            if (!empty($fieldRules)) {
                $rules[$field->field_key] = $fieldRules;
            }

            // Custom field label for error messages
            $attributes[$field->field_key] = $field->field_label;

            // Custom validation messages if defined
            if ($field->validation_rules && isset($field->validation_rules['messages'])) {
                foreach ($field->validation_rules['messages'] as $rule => $message) {
                    $messages["{$field->field_key}.{$rule}"] = $message;
                }
            }
        }

        // Run validation
        $validator = Validator::make($data, $rules, $messages, $attributes);

        if ($validator->fails()) {
            return [
                'valid' => false,
                'errors' => $validator->errors()->toArray()
            ];
        }

        return ['valid' => true, 'errors' => []];
    }

    /**
     * Build Laravel validation rules from field definition
     * 
     * @param WizardField $field
     * @return array|string
     */
    protected function buildFieldRules(WizardField $field)
    {
        $rules = [];

        // Required
        if ($field->is_required) {
            $rules[] = 'required';
        } else {
            $rules[] = 'nullable';
        }

        // Field type validation
        switch ($field->field_type) {
            case 'text':
            case 'text_area':
                $rules[] = 'string';
                break;
            
            case 'email':
                $rules[] = 'email';
                break;
            
            case 'number':
                $rules[] = 'numeric';
                break;
            
            case 'phone':
                $rules[] = 'string';
                break;
            
            case 'select':
            case 'autocomplete':
                // Validate against options if provided
                if ($field->field_options && isset($field->field_options['options'])) {
                    $validValues = array_column($field->field_options['options'], 'value');
                    $rules[] = 'in:' . implode(',', $validValues);
                }
                break;
            
            case 'checkbox':
                $rules[] = 'boolean';
                break;
            
            case 'date':
                $rules[] = 'date';
                break;
            
            case 'time':
                $rules[] = 'date_format:H:i';
                break;
        }

        // Additional validation rules from field definition
        if ($field->validation_rules) {
            // Min length
            if (isset($field->validation_rules['min'])) {
                $rules[] = 'min:' . $field->validation_rules['min'];
            }

            // Max length
            if (isset($field->validation_rules['max'])) {
                $rules[] = 'max:' . $field->validation_rules['max'];
            }

            // Regex pattern
            if (isset($field->validation_rules['regex'])) {
                $rules[] = 'regex:' . $field->validation_rules['regex'];
            }

            // Numeric min/max
            if (isset($field->validation_rules['min_value'])) {
                $rules[] = 'min:' . $field->validation_rules['min_value'];
            }

            if (isset($field->validation_rules['max_value'])) {
                $rules[] = 'max:' . $field->validation_rules['max_value'];
            }

            // Custom validation rule
            if (isset($field->validation_rules['custom'])) {
                $rules[] = $field->validation_rules['custom'];
            }
        }

        return implode('|', $rules);
    }

    /**
     * Validate entire wizard data before final submission
     * 
     * @param array $wizardData All collected wizard data
     * @param WizardDefinition $wizardDefinition
     * @return array
     */
    public function validateCompleteWizard($wizardData, $wizardDefinition)
    {
        $allErrors = [];
        $isValid = true;

        foreach ($wizardDefinition->steps as $step) {
            $stepKey = $step->slug;
            $stepData = $wizardData[$stepKey] ?? [];

            $validation = $this->validateStep($step, $stepData);

            if (!$validation['valid']) {
                $isValid = false;
                $allErrors[$stepKey] = $validation['errors'];
            }
        }

        return [
            'valid' => $isValid,
            'errors' => $allErrors
        ];
    }
}
