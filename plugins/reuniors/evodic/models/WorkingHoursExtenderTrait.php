<?php namespace reuniors\evodic\models;

use Reuniors\Evodic\Models\WorkingTime;

trait WorkingHoursExtenderTrait
{
    public function syncWorkingHours(array $workingHours, $relationKey)
    {
        $existingWorkingHours = $this->{$relationKey};
        $index = 0;
        $workingHoursCount = count($workingHours);

        foreach ($existingWorkingHours as $indexKey => $existingWorkingTime) {
            if ($indexKey < $workingHoursCount) {
                $existingWorkingTime->update($workingHours[$indexKey]);
            } else {
                $existingWorkingTime->delete();
            }
            $index++;
        }

        for ($index; $index < $workingHoursCount; $index++) {
            $newWorkingTime = WorkingTime::create($workingHours[$index]);
            $this->{$relationKey}()->attach($newWorkingTime->id, ['type' => $relationKey]);
        }
    }
}
