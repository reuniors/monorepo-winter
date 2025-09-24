<?php namespace Reuniors\Reservations\Http\Actions\V1\Location;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;

class LocationGetOneAction extends BaseAction {
    public function rules()
    {
        return [
            'id' => ['integer'],
            'slug' => 'string',
        ];
    }

    public function handle(array $attributes)
    {
        $slug = $attributes['slug'] ?? null;
        $id = $attributes['id'] ?? null;

        $locationQuery = Location::query();

        if ($id) {
            $locationQuery->where('id', $id);
        }
        if ($slug) {
            $locationQuery->where('slug', $slug);
        }

        return $locationQuery
            ->with(['working_hours', 'workers', 'logo', 'cover'])
            ->firstOrFail();
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
