<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\Services\Group;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\ServiceGroup;

class LocationServiceGroupsGet extends BaseAction {
    public function rules()
    {
        return [
            'locationSlug' => ['string', 'required'],
            'workerId' => ['nullable', 'integer'],
            'withWorkers' => ['nullable', 'boolean'],
            'perPage' => ['nullable', 'integer'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $locationSlug = $attributes['locationSlug'] ?? null;
        $workerId = $attributes['workerId'] ?? null;
        $withWorkers = $attributes['withWorkers'] ?? false;
        $perPage = $attributes['perPage'] ?? 50;

        $serviceGroups = ServiceGroup::feServiceGroups([
            'locationSlug' => $locationSlug,
            'workerId' => $workerId,
            'withWorkers' => $withWorkers,
        ]);

        return $serviceGroups->paginate($perPage);
    }
}
