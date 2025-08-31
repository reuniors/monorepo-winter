<?php namespace Reuniors\Delivery\Http\Enum;

enum OrderStatusEnum: string
{
    case DRAFT = 'draft';
    case PENDING = 'pending';
    case ACCEPTED = 'accepted';
    case REJECTED = 'rejected';
    case CANCELED = 'canceled';
    case DELIVERED = 'delivered';
    case COMPLETED = 'completed';
    case REFUNDED = 'refunded';
}
