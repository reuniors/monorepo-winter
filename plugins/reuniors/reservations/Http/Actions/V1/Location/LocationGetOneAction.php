<?php namespace Reuniors\Reservations\Http\Actions\V1\Location;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class LocationGetOneAction extends BaseAction {
    public function rules()
    {
        return [
            'id' => ['integer'],
            'slug' => 'string',
        ];
    }

    public function handle(array $attributes = [])
    {
        $slug = $attributes['slug'] ?? null;
        $id = $attributes['id'] ?? null;

        $locationQuery = Location::query();

        if (empty($slug) && empty($id)) {
            throw new BadRequestHttpException('Either slug or id is required');
        }

        if ($id) {
            $locationQuery->where('id', $id);
        }
        if ($slug) {
            $locationQuery->where('slug', $slug);
        }

        return $locationQuery
            ->with(['working_hours', 'workers', 'logo', 'cover', 'pwa_icon', 'gallery'])
            ->firstOrFail();
    }
}
