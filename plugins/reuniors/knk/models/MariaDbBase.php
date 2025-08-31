<?php namespace Reuniors\Knk\Models;

use Illuminate\Support\Facades\DB;
use Model;
use Exception;
use Reuniors\Knk\Classes\Helpers\ArrayH;
use Winter\Storm\Database\Traits\Sortable;

abstract class MariaDbBase extends Model
{
    protected $connection = 'mariadb';

    public function getMetaData($metaName = null, $metaKey = 'metadata', $defaultValue = null)
    {
        if (!$this->jsonable || in_array($metaKey, $this->jsonable)) {
            throw new Exception("No $metaKey in jsonable array");
        }
        $resultData = !isset($this->{$metaKey}) || empty($this->{$metaKey})
            ? []
            : $this->{$metaKey};
        if (!isset($metaName)) {
            return $resultData;
        }
        return ArrayH::getDeepData($metaName, $resultData, $defaultValue);
    }

    public function setMetaData($value, $metaKey, $metaName = null, $metaNameChild = null) {
        $resultData = !isset($this->{$metaKey}) || empty($this->{$metaKey})
            ? []
            : $this->{$metaKey};
        if (!isset($metaName)) {
            $resultData = $value;
            $this->{$metaKey} = $resultData;
            return;
        }
        if (!isset($this->{$metaKey}[$metaName]) || empty($this->{$metaKey}[$metaName])) {
            $resultData[$metaName] = [];
        }
        if (!isset($metaNameChild)) {
            $resultData[$metaName] = $value;
            $this->{$metaKey} = $resultData;
            return;
        }
        $resultData[$metaName][$metaNameChild] = $value;
        $this->{$metaKey} = $resultData;
    }

    /**
     * @param array $attributes
     * @param null $sessionKey
     * @return static
     */
    public static function createNew(array $attributes, $sessionKey = null): MariaDbBase
    {
        $model = new static();

        foreach ($attributes as $attrKey => $attrVal) {
            $model->$attrKey = $attrVal;
        }

        $model->save(null, $sessionKey);

        return $model;
    }

    public static function reorderData($collectionData, array $sortedIds)
    {
        if (!in_array(Sortable::class, class_uses(static::class))) {
            throw new Exception('Invalid model for sort');
        }
        $existingData = $collectionData->whereIn('id', $sortedIds)
            ->orderBy(static::SORT_ORDER)
            ->get();
        $existingDataById = $collectionData->whereIn('id', $sortedIds)
            ->orderBy(static::SORT_ORDER)
            ->get()
            ->keyBy('id');
        if ($existingData->count() !== count($sortedIds)) {
            throw new Exception('Invalid data ids');
        }
        DB::beginTransaction();
        try {
            foreach (array_values($sortedIds) as $index => $modelId) {
                if (!$existingDataById[$modelId]) {
                    throw new Exception("Data not exists, id: $modelId");
                }
                $existingDataById[$modelId]->{static::SORT_ORDER} = $existingData[$index]->{static::SORT_ORDER};
                $existingDataById[$modelId]->save();
            }
            DB::commit();
        } catch (Exception $exception) {
            DB::rollBack();
            throw $exception;
        }
    }
}
