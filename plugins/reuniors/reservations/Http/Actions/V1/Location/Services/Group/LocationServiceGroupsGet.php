<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\Services\Group;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\ServiceGroup;

class LocationServiceGroupsGet extends BaseAction {
    public function rules()
    {
        return [
            'locationSlug' => ['string'],
            'perPage' => ['integer'],
        ];
    }

    public function handle(array $attributes)
    {
        $locationSlug = $attributes['locationSlug'] ?? null;
        $perPage = $attributes['perPage'] ?? 50;

        $serviceGroups = ServiceGroup::feServiceGroups([
            'locationSlug' => $locationSlug,
        ]);

        return $serviceGroups->paginate($perPage);
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
