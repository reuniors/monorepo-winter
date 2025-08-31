<?php

namespace Reuniors\Reservations\Http\Actions\V1\Translation;

use Reuniors\Reservations\Http\Actions\BaseAction;
use Illuminate\Http\Request;
use RainLab\Translate\Models\Locale;

class TranslationsGetAction extends BaseAction
{
    public function rules()
    {
        return [
            'entityType' => 'required|string|max:100',
            'entityId' => 'required|integer',
            'language' => 'nullable|string|max:10',
        ];
    }

    public function handle(array $attributes = [])
    {
        try {
            $entityType = $attributes['entityType'];
            $entityId = $attributes['entityId'];
            $language = $attributes['language'] ?? null;

            // Get the model class
            $modelClass = $this->getModelClass($entityType);
            
            // Find the entity
            $entity = $modelClass::find($entityId);
            if (!$entity) {
                throw new \Exception("Entity not found: {$entityType} with ID {$entityId}");
            }

            // Get translatable fields
            $translatableFields = $entity->translatable ?? [];
            
            if (empty($translatableFields)) {
                return [];
            }

            $result = [];

            if ($language) {
                // Get translations for specific language
                foreach ($translatableFields as $field) {
                    if (is_string($field)) {
                        $translatedValue = $entity->getAttributeTranslated($field, $language);
                        // If the translated value is the same as the default value, it means no translation exists
                        $defaultValue = $entity->getAttribute($field);
                        if ($translatedValue !== $defaultValue) {
                            $result[$field] = $translatedValue;
                        } else {
                            $result[$field] = null;
                        }
                    }
                }
            } else {
                // Get all translations grouped by language
                $availableLanguages = $this->getAvailableLanguages();
                
                foreach ($availableLanguages as $lang) {
                    $langTranslations = [];
                    foreach ($translatableFields as $field) {
                        if (is_string($field)) {
                            $translatedValue = $entity->getAttributeTranslated($field, $lang);
                            // If the translated value is the same as the default value, it means no translation exists
                            $defaultValue = $entity->getAttribute($field);
                            if ($translatedValue !== $defaultValue) {
                                $langTranslations[$field] = $translatedValue;
                            } else {
                                $langTranslations[$field] = null;
                            }
                        }
                    }
                    // Always include the language, even if all translations are null
                    $result[$lang] = $langTranslations;
                }
            }

            return $result;
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

    /**
     * Get available languages from database
     *
     * @return array
     */
    private function getAvailableLanguages()
    {
        return array_keys(Locale::listEnabled());
    }
} 