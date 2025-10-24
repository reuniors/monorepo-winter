<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\Services\Group;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\ServiceGroup;

class LocationServiceGroupsGet extends BaseAction {
    public function rules()
    {
        return [
            'locationSlug' => ['string'],
            'workerId' => ['integer'], // NEW: Worker filtering
            'perPage' => ['integer'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $locationSlug = $attributes['locationSlug'] ?? null;
        $workerId = $attributes['workerId'] ?? null; // NEW: Filter by worker
        $perPage = $attributes['perPage'] ?? 50;

        $serviceGroups = ServiceGroup::feServiceGroups([
            'locationSlug' => $locationSlug,
            'workerId' => $workerId, // NEW: Filter by worker
        ]);

        return $serviceGroups->paginate($perPage);
    }
}
