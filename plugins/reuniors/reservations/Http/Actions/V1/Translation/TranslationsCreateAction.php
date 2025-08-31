<?php

namespace Reuniors\Reservations\Http\Actions\V1\Translation;

use Reuniors\Reservations\Http\Actions\BaseAction;
use Illuminate\Http\Request;

class TranslationsCreateAction extends BaseAction
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
            $modelClass = $this->getModelClass($entityType);
            
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

    /**
     * Get model class for entity type
     *
     * @param string $entityType
     * @return string
     * @throws \Exception
     */
    private function getModelClass($entityType)
    {
        $validEntityTypes = [
            'promo_code' => 'Reuniors\Reservations\Models\PromoCode',
            'location_worker' => 'Reuniors\Reservations\Models\LocationWorker',
            'location' => 'Reuniors\Reservations\Models\Location',
            'service' => 'Reuniors\Reservations\Models\Service',
            'service_group' => 'Reuniors\Reservations\Models\ServiceGroup',
        ];

        if (!isset($validEntityTypes[$entityType])) {
            throw new \Exception("Invalid entity type: {$entityType}");
        }

        $modelClass = $validEntityTypes[$entityType];
        if (!class_exists($modelClass)) {
            throw new \Exception("Model class not found: {$modelClass}");
        }

        return $modelClass;
    }
} 