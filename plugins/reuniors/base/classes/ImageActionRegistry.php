<?php namespace Reuniors\Base\Classes;

/**
 * Image Action Registry
 * 
 * This class manages the mapping of image action types to their corresponding configuration.
 * Plugins can register their own image action types by extending this registry.
 */
class ImageActionRegistry
{
    /**
     * @var array Registered image action types and their configurations
     * Format: [
     *   'type' => [
     *     'modelClass' => 'Model\Class',
     *     'appName' => 'rzr',
     *     'attachments' => [
     *       'avatar' => ['relation' => 'attachOne', 'multi' => false],
     *       'gallery' => ['relation' => 'attachMany', 'multi' => true],
     *     ]
     *   ]
     * ]
     */
    protected static $imageTypes = [];

    /**
     * Register an image action type
     *
     * @param string $type
     * @param string $modelClass
     * @param string $appName
     * @param array $attachments Array of attachment configurations
     * @return void
     */
    public static function register($type, $modelClass, $appName, array $attachments)
    {
        static::$imageTypes[$type] = [
            'modelClass' => $modelClass,
            'appName' => $appName,
            'attachments' => $attachments,
        ];
    }

    /**
     * Register multiple image action types at once
     *
     * @param array $imageTypes
     * @return void
     */
    public static function registerMany(array $imageTypes)
    {
        foreach ($imageTypes as $type => $config) {
            static::register(
                $type,
                $config['modelClass'],
                $config['appName'],
                $config['attachments']
            );
        }
    }

    /**
     * Get the configuration for an image action type
     *
     * @param string $type
     * @return array
     * @throws \Exception
     */
    public static function getConfig($type)
    {
        if (!isset(static::$imageTypes[$type])) {
            throw new \Exception("Image type '{$type}' is not registered. Available types: " . implode(', ', array_keys(static::$imageTypes)));
        }

        return static::$imageTypes[$type];
    }

    /**
     * Get the model class for an image action type
     *
     * @param string $type
     * @return string
     * @throws \Exception
     */
    public static function getModelClass($type)
    {
        $config = static::getConfig($type);
        $modelClass = $config['modelClass'];
        
        if (!class_exists($modelClass)) {
            throw new \Exception("Model class not found: {$modelClass}");
        }

        return $modelClass;
    }

    /**
     * Get attachment configuration for a specific type and attachment name
     *
     * @param string $type
     * @param string $attachmentName
     * @return array
     * @throws \Exception
     */
    public static function getAttachmentConfig($type, $attachmentName)
    {
        $config = static::getConfig($type);
        
        if (!isset($config['attachments'][$attachmentName])) {
            throw new \Exception("Attachment '{$attachmentName}' is not registered for type '{$type}'. Available attachments: " . implode(', ', array_keys($config['attachments'])));
        }

        return $config['attachments'][$attachmentName];
    }

    /**
     * Check if attachment is multi (attachMany) or single (attachOne)
     *
     * @param string $type
     * @param string $attachmentName
     * @return bool
     */
    public static function isMulti($type, $attachmentName)
    {
        $attachmentConfig = static::getAttachmentConfig($type, $attachmentName);
        return $attachmentConfig['multi'] ?? false;
    }

    /**
     * Get all registered image action types
     *
     * @return array
     */
    public static function getRegisteredTypes()
    {
        return static::$imageTypes;
    }

    /**
     * Check if an image action type is registered
     *
     * @param string $type
     * @return bool
     */
    public static function isRegistered($type)
    {
        return isset(static::$imageTypes[$type]);
    }

    /**
     * Clear all registered image action types (useful for testing)
     *
     * @return void
     */
    public static function clear()
    {
        static::$imageTypes = [];
    }
}

