<?php namespace Reuniors\Knk\Models\Action;

use Reuniors\Knk\Classes\S;

class ActionData
{
    const ACTION_TYPE_UPDATE = 'update';
    const ACTION_TYPE_DELETE = 'delete';
    const ACTION_TYPE_ATTACH = 'attach';
    const ACTION_TYPE_DETACH = 'detach';
    protected static $availableActionTypes = [
        self::ACTION_TYPE_DELETE,
        self::ACTION_TYPE_UPDATE,
        self::ACTION_TYPE_ATTACH,
        self::ACTION_TYPE_DETACH,
    ];
    /** @var bool */
    protected $hasSlug;
    /** @var bool */
    protected $hasName;
    /** @var bool */
    protected $actionType = 'update';
    protected $requiredFields = [];
    protected $dataToModelMapper = [];
    protected $pivotDataToModelMapper = [];
    protected $specialMappedData = [];
    protected $data = [];
    protected $pivotData = [];

    public function addToDataMapper($dataName, $modelName = null): ActionData
    {
        $this->dataToModelMapper[$dataName] = $modelName ?? $dataName;
        return $this;
    }

    public function addToPivotDataMapper($pivotDataName, $pivotName, $modelName = null): ActionData
    {
        if (!isset($this->pivotDataToModelMapper[$pivotName])) {
            $this->pivotDataToModelMapper[$pivotName] = [];
        }
        $this->pivotDataToModelMapper[$pivotName][$pivotDataName] = $modelName ?? $pivotDataName;
        return $this;
    }

    public function addToSpecialMappedData($dataName, $modelName = null): ActionData
    {
        $this->specialMappedData[$dataName] = $modelName ?? $dataName;
        return $this;
    }

    public function generateAndSetNameToData(string $title)
    {
        $this->data['name'] = S::camel($title);
    }

    public function generateAndSetSlugToData(string $title)
    {
        $this->data['slug'] = S::slug($title);
    }

    public function setHasSlug($hasSlug): ActionData
    {
        $this->hasSlug = $hasSlug;
        return $this;
    }

    public function setHasName($hasName): ActionData
    {
        $this->hasName = $hasName;
        return $this;
    }

    public function setIsUpdate(): ActionData
    {
        $this->actionType = self::ACTION_TYPE_UPDATE;
        return $this;
    }

    public function setIsDelete(): ActionData
    {
        $this->actionType = self::ACTION_TYPE_DELETE;
        return $this;
    }

    public function setIsAttach(): ActionData
    {
        $this->actionType = self::ACTION_TYPE_ATTACH;
        return $this;
    }

    public function setIsDetach(): ActionData
    {
        $this->actionType = self::ACTION_TYPE_DETACH;
        return $this;
    }

    public function setActionType($actionType): ActionData
    {
        if (in_array($actionType, self::$availableActionTypes)) {
            $this->actionType = $actionType;
        }
        return $this;
    }

    public function isUpdate(): bool
    {
        return $this->actionType === self::ACTION_TYPE_UPDATE;
    }

    public function isDelete(): bool
    {
        return $this->actionType === self::ACTION_TYPE_DELETE;
    }

    public function isAttach(): bool
    {
        return $this->actionType === self::ACTION_TYPE_ATTACH;
    }

    public function isDetach(): bool
    {
        return $this->actionType === self::ACTION_TYPE_DETACH;
    }

    /**
     * @throws \Exception
     */
    public function checkRequiredData(array $data)
    {
        $dataFields = array_keys($data);
        $missingFields = array_diff($this->requiredFields, $dataFields);
        if (!empty($missingFields)) {
            throw new \Exception('Missing required fields: ' . implode(', ', $missingFields));
        }
    }

    /**
     * @throws \Exception
     */
    public function setData(array $data): ActionData
    {
        $this->checkRequiredData($data);
        foreach ($this->getMappedData() as $mapFrom => $mapTo) {
            if (array_key_exists($mapFrom, $data)) {
                $this->data[$mapTo] = $data[$mapFrom];
            }
        }
        if ($this->hasName && isset($data['title']) && !isset($data['name'])) {
            $this->generateAndSetNameToData($data['title']);
        }
        if ($this->hasSlug && isset($data['title']) && !isset($data['slug'])) {
            $this->generateAndSetSlugToData($data['title']);
        }
        return $this;
    }

    public function setPivotData(array $data, $attachToRelationName, $attachToId): ActionData
    {
        foreach ($this->getPivotMappedData() as $pivotName => $pivotData) {
            if ($pivotName !== $attachToRelationName) {
                continue;
            }
            $this->pivotData[$pivotName]['id'] = $attachToId;
            foreach ($pivotData as $mapFrom => $mapTo) {
                if (isset($data['pivot']) && array_key_exists($mapFrom, $data['pivot'])) {
                    if (!isset($this->pivotData[$pivotName])) {
                        $this->pivotData[$pivotName] = [];
                    }
                    $this->pivotData[$pivotName][$mapTo] = $data['pivot'][$mapFrom];
                }
            }
        }
        return $this;
    }

    protected function getMappedData(): array
    {
        return $this->dataToModelMapper;
    }

    protected function getPivotMappedData(): array
    {
        return $this->pivotDataToModelMapper;
    }

    public function getData()
    {
        return $this->data;
    }

    public function getPivotData()
    {
        return $this->pivotData;
    }

    public function getSpecialMappedData(): array
    {
        return $this->specialMappedData;
    }
}
