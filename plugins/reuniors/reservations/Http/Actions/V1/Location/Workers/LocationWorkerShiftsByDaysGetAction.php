<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\Workers;

use Carbon\Carbon;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;
use Reuniors\Reservations\Models\LocationWorkerShift;

class LocationWorkerShiftsByDaysGetAction extends BaseAction {
    public function rules()
    {
        return [
            'locationSlug' => ['string', 'required'],
            'workerId' => ['integer'],
            'perPage' => ['integer'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $locationSlug = $attributes['locationSlug'];
        $workerId = $attributes['workerId'] ?? null;
        $startDate = Carbon::now()->startOfDay();
        $perPage = $attributes['perPage'] ?? 60;

        $location = Location::where('slug', $locationSlug)
            ->firstOrFail();
//        $locationWorker = $location->workers()
//            ->where('id', $workerId)
//            ->with('working_hours')
//            ->firstOrFail();

        $shiftsByDay = LocationWorkerShift::workersShiftsByDay([
            'locationSlug' => $locationSlug,
            'workerId' => $workerId,
            'startDate' => $startDate,
        ]);

        return $shiftsByDay
            ->where('shift', '!=', null)
            ->orderBy('date', 'asc')
            ->paginate($perPage);
    }
}
