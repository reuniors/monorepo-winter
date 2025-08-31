<?php

namespace Reuniors\Reservations\Http\Actions\V1\Location\WorkerWorkingHours;

use Reuniors\Reservations\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\WorkingTime;

class WorkerWorkingHoursUpdateAction extends BaseAction
{
    public function rules()
    {
        return [
            'id' => ['required', 'integer'],
            'name' => ['sometimes', 'string'],
            'time_from' => ['required', 'string', 'regex:/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/'],
            'time_to' => ['required', 'string', 'regex:/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/'],
            'days_codes' => ['sometimes', 'array'],
            'active' => ['sometimes', 'boolean'],
            'shift' => ['sometimes', 'integer'],
            'pauses' => ['sometimes', 'array'],
            'pauses.*.time_from' => ['required', 'string', 'regex:/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/'],
            'pauses.*.time_to' => ['required', 'string', 'regex:/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/'],
            'pauses.*.days_codes' => ['required', 'array'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $workingHours = WorkingTime::find($attributes['id']);
        if (!$workingHours) {
            throw new \Exception('Working hours not found');
        }

        $workingHours->fill($attributes);
        $workingHours->save();

        return $workingHours->load('workers');
    }
}
