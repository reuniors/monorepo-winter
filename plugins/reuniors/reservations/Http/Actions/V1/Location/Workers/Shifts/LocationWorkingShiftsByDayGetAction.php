<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\Workers\Shifts;

use Carbon\Carbon;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Reservations\Models\LocationWorkerShift;

class LocationWorkingShiftsByDayGetAction
{
    use asAction;

    public function rules()
    {
        return [
            'locationSlug' => ['string'],
            'startDate' => ['date'],
            'endDate' => ['date'],
            'monthOffset' => ['integer'],
        ];
    }

    public function handle(array $attributes)
    {
        $locationSlug = $attributes['locationSlug'] ?? null;
        $monthOffset = $attributes['monthOffset'] ?? 0;
        $perPage = $attributes['perPage'] ?? 300;

        $startDate = $attributes['startDate'] ?? Carbon::now()
            ->addMonthsNoOverflow($monthOffset)
            ->startOfMonth()
            ->startOfDay()
            ->format('Y-m-d');
        $endDate = $attributes['endDate'] ?? Carbon::now()
            ->addMonthsNoOverflow($monthOffset)
            ->endOfMonth()
            ->endOfDay()
            ->format('Y-m-d');

        $shiftsQuery = LocationWorkerShift::workersShiftsByDay([
            'locationSlug' => $locationSlug,
            'startDate' => $startDate,
            'endDate' => $endDate,
        ]);

        return $shiftsQuery->paginate($perPage);
    }

    public function asController()
    {
        $requestData = request()->all();

        return [
            'data' => $this->handle($requestData),
            'success' => true,
        ];
    }
}
