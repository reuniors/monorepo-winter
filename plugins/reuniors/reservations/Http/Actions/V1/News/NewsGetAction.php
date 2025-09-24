<?php

namespace Reuniors\Reservations\Http\Actions\V1\News;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;
use Reuniors\Reservations\Models\News;

class NewsGetAction extends BaseAction
{
    public function rules()
    {
        return [
            'locationSlug' => ['required', 'string'],
            'type' => ['nullable', 'string', 'in:news,chyron,alert'],
            'status' => ['nullable', 'string', 'in:draft,pending,approved'],
            'active' => ['nullable', 'boolean'],
            'perPage' => ['nullable', 'integer', 'min:1', 'max:100'],
            'page' => ['nullable', 'integer', 'min:1'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $location = Location::where('slug', $attributes['locationSlug'])->first();
        if (!$location) {
            throw new \Exception('Location not found');
        }

        $query = News::byLocation($location->id);

        // Apply filters
        if (isset($attributes['type'])) {
            $query->byType($attributes['type']);
        }

        if (isset($attributes['status'])) {
            $query->byStatus($attributes['status']);
        }

        if (isset($attributes['active']) && $attributes['active']) {
            $query->active();
        }

        // Order by level (descending) and created_at (descending)
        $query
            ->orderBy('level', 'desc')
            ->orderBy('created_at', 'desc');

        $perPage = $attributes['perPage'] ?? 15;
        $page = $attributes['page'] ?? 1;

        return $query->paginate($perPage, ['*'], 'page', $page);
    }
}
