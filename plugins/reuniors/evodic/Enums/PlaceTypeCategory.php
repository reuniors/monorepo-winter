<?php

namespace reuniors\evodic\Enums;

enum PlaceTypeCategory: string
{
    case CATEGORY_RESTAURANT = 'eat-drink';
    case CATEGORY_GO_OUT = 'go-out';
    case CATEGORY_HOTEL = 'sleep';
    case CATEGORY_SHOP = 'shop';
    case CATEGORY_ATTRACTION = 'attraction';
    case CATEGORY_EVENT = 'event';
    case CATEGORY_TRANSPORT = 'transport';
    case CATEGORY_OTHER = 'other';
}
