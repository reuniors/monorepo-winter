<?php
namespace Reuniors\WinterSocialite\Http\Middlewares;

use Winter\Translate\Classes\Translator;
use App;
use Closure;
use Response;

class UserLanguageMiddleware
{
    public function handle($request, Closure $next, ...$groups)
    {
        // get the user language from header App-Lang
        $userLang = $request->header('App-Lang');

        if ($userLang === 'en') {
            $userLang = 'eng';
        }

        if ($userLang) {
            $translator = Translator::instance();
            $translator->setLocale($userLang);
        }

        return $next($request);
    }
}
