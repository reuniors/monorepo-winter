<?php namespace Reuniors\Base\Http\Actions\V1\Image;

use Reuniors\Base\Http\Actions\BaseAction;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

/**
 * Base Image Delete Action
 * 
 * Abstract base class for image delete actions.
 * Child classes must implement abstract methods to define:
 * - Which entity the image belongs to
 * - Which attachment name to use
 * - Whether it's a single or multiple image attachment
 */
abstract class BaseImageDeleteAction extends BaseAction
{
    public function rules()
    {
        // attachmentId is only required for attachMany (multi-image)
        // For attachOne, we can get the image from the entity's attachment
        return [
            'attachmentId' => ['sometimes', 'integer'],
        ];
    }

    /**
     * Get the entity that owns the image
     * 
     * @param array $attributes Request attributes
     * @param mixed ...$args Additional arguments (e.g., from model binding)
     * @return mixed The entity model instance
     * @throws NotFoundHttpException If entity not found
     */
    abstract protected function getEntity(array $attributes, ...$args);

    /**
     * Get the attachment name for this delete operation
     * 
     * @param array $attributes Request attributes
     * @return string The attachment name (e.g., 'avatar', 'logo', 'gallery')
     */
    abstract protected function getAttachmentName(array $attributes): string;

    /**
     * Check if this is a multi-image attachment (attachMany) or single (attachOne)
     * 
     * @param array $attributes Request attributes
     * @return bool True if multi-image, false if single image
     */
    abstract protected function isMulti(array $attributes): bool;

    /**
     * Optional: Override to add custom validation before delete
     * 
     * @param mixed $entity The entity instance
     * @param array $attributes Request attributes
     * @return void
     * @throws BadRequestHttpException If validation fails
     */
    protected function validateBeforeDelete($entity, array $attributes): void
    {
        // Override in child classes for custom validation
    }

    public function handle(array $attributes = [], ...$args)
    {
        // Get entity using abstract method
        $entity = $this->getEntity($attributes, ...$args);
        
        if (!$entity) {
            throw new NotFoundHttpException('Entity not found');
        }

        // Get attachment configuration
        $attachmentName = $this->getAttachmentName($attributes);
        $isMulti = $this->isMulti($attributes);

        // Custom validation (e.g., permission checks)
        $this->validateBeforeDelete($entity, $attributes);

        // Handle single image (attachOne) - no attachmentId needed
        if (!$isMulti) {
            if ($entity->{$attachmentName}) {
                $entity->{$attachmentName}->delete();
                return true;
            }
            
            // No attachment to delete, but that's okay
            return true;
        }

        // Handle multiple images (attachMany) - requires attachmentId
        $attachmentId = $attributes['attachmentId'] ?? null;
        if (!$attachmentId) {
            throw new BadRequestHttpException('attachmentId is required for multi-image attachments');
        }

        $image = $entity->{$attachmentName}()->where('id', $attachmentId)->first();
        if (!$image) {
            throw new NotFoundHttpException("Image not found or does not belong to this entity");
        }
        
        $image->delete();
        
        return true;
    }
}
