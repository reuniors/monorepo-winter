<?php

namespace Reuniors\Evodic\Models;

use Illuminate\Database\Eloquent\Collection;

trait ClearCacheTrait
{
    public abstract function getLocationsRelation();

    public function forgetLocationsCache()
    {
        $locations = $this->getLocationsRelation()->get();
        $locations->each(function ($location) {
            Location::forgetAll($location->slug);
        });
    }

    protected function afterCreate()
    {
        parent::afterCreate();
        $this->forgetLocationsCache();
    }

    protected function afterUpdate()
    {
        parent::afterUpdate();
        $this->forgetLocationsCache();
    }

    protected function afterSave()
    {
        parent::afterDelete();
        $this->forgetLocationsCache();
    }

    protected function beforeDelete()
    {
        parent::beforeDelete();
        $this->locations;
    }

    protected function afterDelete()
    {
        parent::afterDelete();
        $this->forgetLocationsCache();
    }
}
