<?php namespace Reuniors\Knk\Classes\Casts;

use Carbon\Carbon;

class TimeCast
{
    public function get($model, string $key, $value, array $attributes)
    {
        return  Carbon::parse($value);
    }

    public function set($model, string $key, $value, array $attributes)
    {
        return $value->format('H:i:s');
    }
}
