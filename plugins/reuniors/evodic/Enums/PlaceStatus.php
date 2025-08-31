<?php

namespace reuniors\evodic\Enums;

enum PlaceStatus: string
{
    case DRAFT = 'draft';
    case PENDING = 'pending';
    case ACTIVE = 'active';
    case DELETED = 'deleted';
}
