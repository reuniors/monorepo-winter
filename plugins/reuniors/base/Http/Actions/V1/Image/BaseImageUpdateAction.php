<?php namespace Reuniors\Base\Http\Actions\V1\Image;

use Reuniors\Base\Http\Actions\BaseAction;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

/**
 * Base Image Update Action
 * 
 * Abstract base class for image update actions.
 * Child classes must implement abstract methods to define:
 * - Which entity the image belongs to
 * - Which attachment name to use
 * - Whether it's a single or multiple image attachment
 */
abstract class BaseImageUpdateAction extends BaseAction
{
    public function rules()
    {
        return [
            'attachmentId' => ['required', 'integer'],
            'file' => ['required', 'file', 'image', 'max:2048'], // Max 2MB
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
     * Get the attachment name for this update operation
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
     * Optional: Override to add custom validation before update
     * 
     * @param mixed $entity The entity instance
     * @param array $attributes Request attributes
     * @return void
     * @throws BadRequestHttpException If validation fails
     */
    protected function validateBeforeUpdate($entity, array $attributes): void
    {
        // Override in child classes for custom validation
    }

    public function handle(array $attributes = [], ...$args)
    {
        $attachmentId = $attributes['attachmentId'];

        // Get entity using abstract method
        $entity = $this->getEntity($attributes, ...$args);
        
        if (!$entity) {
            throw new NotFoundHttpException('Entity not found');
        }

        // Get attachment configuration
        $attachmentName = $this->getAttachmentName($attributes);
        $isMulti = $this->isMulti($attributes);

        // Custom validation (e.g., permission checks)
        $this->validateBeforeUpdate($entity, $attributes);

        // Get the file from request
        $file = request()->file('file');
        if (!$file) {
            throw new BadRequestHttpException('File is required');
        }

        // Handle single image (attachOne)
        if (!$isMulti) {
            // Verify the image ID matches
            if ($entity->{$attachmentName} && $entity->{$attachmentName}->id === $attachmentId) {
                // Update the existing attachment
                $entity->{$attachmentName}->data = $file;
                $entity->{$attachmentName}->save();
                
                return $entity->fresh([$attachmentName])->{$attachmentName};
            }
            
            throw new NotFoundHttpException("Image not found or does not belong to this entity");
        }

        // Handle multiple images (attachMany)
        $image = $entity->{$attachmentName}()->where('id', $attachmentId)->first();
        if (!$image) {
            throw new NotFoundHttpException("Image not found or does not belong to this entity");
        }
        
        $image->data = $file;
        $image->save();
        
        return $image;
    }
}
