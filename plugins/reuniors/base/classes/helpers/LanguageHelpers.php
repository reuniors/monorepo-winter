<?php namespace Reuniors\Base\Classes\Helpers;

class LanguageHelpers
{
    public static function cyrToLat($text)
    {
        return strtr($text, self::CYR_TO_LAT);
    }

    public static function latToCyr($text)
    {
        return strtr($text, array_flip(self::CYR_TO_LAT));
    }

    protected static $labelsEnToSr = [
        'Sizes' => 'Veličine',
        'Additional' => 'Dodatno',
    ];

    const CYR_TO_LAT = [
        'А' => 'A', 'а' => 'a',
        'Б' => 'B', 'б' => 'b',
        'В' => 'V', 'в' => 'v',
        'Г' => 'G', 'г' => 'g',
        'Д' => 'D', 'д' => 'd',
        'Ђ' => 'Đ', 'ђ' => 'đ',
        'Е' => 'E', 'е' => 'e',
        'Ж' => 'Ž', 'ж' => 'ž',
        'З' => 'Z', 'з' => 'z',
        'И' => 'I', 'и' => 'i',
        'Ј' => 'J', 'ј' => 'j',
        'К' => 'K', 'к' => 'k',
        'Л' => 'L', 'л' => 'l',
        'Љ' => 'Lj', 'љ' => 'lj',
        'М' => 'M', 'м' => 'm',
        'Н' => 'N', 'н' => 'n',
        'Њ' => 'Nj', 'њ' => 'nj',
        'О' => 'O', 'о' => 'o',
        'П' => 'P', 'п' => 'p',
        'Р' => 'R', 'р' => 'r',
        'С' => 'S', 'с' => 's',
        'Т' => 'T', 'т' => 't',
        'Ћ' => 'Ć', 'ћ' => 'ć',
        'У' => 'U', 'у' => 'u',
        'Ф' => 'F', 'ф' => 'f',
        'Х' => 'H', 'х' => 'h',
        'Ц' => 'C', 'ц' => 'c',
        'Ч' => 'Č', 'ч' => 'č',
        'Џ' => 'Dž', 'џ' => 'dž',
        'Ш' => 'Š', 'ш' => 'š',
    ];

    public static function getTranslated($label)
    {
        return isset(self::$labelsEnToSr[$label])
            ? self::$labelsEnToSr[$label]
            : self::cyrToLat($label);
    }
}
