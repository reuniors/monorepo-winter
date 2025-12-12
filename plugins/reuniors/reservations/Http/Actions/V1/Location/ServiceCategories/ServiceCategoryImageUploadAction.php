<?php
namespace Reuniors\Reservations\Http\Actions\V1\Location\ServiceCategories;

use Reuniors\Base\Http\Actions\V1\Image\BaseImageUploadAction;
use Reuniors\Reservations\Models\ServiceCategory;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

/**
 * Service Category Image Upload Action
 * 
 * Handles image upload for service categories
 */
class ServiceCategoryImageUploadAction extends BaseImageUploadAction
{
    protected function getEntity(array $attributes, ...$args)
    {
        // Get service category from model binding (first argument after attributes)
        $serviceCategory = $args[0] ?? null;
        
        if (!$serviceCategory || !($serviceCategory instanceof ServiceCategory)) {
            throw new BadRequestHttpException('Service category not found');
        }

        return $serviceCategory;
    }

    protected function getAttachmentName(array $attributes): string
    {
        return 'image';
    }

    protected function isMulti(array $attributes): bool
    {
        return false; // Image is single image (attachOne)
    }

    protected function validateBeforeUpload($entity, array $attributes): void
    {
        // Additional custom validation can be added here if needed
    }

    public function asController(ServiceCategory $serviceCategory = null): array
    {
        return parent::asController($serviceCategory);
    }
}

