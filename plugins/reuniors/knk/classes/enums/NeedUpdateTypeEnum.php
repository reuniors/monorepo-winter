<?php namespace Reuniors\Knk\Classes\Enums;

use Reuniors\Knk\Models\Location;

enum NeedUpdateTypeEnum: string
{
    case LOCATION = Location::class;
}
