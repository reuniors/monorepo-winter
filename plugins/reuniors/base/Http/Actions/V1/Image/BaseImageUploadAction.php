<?php namespace Reuniors\Base\Http\Actions\V1\Image;

use Reuniors\Base\Http\Actions\BaseAction;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

/**
 * Base Image Upload Action
 * 
 * Abstract base class for image upload actions.
 * Child classes must implement abstract methods to define:
 * - Which entity to upload to
 * - Which attachment name to use
 * - Whether it's a single or multiple image attachment
 * 
 * This allows for custom permission checks and validations in child classes.
 */
abstract class BaseImageUploadAction extends BaseAction
{
    public function rules()
    {
        return [
            'file' => ['required', 'file', 'image', 'max:2048'], // Max 2MB
        ];
    }

    /**
     * Get the entity to upload the image to
     * 
     * @param array $attributes Request attributes
     * @param mixed ...$args Additional arguments (e.g., from model binding)
     * @return mixed The entity model instance
     * @throws NotFoundHttpException If entity not found
     */
    abstract protected function getEntity(array $attributes, ...$args);

    /**
     * Get the attachment name for this upload
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
     * Optional: Override to add custom validation before upload
     * 
     * @param mixed $entity The entity instance
     * @param array $attributes Request attributes
     * @return void
     * @throws BadRequestHttpException If validation fails
     */
    protected function validateBeforeUpload($entity, array $attributes): void
    {
        // Override in child classes for custom validation
    }

    /**
     * Generate a custom filename for the uploaded image
     * 
     * Override this method in child classes to customize filename generation.
     * Default implementation returns null, which means the original filename will be used.
     * 
     * @param mixed $entity The entity instance
     * @param array $attributes Request attributes
     * @param \Illuminate\Http\UploadedFile $file The uploaded file
     * @return string|null Custom filename or null to use original
     */
    protected function generateFileName($entity, array $attributes, $file): ?string
    {
        // Override in child classes to generate custom filenames
        return null;
    }

    public function handle(array $attributes = [], ...$args)
    {
        // Get entity using abstract method (allows for custom logic/permissions)
        $entity = $this->getEntity($attributes, ...$args);
        
        if (!$entity) {
            throw new NotFoundHttpException('Entity not found');
        }

        // Get attachment configuration
        $attachmentName = $this->getAttachmentName($attributes);
        $isMulti = $this->isMulti($attributes);

        // Custom validation (e.g., permission checks)
        $this->validateBeforeUpload($entity, $attributes);

        // Get the file from request
        $file = request()->file('file');
        if (!$file) {
            throw new BadRequestHttpException('File is required');
        }

        // Handle single image (attachOne)
        if (!$isMulti) {
            // Delete existing attachment if exists
            if ($entity->{$attachmentName}) {
                $entity->{$attachmentName}->delete();
            }
            
            // Upload new attachment
            $entity->{$attachmentName} = $file;
            $entity->save();
            
            $attachment = $entity->fresh([$attachmentName])->{$attachmentName};
            
            // Generate custom filename if method is overridden
            $customFileName = $this->generateFileName($entity, $attributes, $file);
            if ($customFileName !== null) {
                $attachment->file_name = $customFileName;
                $attachment->save();
            }
            
            return $attachment;
        }

        // Handle multiple images (attachMany)
        $fileModel = $entity->{$attachmentName}()->create(['data' => $file]);
        
        // Generate custom filename if method is overridden
        $customFileName = $this->generateFileName($entity, $attributes, $file);
        if ($customFileName !== null) {
            $fileModel->file_name = $customFileName;
            $fileModel->save();
        }
        
        return $fileModel;
    }
}
