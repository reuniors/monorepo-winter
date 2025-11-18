<?php
namespace Reuniors\Reservations\Http\Actions\V1\Location\ServiceGroups;

use Reuniors\Base\Http\Actions\V1\Image\BaseImageDeleteAction;
use Reuniors\Reservations\Models\ServiceGroup;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

/**
 * Service Group Image Delete Action
 * 
 * Handles avatar deletion for service groups
 */
class ServiceGroupImageDeleteAction extends BaseImageDeleteAction
{
    protected function getEntity(array $attributes, ...$args)
    {
        // Get service group from model binding (first argument after attributes)
        $serviceGroup = $args[0] ?? null;
        
        if (!$serviceGroup || !($serviceGroup instanceof ServiceGroup)) {
            throw new BadRequestHttpException('Service group not found');
        }

        return $serviceGroup;
    }

    protected function getAttachmentName(array $attributes): string
    {
        return 'avatar';
    }

    protected function isMulti(array $attributes): bool
    {
        return false; // Avatar is single image (attachOne)
    }

    public function asController(ServiceGroup $serviceGroup = null): array
    {
        return parent::asController($serviceGroup);
    }
}

