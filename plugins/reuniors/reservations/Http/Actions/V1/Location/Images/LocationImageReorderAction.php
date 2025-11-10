<?php
namespace Reuniors\Reservations\Http\Actions\V1\Location\Images;

use Reuniors\Base\Http\Actions\V1\Image\BaseImageReorderAction;
use Reuniors\Reservations\Models\Location;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Location Image Reorder Action
 * 
 * Extends BaseImageReorderAction to provide custom logic:
 * - Uses locationSlug from requestData to find location
 * - Handles gallery reordering
 */
class LocationImageReorderAction extends BaseImageReorderAction
{
    public function rules()
    {
        return array_merge(parent::rules(), [
            'locationSlug' => ['required', 'string'],
            'attachmentName' => ['required', 'string', 'in:gallery'],
        ]);
    }

    protected function getEntity(array $attributes, ...$args)
    {
        // Get locationSlug from requestData (merged from frontend) or attributes
        $locationSlug = $attributes['locationSlug'] ?? null;
        
        if (!$locationSlug) {
            throw new BadRequestHttpException('locationSlug is required');
        }

        $location = Location::where('slug', $locationSlug)->first();
        
        if (!$location) {
            throw new NotFoundHttpException("Location not found: {$locationSlug}");
        }

        return $location;
    }

    protected function getAttachmentName(array $attributes): string
    {
        // Get attachmentName from attributes (merged from requestData on frontend)
        return $attributes['attachmentName'];
    }

    protected function validateBeforeReorder($entity, array $attributes): void
    {
        // Additional validation can be added here
    }
}

