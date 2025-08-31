<?php namespace Reuniors\Knk\Classes;

use Cms\Classes\Controller;
use Redirect;
use Cookie;

class Cookies
{
    public static function redirectHome()
    {
        $citySlug = Cookie::get('citySlug');
        if ($citySlug) {
            $controller = Controller::getController() ?: new Controller;
            if (!$controller->param('citySlug')) {
                $fileName = 'home';
                $redirectUrl = $controller->pageUrl($fileName, [
                    'citySlug' => $citySlug
                ]);
                return Redirect::to($redirectUrl);
            }
        }
    }
}
