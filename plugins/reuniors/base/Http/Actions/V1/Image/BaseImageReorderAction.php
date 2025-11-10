<?php namespace Reuniors\Base\Http\Actions\V1\Image;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Base\Classes\Helpers\ReorderDataHelper;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

/**
 * Base Image Reorder Action
 * 
 * Abstract base class for image reorder actions.
 * Reorder only works for attachMany (multiple images).
 * Uses ReorderDataHelper to handle reordering with from/to pairs.
 */
abstract class BaseImageReorderAction extends BaseAction
{
    public function rules()
    {
        return [
            'reorderData' => ['required', 'array'],
            'reorderData.*.from' => ['required', 'integer'],
            'reorderData.*.to' => ['required', 'integer'],
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
     * Get the attachment name for this reorder operation
     * 
     * @param array $attributes Request attributes
     * @return string The attachment name (must be attachMany)
     */
    abstract protected function getAttachmentName(array $attributes): string;

    /**
     * Optional: Override to add custom validation before reorder
     * 
     * @param mixed $entity The entity instance
     * @param array $attributes Request attributes
     * @return void
     * @throws BadRequestHttpException If validation fails
     */
    protected function validateBeforeReorder($entity, array $attributes): void
    {
        // Override in child classes for custom validation
    }

    public function handle(array $attributes = [], ...$args)
    {
        $reorderData = $attributes['reorderData'];

        // Get entity using abstract method
        $entity = $this->getEntity($attributes, ...$args);
        
        if (!$entity) {
            throw new NotFoundHttpException('Entity not found');
        }

        // Get attachment configuration
        $attachmentName = $this->getAttachmentName($attributes);

        // Custom validation (e.g., permission checks)
        $this->validateBeforeReorder($entity, $attributes);

        // Reorder only works for attachMany (multiple images)
        // This is enforced by the fact that attachOne doesn't have sort_order

        // Use ReorderDataHelper to handle reordering
        // It uses from/to pairs to swap sort_order values
        ReorderDataHelper::reorderModelData(
            $entity->{$attachmentName}()->getQuery(),
            $reorderData,
            'sort_order', // sort order key
            'id' // id key
        );

        return $entity->fresh([$attachmentName])->{$attachmentName};
    }
}
