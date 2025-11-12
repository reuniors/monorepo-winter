<?php
namespace Reuniors\Reservations\Http\Actions\V1\Location\Images;

use Reuniors\Base\Http\Actions\V1\Image\BaseImageUploadAction;
use Reuniors\Reservations\Models\Location;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Location Image Upload Action
 * 
 * Extends BaseImageUploadAction to provide custom logic:
 * - Uses locationSlug from requestData to find location
 * - Handles logo, cover, gallery, and pwa_icon uploads
 */
class LocationImageUploadAction extends BaseImageUploadAction
{
    public function rules()
    {
        return array_merge(parent::rules(), [
            'locationSlug' => ['required', 'string'],
            'attachmentName' => ['required', 'string', 'in:logo,cover,gallery,pwa_icon'],
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

    protected function isMulti(array $attributes): bool
    {
        $attachmentName = $attributes['attachmentName'];
        
        // gallery is multi-image, others are single
        return $attachmentName === 'gallery';
    }

    protected function validateBeforeUpload($entity, array $attributes): void
    {
        // Additional validation can be added here
        // For example: check if user has permission to upload images for this location
    }

    /**
     * Generate filename based on location slug and timestamp
     * Format: {locationSlug}-{YYYY-MM-DD-HH-mm}.{extension}
     * Example: berbernica-tanja-2025-01-09-22-35.jpg
     */
    protected function generateFileName($entity, array $attributes, $file): ?string
    {
        $locationSlug = $attributes['locationSlug'] ?? $entity->slug ?? null;
        
        if (!$locationSlug) {
            return null; // Fallback to default filename
        }

        // Get file extension
        $extension = $file->getClientOriginalExtension() ?: 'jpg';
        
        // Clean location slug (remove special characters, keep only alphanumeric and hyphens)
        $cleanSlug = preg_replace('/[^a-z0-9-]/', '-', strtolower($locationSlug));
        $cleanSlug = preg_replace('/-+/', '-', $cleanSlug);
        $cleanSlug = trim($cleanSlug, '-');
        
        // Generate timestamp
        $now = now();
        $timestamp = $now->format('Y-m-d-H-i');
        
        return "{$cleanSlug}-{$timestamp}.{$extension}";
    }
}

