<?php

namespace Reuniors\Reservations\Http\Actions\V1\Location\WorkerWorkingHours;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\LocationWorker;
use Reuniors\Reservations\Models\WorkingTime;

class WorkerWorkingHoursDeleteAction extends BaseAction
{
    public function rules()
    {
        return [
            'id' => ['required', 'integer'],
            'worker_id' => ['required', 'integer'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $worker = LocationWorker::find($attributes['worker_id']);
        if (!$worker) {
            throw new \Exception('Worker not found');
        }

        $workingHours = WorkingTime::find($attributes['id']);
        if (!$workingHours) {
            throw new \Exception('Working hours not found');
        }

        // Detach from worker
        $worker->working_hours()->detach($workingHours->id);

        // Delete the working hours if not used by other workers
        if ($workingHours->workers()->count() === 0) {
            $workingHours->delete();
        }

        return true;
    }
}
