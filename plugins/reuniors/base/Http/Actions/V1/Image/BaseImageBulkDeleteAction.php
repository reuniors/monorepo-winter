<?php namespace Reuniors\Base\Http\Actions\V1\Image;

use Reuniors\Base\Http\Actions\BaseAction;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

/**
 * Base Image Bulk Delete Action
 * 
 * Abstract base class for bulk image delete actions.
 * Allows deleting multiple images at once (only for attachMany).
 */
abstract class BaseImageBulkDeleteAction extends BaseAction
{
    public function rules()
    {
        return [
            'imagesIds' => ['required', 'array'],
            'imagesIds.*' => ['required', 'integer'],
        ];
    }

    /**
     * Get the entity that owns the images
     * 
     * @param array $attributes Request attributes
     * @param mixed ...$args Additional arguments (e.g., from model binding)
     * @return mixed The entity model instance
     * @throws NotFoundHttpException If entity not found
     */
    abstract protected function getEntity(array $attributes, ...$args);

    /**
     * Get the attachment name for this bulk delete operation
     * 
     * @param array $attributes Request attributes
     * @return string The attachment name (must be attachMany)
     */
    abstract protected function getAttachmentName(array $attributes): string;

    /**
     * Optional: Override to add custom validation before bulk delete
     * 
     * @param mixed $entity The entity instance
     * @param array $attributes Request attributes
     * @return void
     * @throws BadRequestHttpException If validation fails
     */
    protected function validateBeforeBulkDelete($entity, array $attributes): void
    {
        // Override in child classes for custom validation
    }

    public function handle(array $attributes = [], ...$args)
    {
        $imagesIds = $attributes['imagesIds'];

        // Get entity using abstract method
        $entity = $this->getEntity($attributes, ...$args);
        
        if (!$entity) {
            throw new NotFoundHttpException('Entity not found');
        }

        // Get attachment configuration
        $attachmentName = $this->getAttachmentName($attributes);

        // Custom validation (e.g., permission checks)
        $this->validateBeforeBulkDelete($entity, $attributes);

        // Bulk delete only works for attachMany (multiple images)
        // Get all images that belong to this entity and match the provided IDs
        $images = $entity->{$attachmentName}()->whereIn('id', $imagesIds)->get();
        
        if ($images->count() !== count($imagesIds)) {
            throw new BadRequestHttpException("Some images not found or do not belong to this entity");
        }

        // Delete all images
        foreach ($images as $image) {
            $image->delete();
        }

        // Return remaining images
        return [
            'images' => $entity->fresh([$attachmentName])->{$attachmentName},
        ];
    }
}

