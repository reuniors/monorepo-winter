<?php

namespace Reuniors\Reservations\Http\Actions\V1\News;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;
use Reuniors\Reservations\Models\News;

class NewsCreateAction extends BaseAction
{
    public function rules()
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:1000'],
            'level' => ['required', 'integer', 'between:1,10'],
            'type' => ['required', 'string', 'in:news,chyron,alert'],
            'status' => ['required', 'string', 'in:draft,pending,approved'],
            'location_slug' => ['required', 'string'],
            'activated_at_utc' => ['nullable', 'date'],
            'deactivated_at_utc' => ['nullable', 'date', 'after:activated_at_utc'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $location = Location::where('slug', $attributes['location_slug'])->first();
        if (!$location) {
            throw new \Exception('Location not found');
        }

        $news = new News([
            'title' => $attributes['title'],
            'description' => $attributes['description'],
            'level' => $attributes['level'],
            'type' => $attributes['type'],
            'status' => $attributes['status'],
            'location_id' => $location->id,
            'activated_at_utc' => $attributes['activated_at_utc'] ?? null,
            'deactivated_at_utc' => $attributes['deactivated_at_utc'] ?? null,
        ]);

        $news->save();

        return $news;
    }
}
