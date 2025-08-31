<?php namespace Reuniors\Knk\Classes;

use Illuminate\Support\Str;

class S extends Str
{
    public static function camel($value, $extendTitle = '', $lc = true)
    {
        $asciiValue = Str::ascii($value);
        $value = $asciiValue !== $value
            ? $asciiValue . ' ' . $extendTitle
            : $asciiValue;
        $value = $lc
            ? strtolower($value)
            : $value;
        return parent::camel(
            LanguageHelpers::getTranslated($value)
        );
    }

    public static function slug($title, $extendTitle = '', $lc = true,  $separator = '-', $language = 'en')
    {
        $asciiValue = Str::ascii($title);
        $title = $asciiValue !== $title
            ? $asciiValue . ' ' . $extendTitle
            : $asciiValue;
        $title = $lc ? strtolower(Str::ascii($title)) : Str::ascii($title);
        $title = LanguageHelpers::getTranslated($title);
        return parent::slug($title, $separator, $language);
    }
}
