<?php namespace Reuniors\Base\Classes;

/**
 * Translation Entity Registry
 * 
 * This class manages the mapping of entity types to their corresponding model classes.
 * Plugins can register their own entity types by extending this registry.
 */
class TranslationEntityRegistry
{
    /**
     * @var array Registered entity types and their model classes
     */
    protected static $entityTypes = [];

    /**
     * Register an entity type with its model class
     *
     * @param string $entityType
     * @param string $modelClass
     * @return void
     */
    public static function register($entityType, $modelClass)
    {
        static::$entityTypes[$entityType] = $modelClass;
    }

    /**
     * Register multiple entity types at once
     *
     * @param array $entityTypes
     * @return void
     */
    public static function registerMany(array $entityTypes)
    {
        foreach ($entityTypes as $entityType => $modelClass) {
            static::register($entityType, $modelClass);
        }
    }

    /**
     * Get the model class for an entity type
     *
     * @param string $entityType
     * @return string
     * @throws \Exception
     */
    public static function getModelClass($entityType)
    {
        if (!isset(static::$entityTypes[$entityType])) {
            throw new \Exception("Entity type '{$entityType}' is not registered. Available types: " . implode(', ', array_keys(static::$entityTypes)));
        }

        $modelClass = static::$entityTypes[$entityType];
        
        if (!class_exists($modelClass)) {
            throw new \Exception("Model class not found: {$modelClass}");
        }

        return $modelClass;
    }

    /**
     * Get all registered entity types
     *
     * @return array
     */
    public static function getRegisteredTypes()
    {
        return static::$entityTypes;
    }

    /**
     * Check if an entity type is registered
     *
     * @param string $entityType
     * @return bool
     */
    public static function isRegistered($entityType)
    {
        return isset(static::$entityTypes[$entityType]);
    }

    /**
     * Clear all registered entity types (useful for testing)
     *
     * @return void
     */
    public static function clear()
    {
        static::$entityTypes = [];
    }
}
