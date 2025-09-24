<?php namespace Reuniors\Evodic\Http\Actions\V1\Language;

use Reuniors\Base\Http\Actions\BaseAction;
use Auth;
use Winter\Translate\Classes\Translator;

class ChangeLanguageAction extends BaseAction
{
    public function rules()
    {
        return [
            'languageCode' => ['required', 'string'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $lang = $attributes['languageCode'];
        $translator = Translator::instance();
        $translator->setLocale($lang);

        return true;
    }
}
