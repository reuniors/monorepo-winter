<?php

namespace Reuniors\Reservations\Http\Actions\V1\Translation;

use Reuniors\Base\Http\Actions\BaseAction;
use Illuminate\Http\Request;
use RainLab\Translate\Models\Locale;

class TranslationsGetLanguagesAction extends BaseAction
{
    public function rules()
    {
        return [];
    }

    public function handle(array $attributes = [])
    {
        try {
            // Get enabled locales from database
            $enabledLocales = Locale::listEnabled();
            
            // Get current app language
            $currentLanguage = app()->getLocale();
            
            // Filter out current language and format response
            $availableLanguages = [];
            foreach ($enabledLocales as $code => $name) {
                if ($code !== $currentLanguage) {
                    $availableLanguages[] = [
                        'code' => $code,
                        'name' => $name,
                    ];
                }
            }

            return [
                'languages' => $availableLanguages,
                'currentLanguage' => $currentLanguage,
            ];
        } catch (\Exception $e) {
            throw $e;
        }
    }
} 