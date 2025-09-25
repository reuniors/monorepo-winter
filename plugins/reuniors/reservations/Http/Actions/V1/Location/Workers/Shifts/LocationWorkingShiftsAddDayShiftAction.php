<?php
namespace Reuniors\Reservations\Http\Actions\V1\Location\Workers\Shifts;

use Carbon\Carbon;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;
use Reuniors\Reservations\Models\LocationWorker;
use Reuniors\Reservations\Models\LocationWorkerShift;

class LocationWorkingShiftsAddDayShiftAction extends BaseAction {
    public function rules()
    {
        return [
            'locationSlug' => ['string', 'required'],
            'date' => ['date', 'required'],
            'shift' => ['integer', 'nullable'],
            'workerId' => ['integer', 'required'],
            'timeFrom' => ['string', 'nullable'],
            'timeTo' => ['string', 'nullable'],
            'pauses' => ['array', 'nullable'],
            'pauses.*.timeFrom' => ['string', 'required'],
            'pauses.*.timeTo' => ['string', 'required'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $date = $attributes['date'];
        $locationSlug = $attributes['locationSlug'];
        $workerId = $attributes['workerId'];
        $shift = $attributes['shift'] ?? null;
        $timeFrom = $attributes['timeFrom'] ?? null;
        $timeTo = $attributes['timeTo'] ?? null;
        $pauses = $attributes['pauses'] ?? null;

        $location = Location::where('slug', $locationSlug)
            ->firstOrFail();
        /** @var LocationWorker $locationWorker */
        $locationWorker = $location
            ->workers()
            ->where('id', $workerId)
            ->with('working_hours')
            ->firstOrFail();
        $existingLocationWorkerShift = LocationWorkerShift::where('location_worker_id', $locationWorker->id)
            ->where('location_id', $location->id)
            ->whereDate('date', $date)
            ->first();
        $workingTime = $locationWorker->getWorkingTimeByDateAndShift($date, $shift);
        if ($existingLocationWorkerShift) {
            $existingLocationWorkerShift->shift = $shift;
            $existingLocationWorkerShift->time_from = $timeFrom ?? $workingTime['time_from'];
            $existingLocationWorkerShift->time_to = $timeTo ?? $workingTime['time_to'];
            $existingLocationWorkerShift->pauses = $pauses;
            $existingLocationWorkerShift->save();
            return $existingLocationWorkerShift;
        } else {
            if (!$workingTime) {
                throw new \Exception('Workers is not working on this day');
            }
            return LocationWorkerShift::create([
                'location_worker_id' => $locationWorker->id,
                'location_id' => $location->id,
                'date' => $date,
                'shift' => $shift,
                'time_from' => $timeFrom ?? $workingTime['time_from'],
                'time_to' => $timeTo ?? $workingTime['time_to'],
                'pauses' => $pauses,
            ]);
        }
    }
}
