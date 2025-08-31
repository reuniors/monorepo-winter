<?php

namespace Reuniors\Reservations\Http\Actions\V1\News;

use Carbon\Carbon;
use Reuniors\Reservations\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;
use Reuniors\Reservations\Models\News;

class NewsUpdateAction extends BaseAction
{
    public function rules()
    {
        return [
            'id' => ['required', 'string', 'uuid'],
            'title' => ['sometimes', 'string', 'max:255'],
            'description' => ['sometimes', 'string', 'max:1000'],
            'level' => ['sometimes', 'integer', 'between:1,10'],
            'type' => ['sometimes', 'string', 'in:news,chyron,alert'],
            'status' => ['sometimes', 'string', 'in:draft,pending,approved'],
            'location_slug' => ['sometimes', 'string'],
            'activated_at' => ['required', 'date'],
            'deactivated_at' => ['required', 'date', 'after:activated_at'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $news = News::find($attributes['id']);
        if (!$news) {
            throw new \Exception('News not found');
        }

        $attributes['activated_at'] = Carbon::parse($attributes['activated_at'])
            ->toDateTimeString();
        $attributes['deactivated_at'] = Carbon::parse($attributes['deactivated_at'])
            ->toDateTimeString();

        // Update location if provided
        if (isset($attributes['location_slug'])) {
            $location = Location::where('slug', $attributes['location_slug'])->first();
            if (!$location) {
                throw new \Exception('Location not found');
            }
            $news->location_id = $location->id;
            unset($attributes['location_slug']);
        }

        $news->fill($attributes);

        $news->save();

        return $news;
    }
}
