<?php namespace Reuniors\Knk\Classes;

class HelperCommon
{
    public static $standardComponentProperties = [
        'sortBy' => [
            'title'       => 'Sort by',
            'description' => 'Sort by',
            'default'     => null,
            'type'        => 'dropdown',
        ],
        'sortByOrientation' => [
            'title'       => 'Sort by Orientation',
            'description' => 'Sort by Orientation',
            'default'     => 'desc',
            'type'        => 'dropdown',
            'options'     => [
                'asc' => 'Ascending',
                'desc' => 'Descending'
            ]
        ],
        'perPage' => [
            'title'             => 'Per page',
            'type'              => 'string',
            'validationPattern' => '^[0-9]+$',
            'default'           => '10',
        ],
        'pageNumber' => [
            'title'       => 'Page',
            'type'              => 'string',
            'validationPattern' => '^[0-9]+$',
            'default'     => '{{ :page }}',
        ],
    ];

    public static $oldSiteCategoryPrefixes = [
        'restorani', 'brza-hrana', 'dostava',
        'picerije', 'kafane', 'poslastice',
        'zatvoreni-objekti',
    ];

    public static $oldSiteSlugPrefixes = [
        'restoran', 'brza-hrana', 'dostava',
        'picerija', 'kafana', 'poslastica',
    ];

    public static $oldSiteMenuPrefix = 'jelovnik';

    const OLD_SITE_SLUG_DELIMITER = '-';

    public static function shortenCategorySlug($oldCategorySlug, $citySlug, &$isOldCategorySite = false)
    {
        $isOldCategorySite = false;
        $delimiter = self::OLD_SITE_SLUG_DELIMITER;
        if (in_array($oldCategorySlug, self::$oldSiteCategoryPrefixes)) {
            return $oldCategorySlug;
        }
        foreach (self::$oldSiteCategoryPrefixes as $categorySlug) {
            if (str_contains($oldCategorySlug, "$categorySlug$delimiter") ||
                str_contains($oldCategorySlug, "$delimiter$categorySlug")
            ) {
                $isOldCategorySite = true;
                return $categorySlug;
            }
        }
        return $oldCategorySlug;
    }

    public static function shortenMenuSlug($oldMenuSlug, &$isOldMenuSlug = false)
    {
        $isOldMenuSlug = false;
        $oldSiteMenuPrefix = self::$oldSiteMenuPrefix;
        $delimiter = self::OLD_SITE_SLUG_DELIMITER;
        if (str_contains($oldMenuSlug, $oldSiteMenuPrefix)) {
            $newSlug = str_replace("$delimiter$oldSiteMenuPrefix", '', $oldMenuSlug);
            $newSlug = str_replace("$oldSiteMenuPrefix$delimiter", '', $newSlug);
            $isOldMenuSlug = true;
            return $newSlug;
        }
        return $oldMenuSlug;
    }

    public static function shortenSlug($oldSlug, &$isOldSlug = false)
    {
        $isOldSlug = false;
        $delimiter = self::OLD_SITE_SLUG_DELIMITER;
        if (in_array($oldSlug, self::$oldSiteCategoryPrefixes)) {
            return $oldSlug;
        }
        foreach (self::$oldSiteSlugPrefixes as $slug) {
            if (str_contains($oldSlug, "$slug$delimiter") ||
                str_contains($oldSlug, "$delimiter$slug")
            ) {
                $newSlug = str_replace("$slug$delimiter", '', $oldSlug);
                $newSlug = str_replace("$delimiter$slug", '', $newSlug);
                $isOldSlug = true;
                return $newSlug;
            }
        }
        return $oldSlug;
    }

    public static function hasNumberInString ($string, $numberOfNumbers = 1)
    {
        $searchNumbers = str_repeat('[0-9]', $numberOfNumbers);
        return preg_match("#$searchNumbers#",$string);
    }

    public static function implodeLikeCamelCase($array)
    {
        return S::camel(implode('', $array));
    }

    public static function fixSlugIt($slug)
    {
        $newTag = [];
        if (\Str::contains($slug, '-it-')) {
            $slugExploded = explode('-', $slug);
            foreach ($slugExploded as $slugPart) {
                if ($slugPart == 'it') {
                    break;
                }
                $newTag[] = $slugPart;
            }
        }
        if (!empty($newTag)) {
            $slug = implode('-', $newTag);
        }
        return $slug;
    }
}
