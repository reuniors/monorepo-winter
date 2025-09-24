<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\Workers;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\LocationWorker;

class LocationWorkersGetAction extends BaseAction {
    public function rules()
    {
        return [
            'locationSlug' => 'string',
        ];
    }

    public function handle(array $attributes)
    {
        $perPage = $attributes['perPage'] ?? 15;

        $locationWorkersQuery = LocationWorker::feWorkers([
            ...$attributes
        ]);

        return $locationWorkersQuery
            ->paginate($perPage);
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
