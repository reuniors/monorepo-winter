<?php

namespace Reuniors\Reservations\Http\Actions\V1\News;

use Carbon\Carbon;
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
            'activated_at' => ['nullable', 'date'],
            'deactivated_at' => ['nullable', 'date', 'after:activated_at'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $location = Location::where('slug', $attributes['location_slug'])->first();
        if (!$location) {
            throw new \Exception('Location not found');
        }

        $attributes['activated_at'] = Carbon::parse($attributes['activated_at'])
            ->toDateTimeString();
        $attributes['deactivated_at'] = Carbon::parse($attributes['deactivated_at'])
            ->toDateTimeString();

        $news = new News([
            'title' => $attributes['title'],
            'description' => $attributes['description'],
            'level' => $attributes['level'],
            'type' => $attributes['type'],
            'status' => $attributes['status'],
            'location_id' => $location->id,
            'activated_at' => $attributes['activated_at'],
            'deactivated_at' => $attributes['deactivated_at'],
        ]);

        $news->save();

        return $news;
    }
}
