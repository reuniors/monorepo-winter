<?php

namespace reuniors\questionnaire\enums;

enum QuestionnaireStatusEnum: string
{
    case DRAFT = 'draft';
    case SUBMITTED = 'submitted';
    case APPROVED = 'approved';
    case REJECTED = 'rejected';
    case CANCELLED = 'cancelled';
    case DELETED = 'deleted';

    public static function getAllValues(): array
    {
        return array_column(self::cases(), 'value');
    }
}
