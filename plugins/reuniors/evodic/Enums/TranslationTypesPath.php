<?php namespace reuniors\evodic\Enums;

use Reuniors\Evodic\Models\Location;
use Reuniors\Evodic\Models\Place;
use Reuniors\Evodic\Models\PlaceType;

enum TranslationTypesPath: string
{
    case Location = Location::class;
    case Place = Place::class;
    case Place_type = PlaceType::class;

    public static function fromName(string $name){
        $name = ucfirst($name);
        return constant("self::$name")->value;
    }

    public static function getEnumKeys(): array
    {
        $casesKeys = array_column(TranslationTypesPath::cases(), 'name');
        return array_map(fn($case) => strtolower($case), array_map('strtolower', $casesKeys));
    }
}
