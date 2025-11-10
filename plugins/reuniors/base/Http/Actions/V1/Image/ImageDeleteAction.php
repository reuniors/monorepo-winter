<?php namespace Reuniors\Base\Http\Actions\V1\Image;

use Reuniors\Base\Classes\ImageActionRegistry;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

/**
 * Image Delete Action (Registry-based)
 * 
 * This action uses the ImageActionRegistry to handle deletions for any registered image type.
 */
class ImageDeleteAction extends BaseImageDeleteAction
{
    public function rules()
    {
        return array_merge(parent::rules(), [
            'type' => ['required', 'string'],
            'appName' => ['required', 'string'],
            'attachmentName' => ['required', 'string'],
            'entityId' => ['required', 'integer'],
        ]);
    }

    protected function getEntity(array $attributes, ...$args)
    {
        $type = $attributes['type'];
        $appName = $attributes['appName'];
        $entityId = $attributes['entityId'];

        // Validate type and appName match
        $config = ImageActionRegistry::getConfig($type);
        if ($config['appName'] !== $appName) {
            throw new BadRequestHttpException("App name '{$appName}' does not match registered app name for type '{$type}'");
        }

        // Get model class and find entity
        $modelClass = ImageActionRegistry::getModelClass($type);
        $entity = $modelClass::find($entityId);
        
        if (!$entity) {
            throw new NotFoundHttpException("Entity not found: {$type} with ID {$entityId}");
        }

        return $entity;
    }

    protected function getAttachmentName(array $attributes): string
    {
        $type = $attributes['type'];
        $attachmentName = $attributes['attachmentName'];

        // Validate attachment exists for this type
        ImageActionRegistry::getAttachmentConfig($type, $attachmentName);

        return $attachmentName;
    }

    protected function isMulti(array $attributes): bool
    {
        $type = $attributes['type'];
        $attachmentName = $attributes['attachmentName'];

        return ImageActionRegistry::isMulti($type, $attachmentName);
    }
}
