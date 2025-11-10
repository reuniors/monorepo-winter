<?php
namespace Reuniors\Reservations\Http\Actions\V1\Location\Workers;

use Reuniors\Base\Http\Actions\V1\Image\BaseImageDeleteAction;
use Reuniors\Reservations\Models\LocationWorker;
use Reuniors\Reservations\Models\Location;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

/**
 * Location Worker Avatar Delete Action
 * 
 * Extends BaseImageDeleteAction to provide custom logic:
 * - Uses model binding for LocationWorker
 * - Validates that worker belongs to the location (if locationSlug is provided)
 */
class LocationWorkerAvatarDeleteAction extends BaseImageDeleteAction
{
    public function rules()
    {
        // Override parent rules - for attachOne, we don't need imageId
        // because we can get it from the entity's attachment
        return [
            'locationSlug' => ['sometimes', 'string'], // Optional: for permission validation
        ];
    }

    protected function getEntity(array $attributes, ...$args)
    {
        // Get worker from model binding (first argument after attributes)
        $worker = $args[0] ?? null;
        
        if (!$worker || !($worker instanceof LocationWorker)) {
            throw new BadRequestHttpException('Worker not found');
        }

        // Optional: Validate that worker belongs to location if locationSlug is provided
        if (isset($attributes['locationSlug'])) {
            $location = Location::where('slug', $attributes['locationSlug'])->first();
            if (!$location) {
                throw new BadRequestHttpException('Location not found');
            }

            // Verify that the worker belongs to this location
            if (!$worker->locations->contains($location->id)) {
                throw new BadRequestHttpException('Worker does not belong to this location');
            }
        }

        return $worker;
    }

    protected function getAttachmentName(array $attributes): string
    {
        return 'avatar';
    }

    protected function isMulti(array $attributes): bool
    {
        return false; // Avatar is single image (attachOne)
    }

    protected function validateBeforeDelete($entity, array $attributes): void
    {
        // Additional custom validation can be added here
    }
}
