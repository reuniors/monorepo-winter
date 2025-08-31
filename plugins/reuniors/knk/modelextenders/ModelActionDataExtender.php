<?php namespace Reuniors\Knk\ModelExtenders;

use Reuniors\Knk\Models\Action\ActionData;

trait ModelActionDataExtender
{
    /**
     * @var ActionData
     */
    protected $actionData;

    abstract public function setActionData(array $data);

    abstract public function setPivotActionData(array $pivotData, $attachToRelationName, $attachToId);

    public function saveActionData()
    {
        foreach ($this->actionData->getData() as $dataKey => $dataValue) {
            $this->{$dataKey} = $dataValue;
        }
        if ($this->actionData->isAttach()) {
            foreach ($this->actionData->getPivotData() as $pivotKey => $pivotData) {
                $id = $pivotData['id'];
                unset($pivotData['id']);
                if ($id && $this->hasRelation($pivotKey)) {
                    $this->{$pivotKey}()->syncWithoutDetaching([$id => $pivotData]);
                }
            }
        } elseif ($this->actionData->isUpdate()) {
            $this->forceSave();

        } elseif ($this->actionData->isDelete()) {
            $this->delete();
        } elseif ($this->actionData->isDetach()) {
            foreach ($this->actionData->getPivotData() as $pivotKey => $pivotData) {
                $id = $pivotData['id'];
                if ($id && $this->hasRelation($pivotKey)) {
                    $this->{$pivotKey}()->detach($id);
                }
            }
        }
    }

    /**
     * @throws \Exception
     */
    public static function setActionDataWrapper(
        array $data,
        $id = null,
        $actionType = null,
        $attachToRelationName = null,
        $attachToId = null
    ) {
        $selfData = $id
            ? self::findOrFail($id)
            : new self();
        if ($attachToRelationName) {
            $selfData->setPivotActionData($data, $attachToRelationName, $attachToId);
        } else {
            $selfData->setActionData($data);
        }
        $selfData->actionData->setActionType($actionType);
        return $selfData;
    }
}
