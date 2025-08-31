<?php namespace Reuniors\Evodic\Http\Actions\V1\Language;

use Reuniors\Evodic\Http\Actions\BaseAction;
use Winter\Translate\Classes\Translator;
use Winter\Translate\Models\Locale;

class GetLanguagesAction extends BaseAction
{
    public function handle(array $attributes = [])
    {
        $translator = Translator::instance();

        return [
            'list' => Locale::listEnabled(),
            'current' => $translator->getLocale(true),
            'default' => $translator->getDefaultLocale(),
        ];
    }
}
