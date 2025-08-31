<?php

namespace reuniors\evodic\Enums;

enum OwnerStatus: string
{
    case DRAFT = 'draft';
    case WITHOUT_USER = 'without_user';
    case CREATED = 'created';
    case PENDING = 'pending';
    case ACTIVE = 'active';
    case DELETED = 'deleted';
}
