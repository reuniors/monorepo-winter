<?php
namespace Reuniors\Reservations\Http\Actions\V1\Location\Workers\Shifts;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;
use Reuniors\Reservations\Models\LocationWorker;
use Reuniors\Reservations\Models\LocationWorkerShift;

class LocationWorkingShiftsDeleteDayShiftAction extends BaseAction {
    public function rules()
    {
        return [
            'locationSlug' => ['string', 'required'],
            'dateUtc' => ['date', 'required'],
            'workerId' => ['integer', 'required'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $dateUtc = $attributes['dateUtc'];
        $locationSlug = $attributes['locationSlug'];
        $workerId = $attributes['workerId'];

        $location = Location::where('slug', $locationSlug)
            ->firstOrFail();
        /** @var LocationWorker $locationWorker */
        $locationWorker = $location
            ->workers()
            ->where('id', $workerId)
            ->firstOrFail();
        
        $existingLocationWorkerShift = LocationWorkerShift::where('location_worker_id', $locationWorker->id)
            ->where('location_id', $location->id)
            ->whereDate('date_utc', $dateUtc)
            ->first();
        
        if ($existingLocationWorkerShift) {
            $existingLocationWorkerShift->delete();
            return $existingLocationWorkerShift;
        }
        
        return null;
    }
}

