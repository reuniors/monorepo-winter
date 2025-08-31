<?php namespace Reuniors\Reservations\Http\Actions\V1\Administration;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Reservations\Http\Actions\V1\Location\Workers\LocationWorkerShiftsByDaysGetAction;
use Reuniors\Reservations\Models\LocationWorker;

class PrepareDaysReminder
{
    use AsAction;

    public function reminderNotification()
    {

    }

    public function handle()
    {
        $allWorkers = LocationWorker::active()
            ->get();
        $workersToNotify = [];

        foreach ($allWorkers as $worker) {
            $shiftsByDays = LocationWorkerShiftsByDaysGetAction::run([
                'locationSlug' => $worker->location->slug,
                'workerId' => $worker->id,
            ]);
            if ($shiftsByDays->count() < 5) {
                $workersToNotify[] = $worker->user;
            }
        }
    }
}
