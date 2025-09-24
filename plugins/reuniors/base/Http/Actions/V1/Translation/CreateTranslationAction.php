<?php namespace Reuniors\Base\Http\Actions\V1\Translation;

use Illuminate\Http\Request;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Base\Classes\TranslationEntityRegistry;
use Reuniors\Base\Http\Actions\BaseAction;

class CreateTranslationAction extends BaseAction
{   
    public function rules()
    {
        return [
            'entityType' => 'required|string|max:100',
            'entityId' => 'required|integer',
            'language' => 'required|string|max:10',
            'fieldName' => 'required|string|max:100',
            'fieldValue' => 'required|string',
        ];
    }

    public function handle(array $attributes = [])
    {
        try {
            $entityType = $attributes['entityType'];
            $entityId = $attributes['entityId'];
            $language = $attributes['language'];
            $fieldName = $attributes['fieldName'];
            $fieldValue = $attributes['fieldValue'];

            // Get the model class
            $modelClass = TranslationEntityRegistry::getModelClass($entityType);
            
            // Find the entity
            $entity = $modelClass::find($entityId);
            if (!$entity) {
                throw new \Exception("Entity not found: {$entityType} with ID {$entityId}");
            }

            // Check if the field is translatable
            $translatableFields = $entity->translatable ?? [];
            $isTranslatable = false;
            
            foreach ($translatableFields as $field) {
                if (is_string($field) && $field === $fieldName) {
                    $isTranslatable = true;
                    break;
                }
            }

            if (!$isTranslatable) {
                throw new \Exception("Field '{$fieldName}' is not translatable for entity type '{$entityType}'");
            }

            // Set the translation
            $entity->setAttributeTranslated($fieldName, $fieldValue, $language);
            
            // Save the entity to persist the translation
            $entity->save();

            return [
                'entityType' => $entityType,
                'entityId' => $entityId,
                'language' => $language,
                'fieldName' => $fieldName,
                'fieldValue' => $fieldValue,
                'message' => 'Translation saved successfully'
            ];
        } catch (\Exception $e) {
            throw $e;
        }
    }
}
